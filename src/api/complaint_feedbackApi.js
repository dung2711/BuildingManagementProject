import axiosClient from "./axios";

export const getComplaintFeedbacks = async (filter) => {
    if(!filter) return axiosClient.get("/complaint");
    const {types, category} = filter;
    return axiosClient.get("/complaint", {
        params: {
            types,
            category
        }
    });
}

export const getComplaintFeedbackById = async (id) => {
    return axiosClient.get(`/complaint/${id}`);
}

export const createComplaintFeedback = async ({types, 
    category, description
}) => {
    return axiosClient.post(`/complaint`, {types, 
        category, description
    })
}

export const updateComplaintFeedback = async ({id, types, 
    category, description
}) => {
    return axiosClient.patch(`/complaint/${id}`, {types, 
        category, description
    });
}

export const deleteComplaintFeedback = async (id) => {
    return axiosClient.delete(`/complaint/${id}`);
}