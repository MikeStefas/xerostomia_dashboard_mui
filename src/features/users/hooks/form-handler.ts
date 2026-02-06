import { useState, useEffect } from "react";
import { User } from "../types";
import { UpdateUserDataRequest } from "../api/update-user-data";

export const useFormHandler = (selectedUser: User | null) => {
    const [formData, setFormData] = useState<User | null>(null);

    //update the form data state whenever selectedUser changes
    useEffect(() => {
        if (selectedUser) {
            setFormData(selectedUser);
        } else {
            setFormData(null);
        }
    }, [selectedUser]);

    // updates the state for a specific key in the object
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            if (!prevData) return null;
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    // Handler for the Save button
    const handleSave = async () => {
        if (formData) {
            setFormData(formData);
            const res = await UpdateUserDataRequest(formData);

            //reload ONLY if it was successful
            if (res === "Success") {
                alert(res + ". Reloading ...");
                window.location.reload();
            } else {
                alert(res);
            }
        }
    };

    return { formData, handleInputChange, handleSave, setFormData };
}