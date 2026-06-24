export type Status = "Active" | "Inactive";

export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: Status;
}