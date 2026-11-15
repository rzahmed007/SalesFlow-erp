import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { GlobalSearchModal } from "./global-search-modal";
import { LogoutDialog } from "./logout-dialog";
import { Drawer } from "@/components/ui/drawer";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { useToast } from "@/components/ui";

const SIDEBAR_COLLAPSED_KEY = "jd_sidebar_collapsed";

export const AppLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(() => {
    return localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "true";
  });
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [logoutOpen, setLogoutOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(next));
      return next;
    });
  };

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleConfirmLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.info("Signed out", "You have been safely signed out.");
      navigate("/login", { replace: true });
    } finally {
      setIsLoggingOut(false);
      setLogoutOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={toggleCollapse}
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      <Drawer
        open={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        side="left"
        className="p-0 max-w-[280px]"
      >
        <Sidebar
          isCollapsed={false}
          onToggleCollapse={() => {}}
          onNavigateMobile={() => setMobileNavOpen(false)}
          className="border-none h-full"
        />
      </Drawer>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          onOpenMobileNav={() => setMobileNavOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenLogout={() => setLogoutOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Global Modals */}
      <GlobalSearchModal
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onOpenLogout={() => setLogoutOpen(true)}
      />

      <LogoutDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={handleConfirmLogout}
        isLoading={isLoggingOut}
      />
    </div>
  );
};
