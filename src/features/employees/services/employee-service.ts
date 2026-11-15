import {
  Employee,
  EmployeeStatus,
  EmployeeKPIStats,
  EmployeeFilterParams,
  PaginatedResult,
  EmployeeNote,
  EmployeeActivity,
} from "../types";
import { initialMockEmployees } from "../data/mock-employees";

const STORAGE_KEY = "jd_webnship_employees_store";

// Helper for localStorage with SSR fallback
let memoryEmployeesStore: Employee[] = [...initialMockEmployees];

const loadFromStorage = (): Employee[] => {
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const data = window.localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
      // If nothing saved yet, seed initial
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMockEmployees));
      return [...initialMockEmployees];
    } catch {
      return memoryEmployeesStore;
    }
  }
  return memoryEmployeesStore;
};

const saveToStorage = (employees: Employee[]): void => {
  memoryEmployeesStore = employees;
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(employees));
    } catch {
      // Ignore storage quota errors
    }
  }
};

class EmployeeService {
  private delay(ms = 200): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getAllEmployees(): Promise<Employee[]> {
    await this.delay(100);
    return loadFromStorage();
  }

  async getEmployees(params?: EmployeeFilterParams): Promise<PaginatedResult<Employee>> {
    await this.delay(200);
    let list = loadFromStorage();

    // 1. Search filter
    if (params?.search && params.search.trim()) {
      const q = params.search.trim().toLowerCase();
      list = list.filter(
        (emp) =>
          emp.fullName.toLowerCase().includes(q) ||
          emp.employeeCode.toLowerCase().includes(q) ||
          emp.email.toLowerCase().includes(q) ||
          emp.phone.toLowerCase().includes(q)
      );
    }

    // 2. Status filter
    if (params?.status && params.status !== "all") {
      list = list.filter((emp) => emp.status === params.status);
    }

    // 3. Department filter
    if (params?.department && params.department !== "all") {
      list = list.filter((emp) => emp.department.toLowerCase() === params.department?.toLowerCase());
    }

    // 4. Designation filter
    if (params?.designation && params.designation !== "all") {
      list = list.filter((emp) => emp.designation.toLowerCase() === params.designation?.toLowerCase());
    }

    // 5. Employment Type filter
    if (params?.employmentType && params.employmentType !== "all") {
      list = list.filter((emp) => emp.employmentType === params.employmentType);
    }

    // 6. Sorting
    const sortBy = params?.sortBy || "joiningDate";
    const sortOrder = params?.sortOrder || "desc";

    list.sort((a, b) => {
      let valA: string | number = "";
      let valB: string | number = "";

      switch (sortBy) {
        case "name":
          valA = a.fullName.toLowerCase();
          valB = b.fullName.toLowerCase();
          break;
        case "employeeCode":
          valA = a.employeeCode;
          valB = b.employeeCode;
          break;
        case "joiningDate":
          valA = new Date(a.joiningDate).getTime();
          valB = new Date(b.joiningDate).getTime();
          break;
        case "department":
          valA = a.department.toLowerCase();
          valB = b.department.toLowerCase();
          break;
        case "status":
          valA = a.status;
          valB = b.status;
          break;
        default:
          valA = a.fullName;
          valB = b.fullName;
      }

      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    // 7. Pagination
    const total = list.length;
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const totalPages = Math.ceil(total / pageSize) || 1;
    const start = (page - 1) * pageSize;
    const paginatedItems = list.slice(start, start + pageSize);

    return {
      items: paginatedItems,
      total,
      page,
      pageSize,
      totalPages,
    };
  }

  async getEmployeeById(id: string): Promise<Employee | null> {
    await this.delay(150);
    const list = loadFromStorage();
    const found = list.find((e) => e.id === id || e.employeeCode.toLowerCase() === id.toLowerCase());
    return found || null;
  }

  async createEmployee(data: Partial<Employee>): Promise<Employee> {
    await this.delay(300);
    const list = loadFromStorage();

    // Check duplicates
    if (list.some((e) => e.employeeCode.toLowerCase() === data.employeeCode?.toLowerCase())) {
      throw new Error(`Employee with ID ${data.employeeCode} already exists.`);
    }
    if (list.some((e) => e.email.toLowerCase() === data.email?.toLowerCase())) {
      throw new Error(`Employee with email ${data.email} already exists.`);
    }

    const now = new Date().toISOString();
    const id = `emp-${Date.now().toString(36)}`;
    const fullName = `${data.firstName?.trim()} ${data.lastName?.trim()}`;

    // Look up manager name if ID provided
    let reportingManagerName = undefined;
    if (data.reportingManagerId) {
      const mgr = list.find((e) => e.id === data.reportingManagerId);
      if (mgr) reportingManagerName = mgr.fullName;
    }

    const defaultAvatar =
      data.gender === "female"
        ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80";

    const initialActivity: EmployeeActivity = {
      id: `act-${Date.now()}`,
      type: "created",
      title: "Employee Profile Created",
      description: `Account created with status: ${data.status || "active"}`,
      timestamp: now,
      performedBy: "Current User",
    };

    const newEmployee: Employee = {
      id,
      employeeCode: data.employeeCode || (await this.generateNextEmployeeCode()),
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      fullName,
      avatar: data.avatar || defaultAvatar,
      email: data.email || "",
      phone: data.phone || "",
      alternatePhone: data.alternatePhone,
      gender: data.gender || "male",
      dateOfBirth: data.dateOfBirth || "1995-01-01",
      address: data.address || "",
      city: data.city || "",
      state: data.state || "",
      country: data.country || "United States",
      postalCode: data.postalCode || "",
      department: data.department || "Sales",
      designation: data.designation || "Sales Executive",
      reportingManagerId: data.reportingManagerId,
      reportingManagerName,
      joiningDate: data.joiningDate || now.split("T")[0],
      employmentType: data.employmentType || "full_time",
      role: data.role || "employee",
      status: data.status || "active",
      loginEmail: data.loginEmail || data.email,
      notes: [],
      activities: [initialActivity],
      performance: {
        employeeId: id,
        totalSales: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        targetAmount: 15000,
        salesGrowth: 0,
        performanceScore: 75,
        performanceCategory: "average",
        recentHistory: [],
      },
      createdAt: now,
      updatedAt: now,
    };

    list.unshift(newEmployee);
    saveToStorage(list);
    return newEmployee;
  }

  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    await this.delay(300);
    const list = loadFromStorage();
    const index = list.findIndex((e) => e.id === id);

    if (index === -1) {
      throw new Error(`Employee not found`);
    }

    const current = list[index];

    // Check duplicate email if changed
    if (
      data.email &&
      data.email.toLowerCase() !== current.email.toLowerCase() &&
      list.some((e) => e.id !== id && e.email.toLowerCase() === data.email?.toLowerCase())
    ) {
      throw new Error(`Email ${data.email} is already in use by another employee.`);
    }

    const now = new Date().toISOString();
    const firstName = data.firstName !== undefined ? data.firstName : current.firstName;
    const lastName = data.lastName !== undefined ? data.lastName : current.lastName;
    const fullName = `${firstName.trim()} ${lastName.trim()}`;

    // Lookup manager name if changed
    let reportingManagerName = current.reportingManagerName;
    if (data.reportingManagerId !== undefined) {
      if (data.reportingManagerId) {
        const mgr = list.find((e) => e.id === data.reportingManagerId);
        reportingManagerName = mgr ? mgr.fullName : undefined;
      } else {
        reportingManagerName = undefined;
      }
    }

    const updateActivity: EmployeeActivity = {
      id: `act-${Date.now()}`,
      type: "updated",
      title: "Profile Information Updated",
      description: "Employee details were modified and saved",
      timestamp: now,
      performedBy: "Current User",
    };

    const updated: Employee = {
      ...current,
      ...data,
      fullName,
      reportingManagerName,
      activities: [updateActivity, ...(current.activities || [])],
      updatedAt: now,
    };

    list[index] = updated;
    saveToStorage(list);
    return updated;
  }

  async updateEmployeeStatus(id: string, status: EmployeeStatus): Promise<Employee> {
    await this.delay(200);
    const list = loadFromStorage();
    const index = list.findIndex((e) => e.id === id);

    if (index === -1) {
      throw new Error(`Employee not found`);
    }

    const current = list[index];
    const now = new Date().toISOString();

    const activity: EmployeeActivity = {
      id: `act-${Date.now()}`,
      type: "status_change",
      title: `Status Changed to ${status.toUpperCase()}`,
      description: `Employee account status was set from ${current.status} to ${status}`,
      timestamp: now,
      performedBy: "Administrator",
    };

    const updated: Employee = {
      ...current,
      status,
      activities: [activity, ...(current.activities || [])],
      updatedAt: now,
    };

    list[index] = updated;
    saveToStorage(list);
    return updated;
  }

  async deleteEmployee(id: string): Promise<boolean> {
    await this.delay(250);
    const list = loadFromStorage();
    const filtered = list.filter((e) => e.id !== id);

    if (filtered.length === list.length) {
      return false;
    }

    saveToStorage(filtered);
    return true;
  }

  async addEmployeeNote(
    id: string,
    content: string,
    authorName: string,
    authorId: string
  ): Promise<EmployeeNote> {
    await this.delay(200);
    const list = loadFromStorage();
    const index = list.findIndex((e) => e.id === id);

    if (index === -1) {
      throw new Error(`Employee not found`);
    }

    const now = new Date().toISOString();
    const newNote: EmployeeNote = {
      id: `note-${Date.now()}`,
      authorName,
      authorId,
      content,
      createdAt: now,
    };

    const noteActivity: EmployeeActivity = {
      id: `act-${Date.now()}`,
      type: "note_added",
      title: "Internal Note Added",
      description: `Note added by ${authorName}`,
      timestamp: now,
      performedBy: authorName,
    };

    list[index].notes = [newNote, ...(list[index].notes || [])];
    list[index].activities = [noteActivity, ...(list[index].activities || [])];
    list[index].updatedAt = now;

    saveToStorage(list);
    return newNote;
  }

  async getKPIStats(): Promise<EmployeeKPIStats> {
    await this.delay(150);
    const list = loadFromStorage();

    const totalEmployees = list.length;
    const activeEmployees = list.filter((e) => e.status === "active").length;
    const inactiveEmployees = list.filter((e) => e.status === "inactive").length;
    const suspendedEmployees = list.filter((e) => e.status === "suspended").length;

    // Filter employees joined in the last 30 days or November 2026
    const newThisMonth = list.filter((e) => {
      const d = new Date(e.joiningDate);
      return d.getFullYear() === 2026 && d.getMonth() === 10; // November (0-indexed 10)
    }).length;

    return {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      suspendedEmployees,
      newThisMonth: newThisMonth || 2,
      totalGrowthPercentage: 8.5,
    };
  }

  async generateNextEmployeeCode(): Promise<string> {
    const list = loadFromStorage();
    const numericCodes = list
      .map((e) => {
        const match = e.employeeCode.match(/EMP-(\d+)/i);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter((n) => !isNaN(n) && n > 0);

    const maxCode = numericCodes.length > 0 ? Math.max(...numericCodes) : 1000;
    const nextCode = maxCode + 1;
    return `EMP-${nextCode}`;
  }

  async resetToDefault(): Promise<void> {
    saveToStorage([...initialMockEmployees]);
  }
}

export const employeeService = new EmployeeService();
