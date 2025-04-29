import React, { useState, useEffect, useRef } from "react";
import { getUser, register, updateUser, deleteUser } from "../api/userApi";
import NavBar from "../components/NavBar/NavBar";
import Card from "../components/Card/Card";
import "./Page.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UserForm from "../components/Form/UserForm";
import { getCustomers } from "../api/customerApi";
import FilterForm from "../components/FilterForm/FilterForm";
import FlashMessage from "../components/FlashMessage";

function UserPage() {
    const [addUserFormOpened, setAddUserFormOpened] = useState(false);
    const [updateUserFormOpened, setUpdateUserFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [users, setUsers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [flashMessage, setFlashMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const timeOutRef = useRef(null);

    const filterFields = [
        { name: "name", type: "text", placeholder: "Name" },
        {
            name: "authentication", type: "select", placeholder: "Role:", options: [
                { value: "admin", label: "Admin" },
                { value: "manager", label: "Manager" },
                { value: "customer", label: "Customer" }
            ]
        },
        { name: "identification", type: "text", placeholder: "Identification" },
        { name: "customer_name", type: "text", placeholder: "Customer Name" }
    ];
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUser();
                const resCustomer = await getCustomers();
                setCustomers(resCustomer.data);
                setUsers(res.data);
            } catch (error) {
                console.error("Failed to fetch ", error);
            }
        };
        fetchUsers();
    }, []);
    const openAddUserForm = () => {
        setAddUserFormOpened(true);
    }
    const closeAddUserForm = () => {
        setAddUserFormOpened(false);
    }
    const openUpdateUserForm = (userData) => {
        setUpdateUserFormOpened(true);
        setInitialData(userData);
    }
    const closeUpdateUserForm = () => {
        setUpdateUserFormOpened(false);
    }
    const handleAddUser = async (userData) => {
        try {
            console.log("📤 Adding user:", userData);
            await register(userData);
            closeAddUserForm();
            const res = await getUser();
            setUsers(res.data);
            renderFlashMessage("User added successfully", "success");
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to add user", "error");
        }
    };

    const handleAddUsersByFile = async (users) => {
        try {
             for (const user of users){
                 await register({
                    email: user.Email,
                    password: "1",
                    authentication: user.Role,
                    name: user.Name,
                    phone_number: user["Phone Number"],
                    identification: user.Identification,
                    customer_name: user["Customer Name"],
                })
             }
            const res = await getUser();
            setUsers(res.data);
            console.log("getUser response", res.data)
            closeAddUserForm();
            renderFlashMessage("Users Added Succesfully", "success");

        } catch (error) {
            console.log(error.response?.data);
            renderFlashMessage("Error rendering users", "error");
        }
    }

    const handleUpdateUser = async (userData) => {
        try {
            await updateUser(userData);
            closeUpdateUserForm();
            const res = await getUser();
            setUsers(res.data);
            renderFlashMessage("User updated successfully", "success");
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to update user", "error");
        }
    }
    const deleteOneUser = async (email) => {
        try {
            await deleteUser(email);
            const res = await getUser();
            setUsers(res.data);
            renderFlashMessage("User deleted successfully", "success");
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to delete user", "error");
        }
    }

    const userFilter = async (filters) => {
        try {
            console.log("Filters", filters)
            const res = await getUser(filters);
            setUsers(res.data);
        } catch (error) {
            console.error("Failed to filter user", error);
        }
    }

    const handleFlashMessageClose = () => {
        setFlashMessage(false);
    };
    const renderFlashMessage = (msg, severity) => {
        setMessage(msg);
        setSeverity(severity);
        setFlashMessage(true);
        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
        }
        timeOutRef.current = setTimeout(() => {
            setFlashMessage(false);
        }, 3000);
    }
    return (
        <div>
            <NavBar />

            <FilterForm onFilter={userFilter} fields={filterFields} />

            <div className="data-section">
                {users.map((user) => {
                    const customer = customers.find(customer => customer.id === user.customer_id);
                    return <Card data={{ ...user, customer }} key={user.email} type="user"
                        openForm={openUpdateUserForm} deleteItem={deleteOneUser} />
                })}
            </div>
            <button className="addIcon" onClick={openAddUserForm}>
                <AddCircleOutlineIcon />
            </button>
            {addUserFormOpened && <UserForm initialData={""} onSubmit={handleAddUser} fileSubmit={handleAddUsersByFile} closeForm={closeAddUserForm} />}
            {updateUserFormOpened && <UserForm initialData={initialData} onSubmit={handleUpdateUser} closeForm={closeUpdateUserForm} />}
            {flashMessage && <FlashMessage message={message} severity={severity} closeMessage={handleFlashMessageClose} />}
        </div>

    )
}

export default UserPage;