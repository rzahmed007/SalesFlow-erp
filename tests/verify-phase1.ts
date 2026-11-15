import { authService } from "../src/features/auth/services/auth-service";
import { dashboardService } from "../src/features/dashboard/services/dashboard-service";
import { navigationConfig } from "../src/layouts/navigation-config";

async function runTests() {
  console.log("=================================================");
  console.log("   JD WebnShip — Phase 1 Test & Verification Suite");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, desc: string) {
    if (condition) {
      console.log(`  ✓ PASS: ${desc}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${desc}`);
      failed++;
    }
  }

  // 1. Navigation & BRD Route Verification
  console.log("--- 1. Testing Navigation & BRD Module Blueprints ---");
  const allGroups = navigationConfig;
  assert(allGroups.length === 9, `Expected 9 navigation groups, found ${allGroups.length}`);

  const allItems = allGroups.flatMap((g) => g.items);
  assert(allItems.length >= 17, `Expected at least 17 nav items, found ${allItems.length}`);

  const dashboardItem = allItems.find((i) => i.href === "/dashboard");
  assert(!!dashboardItem && dashboardItem.isPhase1 === true, "Dashboard route is marked as Phase 1");

  const futureItems = allItems.filter((i) => i.href !== "/dashboard");
  const allFutureHavePlaceholders = futureItems.every((i) => i.isPhase1 === false);
  assert(allFutureHavePlaceholders, "All non-dashboard modules are marked as future-phase placeholders");

  // 2. Mock Auth Service Tests
  console.log("\n--- 2. Testing Authentication Service & State Management ---");
  // Test valid admin login
  const adminLogin = await authService.login({
    email: "admin@jdwebnship.com",
    password: "password123",
  });
  assert(adminLogin.success === true, "Admin credentials login succeeds");
  assert(adminLogin.user?.role === "admin", "User role is 'admin'");
  assert(adminLogin.user?.name === "Ahmed Raza", "User name is 'Ahmed Raza'");
  assert(!!adminLogin.token, "JWT session token is issued");

  // Test valid manager login
  const managerLogin = await authService.login({
    email: "manager@jdwebnship.com",
    password: "password123",
  });
  assert(managerLogin.success === true, "Manager credentials login succeeds");
  assert(managerLogin.user?.role === "manager", "User role is 'manager'");

  // Test invalid credentials
  const badLogin = await authService.login({
    email: "unknown@company.com",
    password: "wrongpassword",
  });
  assert(badLogin.success === false, "Invalid credentials correctly rejected");
  assert(!!badLogin.message, "Rejection contains human-friendly message");

  // Test forgot password
  const forgot = await authService.forgotPassword({ email: "admin@jdwebnship.com" });
  assert(forgot.success === true, "Forgot password link generation succeeds");
  assert(!!forgot.resetLink && forgot.resetLink.includes("/reset-password"), "Reset link generated with simulation URL");

  // Test reset password with weak password
  const weakReset = await authService.resetPassword({
    password: "123",
    confirmPassword: "123",
  });
  assert(weakReset.success === false, "Weak password rejected (< 8 chars)");

  // Test reset password with mismatch
  const mismatchReset = await authService.resetPassword({
    password: "Password123!",
    confirmPassword: "Password456!",
  });
  assert(mismatchReset.success === false, "Mismatched passwords rejected");

  // Test reset password with valid credentials
  const validReset = await authService.resetPassword({
    password: "StrongPassword123!",
    confirmPassword: "StrongPassword123!",
  });
  assert(validReset.success === true, "Valid strong password reset succeeds");

  // 3. Dashboard KPI & Analytics Verification
  console.log("\n--- 3. Testing Dashboard Service & Analytics Data ---");
  const kpis = await dashboardService.getKPIs("thisMonth");
  assert(kpis.totalSales.value === 124580, `Total Sales is $124,580 (got ${kpis.totalSales.value})`);
  assert(kpis.totalOrders.value === 1842, `Total Orders is 1,842 (got ${kpis.totalOrders.value})`);
  assert(kpis.activeEmployees.value === 28, `Active Employees is 28 (got ${kpis.activeEmployees.value})`);
  assert(kpis.totalShipments.value === 1695, `Total Shipments is 1,695 (got ${kpis.totalShipments.value})`);
  assert(kpis.totalCommission.value === 18687, `Total Commission is $18,687 (got ${kpis.totalCommission.value})`);
  assert(kpis.deliveredOrders.value === 1520 && kpis.deliveredOrders.rate === 89.7, `Delivered Orders is 1,520 with 89.7% SLA`);

  // Test sales data
  const dailySales = await dashboardService.getSalesData("daily");
  assert(dailySales.length === 7, `Daily sales has 7 points (got ${dailySales.length})`);

  const weeklySales = await dashboardService.getSalesData("weekly");
  assert(weeklySales.length === 4, `Weekly sales has 4 weeks (got ${weeklySales.length})`);

  const monthlySales = await dashboardService.getSalesData("monthly");
  assert(monthlySales.length === 6, `Monthly sales has 6 months (got ${monthlySales.length})`);

  // Test order breakdown
  const orderBreakdown = await dashboardService.getOrderBreakdown();
  assert(orderBreakdown.length === 6, `Order status breakdown has 6 distinct categories`);
  const totalBreakdownOrders = orderBreakdown.reduce((sum, item) => sum + item.count, 0);
  assert(totalBreakdownOrders === 1842, `Order breakdown sum equals 1,842 total orders`);

  // Test shipment analytics
  const shipments = await dashboardService.getShipmentAnalytics();
  assert(shipments.total === 1695, `Total shipments is 1,695`);
  assert(shipments.deliverySuccessRate === 89.7, `Delivery success rate is 89.7%`);
  assert(shipments.rtoPercentage === 4.2, `RTO percentage is 4.2%`);

  // Test commission analytics
  const commission = await dashboardService.getCommissionAnalytics();
  assert(commission.totalCommission === 18687.0, `Total commission is $18,687.00`);
  assert(commission.paidCommission === 9556.5, `Paid commission is $9,556.50`);
  assert(commission.approvedCommission === 5890.0, `Approved commission is $5,890.00`);
  assert(commission.pendingCommission === 3240.5, `Pending commission is $3,240.50`);

  // Test top employees
  const topEmployees = await dashboardService.getTopEmployees();
  assert(topEmployees.length === 5, `Top employees has 5 leaderboard members`);
  assert(topEmployees[0].name === "Marcus Vance", `Top rank #1 is Marcus Vance`);
  assert(topEmployees[0].salesAmount === 32450.0, `Top employee sales is $32,450.00`);

  // Test recent orders search & pagination
  const recentOrders = await dashboardService.getRecentOrders({ page: 1, pageSize: 5 });
  assert(recentOrders.items.length === 5, `Page 1 returns 5 orders`);
  assert(recentOrders.total === 8, `Total recent orders in dataset is 8`);

  const searchOrders = await dashboardService.getRecentOrders({ search: "Vance" });
  assert(searchOrders.items.length === 2, `Search by 'Vance' returns 2 attributed orders`);

  const filterShipped = await dashboardService.getRecentOrders({ status: "shipped" });
  assert(filterShipped.items.length === 1 && filterShipped.items[0].orderNumber === "ORD-92840", `Filter by status 'shipped' matches ORD-92840`);

  // Test recent activities
  const activities = await dashboardService.getRecentActivity();
  assert(activities.length === 5, `Activity timeline contains 5 events`);

  console.log("\n=================================================");
  console.log(`   Verification Results: ${passed} Passed, ${failed} Failed`);
  console.log("=================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
