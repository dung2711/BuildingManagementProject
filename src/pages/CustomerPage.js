import React, { useState, useEffect } from "react";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../api/customerApi";
import NavBar from "../components/NavBar/NavBar";
import Card from "../components/Card/Card";
import "./Page.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CustomerForm from "../components/Form/CustomerForm";
import FilterForm from "../components/FilterForm/FilterForm";

function CustomerPage() {
    const [addCustomerFormOpened, setAddCustomerFormOpened] = useState(false);
    const [updateCustomerFormOpened, setUpdateCustomerFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [customers, setCustomers] = useState([]);
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
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    };

    const handleUpdateCustomer = async (customerData) => {
        try {
            await updateCustomer(customerData);
            closeUpdateCustomerForm();
            const res = await getCustomers();
            setCustomers(res.data);
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    };

    const deleteOneCustomer = async (email) => {
        try {
            await deleteCustomer(email);
            const res = await getCustomers();
            setCustomers(res.data);
        } catch (error) {
            console.error("Failed to delete customer", error);
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
        </div>
    );
}

export default CustomerPage;