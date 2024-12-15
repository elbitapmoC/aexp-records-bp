"use client";
// import type React from "react";
import { useEffect, useState } from "react";
import Button from "./components/Button";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  saved: boolean;
};

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const json = await response.json();
      setUsers(json.data);
    };

    fetchUsers();
    console.log("page loaded");
  }, [page]);

  return (
    <>
      <aside>
        <form>
          <label htmlFor="pageNumber">Page Number:</label>
          <input
            type="text"
            name="pageNumber"
            id="pageNumber"
            onChange={(e) => setPage(Number.parseInt(e.target.value))}
            max={2}
            min={1}
          />
        </form>
        <Button text="Save Users" onClick={() => console.log("save users")} />
      </aside>
      <table>
        <thead className="block">
          <tr className="table-header">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Saved</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Page;
