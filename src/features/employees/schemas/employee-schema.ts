import * as z from "zod";

export const employeeFormSchema = z.object({
  employeeCode: z
    .string()
    .min(3, "Employee ID must be at least 3 characters")
    .regex(/^EMP-[0-9]{3,6}$/i, "Employee ID must follow format EMP-XXXX"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  avatar: z.string().optional(),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Please enter a valid business email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  alternatePhone: z.string().optional(),
  address: z.string().min(3, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State/Province is required"),
  country: z.string().min(2, "Country is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  department: z.string().min(1, "Please select a department"),
  designation: z.string().min(1, "Please select a designation"),
  reportingManagerId: z.string().optional(),
  joiningDate: z.string().min(1, "Joining date is required"),
  employmentType: z.enum(["full_time", "part_time", "contract", "intern"], {
    errorMap: () => ({ message: "Please select an employment type" }),
  }),
  role: z.enum(["admin", "manager", "employee"], {
    errorMap: () => ({ message: "Please select a user role" }),
  }),
  status: z.enum(["active", "inactive", "suspended"], {
    errorMap: () => ({ message: "Please select employee status" }),
  }),
  loginEmail: z.string().email("Invalid login email").optional().or(z.literal("")),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
