import axiosClient from "./axios"

export const getCustomers = async (filters={}) => {
    if(!filters) return await axiosClient.get("/customer");
    if(filters) {
        const { name, director_name, expired_from, expired_to, floor } = filters;
        return await axiosClient.get("/customer", {
            params: {
                name,
                director_name,
                expired_from,
                expired_to,
                floor
            }
        });
    }
}

export const getCustomerById = async (id) => {
    return await axiosClient.get(`/customer/${id}`);
}

export const createCustomer = async ({ name, floor,rented_area, contract_expired_time,
    contact_person, contact_number, director_name, director_phone_number }) => {
        return axiosClient.post("/customer", {name, floor,rented_area, contract_expired_time,
            contact_person, contact_number, director_name, director_phone_number});
}

export const updateCustomer = async ({id, name, floor,rented_area, contract_expired_time,
    contact_person, contact_number, director_name, director_phone_number }) => {
        return axiosClient.patch(`/customer/${id}`, {name, floor,rented_area, contract_expired_time,
            contact_person, contact_number, director_name, director_phone_number});
}

export const deleteCustomer = async (id) => {
    return axiosClient.delete(`/customer/${id}`)
}