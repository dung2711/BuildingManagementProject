import axiosClient from "./axios";

export const getUser = async (filter = {}) => {
    if(!filter) return await axiosClient.get("/user");
    const { name, authentication, identification, customer_name } = filter;
    return await axiosClient.get("/user", {
        params: {
            name,
            authentication,
            identification,
            customer_name
        }
    });
}

export const getUserById = async (email) => {
    return await axiosClient.get(`/user/${email}`);
}

export const register = async ({ email, password, authentication,
    name, phone_number, identification, customer_name }) => {
    return await axiosClient.post("/user", {
        email, password, authentication,
        name, phone_number, identification, customer_name
    })
}

export const updateUser = async ({ email, authentication,
    name, phone_number, identification, customer_name }) => {
    
        return await axiosClient.patch(`/user/${email}`, {
            authentication,
            name, phone_number, identification, customer_name
        })
    
}

export const deleteUser = async (email) => {
    return await axiosClient.delete(`/user/${email}`);
}

