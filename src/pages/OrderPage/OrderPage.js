import React, { useState, useEffect } from "react";
import { getOrders, createOrder, updateOrder, deleteOrder } from "../../api/orderApi";
import { getCustomers } from "../../api/customerApi";
import NavBar from "../../components/NavBar/NavBar";
import Card from "../../components/Card/Card";
import "./OrderPage.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import OrderForm from "../../components/OrderForm/OrderForm";
import { useAuth } from "../../contexts/AuthContext";
import FilterForm from "../../components/FilterForm/FilterForm";

function OrderPage() {
    const [addOrderFormOpened, setAddOrderFormOpened] = useState(false);
    const [updateOrderFormOpened, setUpdateOrderFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const {role} = useAuth();
    const filterFields = [
        { name: "category", type: "text", placeholder: "Category", },
        { name: "order_date_from", type: "date", placeholder: "Order Date From:" },
        { name: "order_date_to", type: "date", placeholder: "Order Date To:" },
        { name: "floor", type: "text", placeholder: "Floor" },
        { name: "lift_required", type: "select", placeholder: "Lift Required", options: [
            {value: "Yes", label: "Yes" },
            { value: "No", label: "No" }
        ] },
        { name: "customer_name", type: "text", placeholder: "Customer Name" }
    ];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const customersRes = await getCustomers();
                setCustomers(customersRes.data);
                const res = await getOrders();
                setOrders(res.data);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            }
        };
        fetchOrders();
    }, []);

    const openAddOrderForm = () => {
        setAddOrderFormOpened(true);
    };

    const closeAddOrderForm = () => {
        setAddOrderFormOpened(false);
    };

    const openUpdateOrderForm = (orderData) => {
        console.log("📤 Opening update order form with data:", orderData);
        setUpdateOrderFormOpened(true);
        setInitialData(orderData);
    };

    const closeUpdateOrderForm = () => {
        setUpdateOrderFormOpened(false);
    };

    const handleAddOrder = async (orderData) => {
        try {
            console.log("📤 Adding order:", orderData);
            await createOrder(orderData);
            closeAddOrderForm();
            const res = await getOrders();
            setOrders(res.data);
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    };

    const handleUpdateOrder = async (orderData) => {
        try {
            console.log("📤 Updating order:", orderData);
            await updateOrder(orderData);
            closeUpdateOrderForm();
            const res = await getOrders();
            setOrders(res.data);
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    };

    const deleteOneOrder = async (orderId) => {
        try {
            console.log("📤 Deleting order:", orderId);
            await deleteOrder(orderId);
            const res = await getOrders();
            setOrders(res.data);
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    };

    const filterOrder = async (filters) => {
        try {
            const res = await getOrders(filters);
            setOrders(res.data);
        } catch (error) {
            console.error("Failed to filter orders", error);
        }
    }
    return (
        <div>
            <NavBar />

            <FilterForm onFilter={filterOrder} fields={filterFields}/>
            <div id="order-section">
                {orders.map((order) => {
                    const customer = customers.find((customer) => customer.id === order.customer_id);
                    return (
                    <Card
                        data={{...order, customer}}
                        key={order.id}
                        type="order"
                        openForm={openUpdateOrderForm}
                        deleteItem={deleteOneOrder}
                    />
                )})}
            </div>
            <button id="addIcon" onClick={openAddOrderForm}>
                <AddCircleOutlineIcon />
            </button>
            {addOrderFormOpened && <OrderForm initialData={""} onSubmit={handleAddOrder} closeForm={closeAddOrderForm} role={role}/>}
            {updateOrderFormOpened && <OrderForm initialData={initialData} onSubmit={handleUpdateOrder} closeForm={closeUpdateOrderForm} role={role}/>}
        </div>
    );
}

export default OrderPage;