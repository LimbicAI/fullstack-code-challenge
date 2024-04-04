import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types";
import { getAllUsers } from "../apiCalls";

type UserContextProps = {
  users: User[];
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};

const UserContext = createContext<UserContextProps>({
  users: [],
  selectedUser: null,
  setSelectedUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setUsers(users || []);
    };

    fetchData();
    return () => {
      setUsers([]);
    };
  }, []);

  return (
    <UserContext.Provider value={{ users, selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
