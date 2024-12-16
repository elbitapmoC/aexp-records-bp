"use client";
import React, { useEffect, useState } from "react";
import UserGrid from "./components/UserGrid";

type UserType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  saved?: boolean;
};

const Page = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [savedUsers, setSavedUsers] = useState<UserType[]>([]);
  const [showSaved, setShowSaved] = useState<boolean>(false);

  const handleProfileDelete = (id: number) => {
    setSavedUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`);
      const json = await response.json();
      const addSaveToUsers = json.data.map((users: UserType) => {
        return {
          ...users,
          saved: false,
        };
      });
      setUsers(addSaveToUsers);
    };
    fetchData();
  }, [page]);

  return showSaved === false ? (
    <main className="w-96 mx-auto">
      <article className="flex justify-between">
        <form>
          <label htmlFor="pageNumberToDisplay">Page</label>
          <input
            type="number"
            name="pageNumberToDisplay"
            id="pageNumberToDisplay"
            max={2}
            min={1}
            onChange={(e) => setPage(Number(e.target.value))}
            className="text-black"
          />
        </form>
        <button
          type="button"
          onClick={() => {
            setSavedUsers(
              users.filter((user) => {
                return user.saved;
              })
            );
          }}
        >
          Save Selected
        </button>
      </article>

      <table>
        <thead>
          <tr>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
            <td>Saved</td>
          </tr>
        </thead>
        <tbody>
          {users.map(
            ({ id, first_name, last_name, email, saved }: UserType) => {
              return (
                <tr key={id}>
                  <td>{first_name}</td>
                  <td>{last_name}</td>
                  <td>{email}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={saved}
                      onChange={(e) => {
                        setUsers((prevUsers) =>
                          prevUsers.map((user) => {
                            if (user.id === id) {
                              console.log(e.target.checked);
                              return {
                                ...user,
                                saved: e.target.checked,
                              };
                            }
                            return user;
                          })
                        );
                      }}
                    />
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() => {
          setShowSaved(true);
        }}
      >
        Show Saved
      </button>
    </main>
  ) : (
    <div>
      {!savedUsers.length ? (
        <p>No users saved...YET!</p>
      ) : (
        <>
          <UserGrid
            savedUsers={savedUsers}
            removeProfile={handleProfileDelete}
          />
        </>
      )}
      <button
        type="button"
        onClick={() => {
          setShowSaved(true);
        }}
      >
        Show Regular List
      </button>
    </div>
  );
};
export default Page;
