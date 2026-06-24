import axios from "axios";
import type { Employee } from "./type";

const URL = "https://jsonplaceholder.typicode.com/users";

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(URL);

  return response.data.map(
    (user): Employee => ({
      ...user,
      status: Math.random() > 0.5 ? "Active" : "Inactive",
    })
  );
};