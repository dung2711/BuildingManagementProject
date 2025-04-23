import axiosClient from "./axios";

const login = async (email, password) => {
    try {
        return await axiosClient.post("/login", {email, password})
    } catch (error) {
        console.log(error)
    }
};

export default login;