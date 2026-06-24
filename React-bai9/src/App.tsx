import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { Employee, Status } from "./type";
import { getEmployees } from "./api";

type FormData = Omit<Employee, "id">;

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filter, setFilter] = useState<"All" | Status>("All");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    const data = await getEmployees();
    setEmployees(data);
  };

  const onSubmit = (data: FormData) => {
    const newEmployee: Employee = {
      id: employees.length + 1,
      ...data,
    };

    setEmployees([...employees, newEmployee]);
    reset();
  };

  const filteredEmployees =
    filter === "All"
      ? employees
      : employees.filter((emp) => emp.status === filter);

  return (
    <div>
      <h1>Employee Management</h1>

      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit(onSubmit)}>

        <input
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
          })}
        />
        <p>{errors.name?.message}</p>

        <input
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
          })}
        />
        <p>{errors.email?.message}</p>

        <input
          placeholder="Phone"
          {...register("phone", {
            required: "Phone is required",
          })}
        />
        <p>{errors.phone?.message}</p>

        <select {...register("status")}>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <br />
        <br />

        <button type="submit">Add</button>

      </form>

      <hr />

      <h2>Filter</h2>

      <select
        value={filter}
        onChange={(e) =>
          setFilter(e.target.value as "All" | Status)
        }
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <hr />

      <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone}</td>
              <td>{emp.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;