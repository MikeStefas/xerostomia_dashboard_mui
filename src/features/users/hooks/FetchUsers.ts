import { useState, useEffect } from "react";
import { User } from "../types";
import { ViewUsers } from "../api/viewusers";

export const useFetchUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUserID, setSelectedUserID] = useState<number>(0);
    const selectedUser = users.find((r) => r.userID === selectedUserID) ?? null;

    // Fetch all users on page load
    useEffect(() => {
        const fetchAllUsers = async () => {
            const userData = await ViewUsers({
                chooseRole: "ANY",
                ofClinicianID: null,
            });
            setUsers(userData);
        };
        fetchAllUsers();
    }, []);

    return { users, selectedUserID, setSelectedUserID, selectedUser };
}