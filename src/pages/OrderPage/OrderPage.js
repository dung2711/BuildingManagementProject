import React, { useState, useEffect } from "react";
import { getOrders, createOrder, updateOrder, deleteOrder } from "../../api/orderApi";
import { getCustomers } from "../../api/customerApi";
import NavBar from "../../components/NavBar/NavBar";
import "./OrderPage.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import OrderForm from "../../components/OrderForm/OrderForm";
import { useAuth } from "../../contexts/AuthContext";
import FilterForm from "../../components/FilterForm/FilterForm";
import GeneralCard from "../../components/GeneralCard/GeneralCard";
import DetailCard from "../../components/DetailCard/DetailCard";

function OrderPage() {
    const [addOrderFormOpened, setAddOrderFormOpened] = useState(false);
    const [updateOrderFormOpened, setUpdateOrderFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [currentOrder, setCurrentOrder] = useState({});
    const [openDetail, setOpenDetail] = useState(false);
    const { role } = useAuth();
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
        { name: "order_date_from", type: "date", placeholder: "Order Date From:" },
        { name: "order_date_to", type: "date", placeholder: "Order Date To:" },
        { name: "floor", type: "text", placeholder: "Floor" },
        {
            name: "lift_required", type: "select", placeholder: "Lift Required", options: [
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" }
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

    const openDetailCard = (orderData) => {
        setOpenDetail(true);
        setCurrentOrder(orderData);
    };

    const closeDetailCard = async () => {
        setOpenDetail(false);
        const res = await getOrders();
        setOrders(res.data);
        setCurrentOrder({});
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
            if (openDetail) {
                const updatedOrder = res.data.find(order => order.id === orderData.id);
                const customer = customers.find(c => c.id === updatedOrder.customer_id);
                setCurrentOrder({ ...updatedOrder, customer });
            }
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    };

    const deleteOneOrder = async (orderId) => {
        try {
            console.log("📤 Deleting order:", orderId);
            await deleteOrder(orderId);
            setOpenDetail(false);
            setCurrentOrder({});
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

            <FilterForm onFilter={filterOrder} fields={filterFields} />
            <div id="order-section">
                {orders.map((order) => {
                    const customer = customers.find((customer) => customer.id === order.customer_id);
                    return (
                        <GeneralCard
                            data={{ ...order, customer }}
                            key={order.id}
                            type="order"
                            openDetailCard={openDetailCard}
                        />
                    )
                })}
            </div>
            <button id="addIcon" onClick={openAddOrderForm}>
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
                />}
            {addOrderFormOpened && <OrderForm initialData={""} onSubmit={handleAddOrder} closeForm={closeAddOrderForm} role={role} />}
            {updateOrderFormOpened && <OrderForm initialData={initialData} onSubmit={handleUpdateOrder} closeForm={closeUpdateOrderForm} role={role} />}
        </div>
    );
}

export default OrderPage;