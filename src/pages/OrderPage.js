import React, { useState, useEffect, useRef } from "react";
import { getOrders, getOrderConflictById, createOrder, updateOrder, deleteOrder } from "../api/orderApi";
import { getCustomers } from "../api/customerApi";
import NavBar from "../components/NavBar/NavBar";
import "./Page.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import OrderForm from "../components/Form/OrderForm";
import { useAuth } from "../contexts/AuthContext";
import FilterForm from "../components/FilterForm/FilterForm";
import GeneralCard from "../components/GeneralCard/GeneralCard";
import DetailCard from "../components/DetailCard/DetailCard";
import FlashMessage from "../components/FlashMessage";

function OrderPage() {
    const [addOrderFormOpened, setAddOrderFormOpened] = useState(false);
    const [updateOrderFormOpened, setUpdateOrderFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});
    const [openDetail, setOpenDetail] = useState(false);
    const [filter, setFilter] = useState([]);
    const [conflictOrder, setConflictOrder] = useState({});
    const [openConflictOrder, setOpenConflictOrder] = useState(false);

    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const [flashMessage, setFlashMessage] = useState(false);

    const { role } = useAuth();
    const timeOutRef = useRef(null);

    const filterFields = [
        {
            name: "status", type: "select", placeholder: "Status", options: [
                { value: "Đang xử lý", label: "Đang xử lý" },
                { value: "Đã hủy", label: "Đã hủy" },
                { value: "Chấp nhận", label: "Chấp nhận" },
                { value: "Từ chối", label: "Từ chối" }
            ]
        },
        { name: "category", type: "text", placeholder: "Category", },
        { name: "order_date_from", type: "date", placeholder: "Order Date From" },
        { name: "order_date_to", type: "date", placeholder: "Order Date To" },
        { name: "floor", type: "text", placeholder: "Floor" },
        {
            name: "lift_required", type: "select", placeholder: "Lift Required", options: [
                { value: "Cần thang máy", label: "Cần thang máy" },
                { value: "Không cần thang máy", label: "Không cần thang máy" }
            ]
        },
        { name: "customer_name", type: "text", placeholder: "Customer Name" }
    ];

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const customersRes = await getCustomers();
                setCustomers(customersRes.data);
                const res = await getOrders();
                setOrders(res.data);
                console.log(res);
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
        setFlashMessage(false);
    };

    const openUpdateOrderForm = (orderData) => {
        setUpdateOrderFormOpened(true);
        setInitialData(orderData);
    };

    const closeUpdateOrderForm = () => {
        setUpdateOrderFormOpened(false);
        setFlashMessage(false);
    };

    const openDetailCard = async (orderData) => {
        const orderConflicts = (await getOrderConflictById(orderData.id)).data;
        setOpenDetail(true);
        setCurrentOrder({...orderData, orderConflicts});
    };

    const closeDetailCard = async () => {
        setOpenDetail(false);
        const res = await getOrders(filter);
        setOrders(res.data);
        setCurrentOrder({});
    };

    const handleAddOrder = async (orderData) => {
        try {
            await createOrder(orderData);
            const res = await getOrders(filter);
            setOrders(res.data);
            renderFlashMessage("Add order successfully", "success");
            return true;
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Add order failed", "error");
        }
    };

    const handleUpdateOrder = async (orderData) => {
        try {
            await updateOrder(orderData);
            const res = await getOrders(filter);
            setOrders(res.data);
            if (openDetail) {
                const updatedOrder = res.data.find(order => order.id === orderData.id);
                const customer = customers.find(c => c.id === updatedOrder.customer_id);
                const orderConflicts = (await getOrderConflictById(updatedOrder.id)).data;
                setCurrentOrder({ ...updatedOrder, customer, orderConflicts });
            }
            renderFlashMessage("Update order successfully", "success");
            return true;
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Update order failed", "error");
        }
    };

    const deleteOneOrder = async (orderId) => {
        try {
            await deleteOrder(orderId);
            renderFlashMessage("Delete order successfully", "success");
            return true;
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Delete order failed", "error");
            return false;
        }
    };

    const filterOrder = async (filters) => {
        setFilter(filters);
        try {
            const res = await getOrders(filters);
            setOrders(res.data);
        } catch (error) {
            console.error("Failed to filter orders", error);
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

    const handleConflictOrder = async (orderId) => {
        // const order = orders.find(order => order.id === orderId);
        // if (order) {
        //     setConflictOrder(order);
        //     setOpenConflictOrder(true); 
        // }
        const order = orders.find(order => order.id === orderId);
        console.log("Conflict order", order);
        const orderConflicts = (await getOrderConflictById(orderId)).data;
        const customer = customers.find((customer) => customer.id === order.customer_id);
        setConflictOrder({ ...order, orderConflicts, customer });
        setOpenConflictOrder(true);

    }
    return (
        <div>
            <NavBar />

            {role === "manager" && <FilterForm onFilter={filterOrder} fields={filterFields} />}
            <div className="data-section">
                {orders.map((order) => {
                    const customer = customers.find((customer) => customer.id === order.customer_id);
                    return (
                        <GeneralCard
                            data={{ ...order, customer}}
                            key={order.id}
                            type="order"
                            openDetailCard={openDetailCard}
                        />
                    )
                })}
            </div>
            <button className="addIcon" onClick={openAddOrderForm}>
                <AddCircleOutlineIcon />
            </button>
            {openDetail &&
                <DetailCard
                    data={currentOrder}
                    type="order"
                    openForm={openUpdateOrderForm}
                    deleteItem={deleteOneOrder}
                    closeForm={closeDetailCard}
                    role={role}
                    renderFlashMessage={renderFlashMessage}
                    handleConflictOrder={handleConflictOrder}
                />}
            {openConflictOrder &&
                <DetailCard
                    data={conflictOrder}
                    type="order"
                    openForm={openUpdateOrderForm}
                    deleteItem={deleteOneOrder}
                    closeForm={() => setOpenConflictOrder(false)}
                    role={role}
                    renderFlashMessage={renderFlashMessage}
                    handleConflictOrder={handleConflictOrder}
                />}
            {addOrderFormOpened && <OrderForm onSubmit={handleAddOrder} closeForm={closeAddOrderForm} role={role} />}
            {updateOrderFormOpened && <OrderForm initialData={initialData} onSubmit={handleUpdateOrder} closeForm={closeUpdateOrderForm} role={role} />}
            {flashMessage && <FlashMessage message={message} severity={severity} closeMessage={handleFlashMessageClose} />}
        </div>
    );
}

export default OrderPage;