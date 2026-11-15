export type EmployeeStatus = "active" | "inactive" | "suspended";

export type EmploymentType = "full_time" | "part_time" | "contract" | "intern";

export type EmployeeRole = "admin" | "manager" | "employee";

export type Gender = "male" | "female" | "other";

export interface EmployeeNote {
  id: string;
  authorName: string;
  authorId: string;
  content: string;
  createdAt: string;
}

export interface EmployeeActivity {
  id: string;
  type: "created" | "updated" | "status_change" | "role_change" | "milestone" | "note_added";
  title: string;
  description: string;
  timestamp: string;
  performedBy?: string;
}

export interface MonthlyPerformanceRecord {
  month: string;
  sales: number;
  orders: number;
  target: number;
  achievementPercentage: number;
}

export interface EmployeePerformanceData {
  employeeId: string;
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  targetAmount: number;
  salesGrowth: number; // e.g. 14.5%
  performanceScore: number; // e.g. 96
  performanceCategory: "excellent" | "good" | "average" | "below_target";
  recentHistory: MonthlyPerformanceRecord[];
}

export interface Employee {
  id: string;
  employeeCode: string; // e.g. EMP-1001
  firstName: string;
  lastName: string;
  fullName: string;
  avatar: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  gender: Gender;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  department: string;
  designation: string;
  reportingManagerId?: string;
  reportingManagerName?: string;
  joiningDate: string;
  employmentType: EmploymentType;
  role: EmployeeRole;
  status: EmployeeStatus;
  loginEmail?: string;
  notes?: EmployeeNote[];
  activities?: EmployeeActivity[];
  performance?: EmployeePerformanceData;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeKPIStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  suspendedEmployees: number;
  newThisMonth: number;
  totalGrowthPercentage: number;
}

export interface EmployeeFilterParams {
  search?: string;
  status?: EmployeeStatus | "all";
  department?: string | "all";
  designation?: string | "all";
  employmentType?: EmploymentType | "all";
  sortBy?: "name" | "employeeCode" | "joiningDate" | "department" | "status";
  sortOrder?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
