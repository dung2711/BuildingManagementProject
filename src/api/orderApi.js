import axiosClient from "./axios"

export const getOrders = async (filters = {}) => {
    if(!filters) return axiosClient.get("/order");
    const { order_from, order_to
        , category, floor, lift_required, status, customer_name } = filters;
    return axiosClient.get("/order", {
        params: {
            order_from, order_to, category, floor, status, lift_required, customer_name
        }
    });
}

export const getOrderById = async (id) => {
    return axiosClient.get(`/order/${id}`);
}

export const createOrder = async ({
    order_date, category, observator, observator_phone_number
    , floor, lift_required, description, customer_name
}) => {
    return axiosClient.post(`/order`, {
        order_date, category, observator, observator_phone_number
        , floor, lift_required, description, customer_name
    })
}

export const updateOrder = async ({id,
    order_date, category, observator, observator_phone_number
    , floor, lift_required, status, description, customer_name
}) => {
    return axiosClient.patch(`/order/${id}`, {
        order_date, category, observator, observator_phone_number
        , floor, lift_required, status, description, customer_name
    })
}

export const deleteOrder = async (id) => {
    return axiosClient.delete(`/order/${id}`);
}
