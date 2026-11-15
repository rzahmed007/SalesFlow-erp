import * as React from "react";
import {
  Employee,
  EmployeeStatus,
  EmployeeKPIStats,
  EmployeeFilterParams,
  PaginatedResult,
} from "../types";
import { employeeService } from "../services/employee-service";
import { useToast } from "@/components/ui";

export function useEmployees(initialParams?: EmployeeFilterParams) {
  const toast = useToast();

  const [params, setParams] = React.useState<EmployeeFilterParams>({
    page: 1,
    pageSize: 10,
    search: "",
    status: "all",
    department: "all",
    designation: "all",
    sortBy: "joiningDate",
    sortOrder: "desc",
    ...initialParams,
  });

  const [paginatedData, setPaginatedData] = React.useState<PaginatedResult<Employee>>({
    items: [],
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
  });

  const [kpiStats, setKpiStats] = React.useState<EmployeeKPIStats | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchEmployees = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [res, stats] = await Promise.all([
        employeeService.getEmployees(params),
        employeeService.getKPIStats(),
      ]);
      setPaginatedData(res);
      setKpiStats(stats);
    } catch (err: any) {
      setError(err?.message || "Failed to load employees");
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  React.useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const updateFilters = (newParams: Partial<EmployeeFilterParams>) => {
    setParams((prev) => ({
      ...prev,
      ...newParams,
      page: newParams.page !== undefined ? newParams.page : 1, // Reset to page 1 unless pagination triggered
    }));
  };

  const resetFilters = () => {
    setParams({
      page: 1,
      pageSize: 10,
      search: "",
      status: "all",
      department: "all",
      designation: "all",
      sortBy: "joiningDate",
      sortOrder: "desc",
    });
  };

  const changePage = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  const changePageSize = (pageSize: number) => {
    setParams((prev) => ({ ...prev, pageSize, page: 1 }));
  };

  const toggleSort = (field: "name" | "employeeCode" | "joiningDate" | "department" | "status") => {
    setParams((prev) => {
      const isSame = prev.sortBy === field;
      const nextOrder = isSame && prev.sortOrder === "asc" ? "desc" : "asc";
      return { ...prev, sortBy: field, sortOrder: nextOrder };
    });
  };

  const handleUpdateStatus = async (id: string, status: EmployeeStatus) => {
    try {
      const updated = await employeeService.updateEmployeeStatus(id, status);
      toast.success(
        "Status Updated",
        `${updated.fullName}'s status is now ${status.toUpperCase()}`
      );
      await fetchEmployees();
      return updated;
    } catch (err: any) {
      toast.error("Error", err?.message || "Failed to update status");
      throw err;
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      const success = await employeeService.deleteEmployee(id);
      if (success) {
        toast.success("Employee Deleted", "Employee record was permanently removed.");
        await fetchEmployees();
      }
      return success;
    } catch (err: any) {
      toast.error("Error", err?.message || "Failed to delete employee");
      throw err;
    }
  };

  const exportToCSV = async () => {
    try {
      const all = await employeeService.getAllEmployees();
      // Apply current search/department/status filter to export
      let list = all;
      if (params.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (e) =>
            e.fullName.toLowerCase().includes(q) ||
            e.employeeCode.toLowerCase().includes(q) ||
            e.email.toLowerCase().includes(q)
        );
      }
      if (params.status && params.status !== "all") {
        list = list.filter((e) => e.status === params.status);
      }
      if (params.department && params.department !== "all") {
        list = list.filter((e) => e.department.toLowerCase() === params.department?.toLowerCase());
      }

      const headers = [
        "Employee Code",
        "Full Name",
        "Email",
        "Phone",
        "Department",
        "Designation",
        "Role",
        "Status",
        "Employment Type",
        "Joining Date",
      ];

      const csvRows = [
        headers.join(","),
        ...list.map((e) =>
          [
            `"${e.employeeCode}"`,
            `"${e.fullName}"`,
            `"${e.email}"`,
            `"${e.phone}"`,
            `"${e.department}"`,
            `"${e.designation}"`,
            `"${e.role}"`,
            `"${e.status}"`,
            `"${e.employmentType}"`,
            `"${e.joiningDate}"`,
          ].join(",")
        ),
      ];

      const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `jd_webnship_employees_${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Export Complete", `Exported ${list.length} employee records to CSV`);
    } catch {
      toast.error("Export Failed", "Unable to generate CSV export");
    }
  };

  return {
    employees: paginatedData.items,
    total: paginatedData.total,
    page: paginatedData.page,
    pageSize: paginatedData.pageSize,
    totalPages: paginatedData.totalPages,
    kpiStats,
    isLoading,
    error,
    params,
    updateFilters,
    resetFilters,
    changePage,
    changePageSize,
    toggleSort,
    handleUpdateStatus,
    handleDeleteEmployee,
    exportToCSV,
    refetch: fetchEmployees,
  };
}
