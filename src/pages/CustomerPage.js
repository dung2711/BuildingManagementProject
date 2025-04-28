import React, { useState, useEffect, useRef } from "react";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../api/customerApi";
import NavBar from "../components/NavBar/NavBar";
import Card from "../components/Card/Card";
import "./Page.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomerForm from "../components/Form/CustomerForm";
import FilterForm from "../components/FilterForm/FilterForm";
import FlashMessage from "../components/FlashMessage";

function CustomerPage() {
    const [addCustomerFormOpened, setAddCustomerFormOpened] = useState(false);
    const [updateCustomerFormOpened, setUpdateCustomerFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [customers, setCustomers] = useState([]);
    const [flashMessage, setFlashMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const timeOutRef = useRef(null);

    const filterFields = [
        { name: "name", type: "text", placeholder: "Company Name" },
        { name: "director_name", type: "text", placeholder: "Director Name" },
        { name: "expired_from", type: "date", placeholder: "Contract Expired From:" },
        { name: "expired_to", type: "date", placeholder: "Contract Expired To:" },
        { name: "floor", type: "text", placeholder: "Floor" }
    ];

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const res = await getCustomers();
                setCustomers(res.data);
            } catch (error) {
                console.error("Failed to fetch customers", error);
            }
        };
        fetchCustomers();
    }, []);

    const openAddCustomerForm = () => {
        setAddCustomerFormOpened(true);
    };

    const closeAddCustomerForm = () => {
        setAddCustomerFormOpened(false);
    };

    const openUpdateCustomerForm = (customerData) => {
        setUpdateCustomerFormOpened(true);
        setInitialData(customerData);
    };

    const closeUpdateCustomerForm = () => {
        setUpdateCustomerFormOpened(false);
    };

    const handleAddCustomer = async (customerData) => {
        try {
            await createCustomer(customerData);
            closeAddCustomerForm();
            const res = await getCustomers();
            setCustomers(res.data);
            renderFlashMessage("Customer added successfully", "success");
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to add customer", "error");
        }
    };

    const handleUpdateCustomer = async (customerData) => {
        try {
            await updateCustomer(customerData);
            closeUpdateCustomerForm();
            const res = await getCustomers();
            setCustomers(res.data);
            renderFlashMessage("Customer updated successfully", "success");
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to update customer", "error");
        }
    };

    const deleteOneCustomer = async (email) => {
        try {
            await deleteCustomer(email);
            const res = await getCustomers();
            setCustomers(res.data);
            renderFlashMessage("Customer deleted successfully", "success");
        } catch (error) {
            console.error("Failed to delete customer", error);
            renderFlashMessage("Failed to delete customer", "error");
        }
    };

    const customerFilter = async (filters) => {
        try {
            console.log("Filters", filters)
            const res = await getCustomers(filters);
            setCustomers(res.data);
        } catch (error) {
            console.error("Failed to filter customers", error);
        }
    }

    const handleFlashMessageClose = () => {
        console.log("Flash message closed");
        setFlashMessage(false);
    };
    const renderFlashMessage = (msg, severity) => {
        console.log("Render flash message:");
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

            <FilterForm onFilter={customerFilter} fields={filterFields}/>

            <div className="data-section">
                {customers.map((customer) => {
                    return <Card data={customer} key={customer.id} type="customer"
                        openForm={openUpdateCustomerForm} deleteItem={deleteOneCustomer} />
                })}
            </div>
            <button className="addIcon" onClick={openAddCustomerForm}>
                <AddCircleOutlineIcon />
            </button>
            {addCustomerFormOpened && <CustomerForm initialData={""} onSubmit={handleAddCustomer} closeForm={closeAddCustomerForm} />}
            {updateCustomerFormOpened && <CustomerForm initialData={initialData} onSubmit={handleUpdateCustomer} closeForm={closeUpdateCustomerForm} />}
            {flashMessage && <FlashMessage message={message} severity={severity} closeMessage={handleFlashMessageClose} />}
        </div>
    );
}

export default CustomerPage;