import axiosClient from "./axios"

export const getIssues = async (filters={}) => {
    if(!filters) {
        console.log(!filters == false)
        return axiosClient.get("/issue");
    }
    const { name, category,  customer_name }= filters;
    return axiosClient.get("/issue", {
        params: {
            name,
            category,
            customer_name
        }
    });
}

export const getIssueById = async (id) => {
    return axiosClient.get(`/issue/${id}`);
}

export const createIssue = async ({name, category, numbers, 
    description, customer_name }) => {
    return axiosClient.post(`/issue`, {name, category, numbers, description, customer_name })
}

export const updateIssue = async ({id, name, category, numbers, 
    description, customer_name }) => {
    return axiosClient.patch(`/issue/${id}`, {name, category, numbers, description, customer_name })
}

export const deleteIssue = async (id) => {
    return axiosClient.delete(`/issue/${id}`);
}