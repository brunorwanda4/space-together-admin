import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "@/services/socketService";

// Define a User type (adjust according to your actual model)
export interface UserModel {
  id: string;
  rl: string;
  nm: string;
  un?: string;
  em: string;
  ph?: string;
  pw?: string;
  gd?: "M" | "F" | "O"; // Adjust gender if needed
  co: string;
}

export const useRealTimeUsers = (initialData: UserModel[] = []) => {
  // Explicitly define the state type as UserModel[]
  const [users, setUsers] = useState<UserModel[]>(initialData);

  useEffect(() => {
    const socket = connectSocket();

    // Listen for new users
    socket.on("new_user", (user: UserModel) => {
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    // Listen for updated users
    socket.on("update_user", (updatedUser: UserModel) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    });

    // Listen for deleted users
    socket.on("delete_user", (deletedUserId: string) => {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== deletedUserId));
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  return { users };
};
