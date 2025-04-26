import React, { useState, useEffect } from "react";
import { getUser, register, updateUser, deleteUser } from "../api/userApi";
import NavBar from "../components/NavBar/NavBar";
import Card from "../components/Card/Card";
import "./Page.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UserForm from "../components/Form/UserForm";
import { getCustomers } from "../api/customerApi";
import FilterForm from "../components/FilterForm/FilterForm";

function UserPage() {
    const [addUserFormOpened, setAddUserFormOpened] = useState(false);
    const [updateUserFormOpened, setUpdateUserFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [users, setUsers] = useState([]);
    const [customers, setCustomers] = useState([]);
    const filterFields = [
        { name: "name", type: "text", placeholder: "Name" },
        { name: "authentication", type: "select", placeholder: "Role:", options: [
            { value: "admin", label: "Admin" },
            { value: "manager", label: "Manager" },
            { value: "customer", label: "Customer" }
        ]},
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
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    };

    const handleUpdateUser = async (userData) => {
        try {
            await updateUser(userData);
            closeUpdateUserForm();
            const res = await getUser();
            setUsers(res.data);
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    }
    const deleteOneUser = async (email) => {
        try {
            await deleteUser(email);
            const res = await getUser();
            setUsers(res.data);
        } catch (error) {
            
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
    return (
        <div>
            <NavBar />

            <FilterForm onFilter={userFilter} fields={filterFields}/>

            <div className="data-section">
                {users.map((user) => {
                    const customer = customers.find(customer => customer.id === user.customer_id);
                    return <Card data={{...user, customer}} key={user.email} type="user"
                        openForm={openUpdateUserForm} deleteItem={deleteOneUser} />
                })}
            </div>
            <button className="addIcon" onClick={openAddUserForm}>
                <AddCircleOutlineIcon />
            </button>
            {addUserFormOpened && <UserForm initialData={""} onSubmit={handleAddUser} closeForm={closeAddUserForm} />}
            {updateUserFormOpened && <UserForm initialData={initialData} onSubmit={handleUpdateUser} closeForm={closeUpdateUserForm} />}
        </div>

    )
}

export default UserPage;