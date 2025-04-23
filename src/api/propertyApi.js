import axiosClient from "./axios"

export const getProperties = async (filters={}) => {
    if(!filters) return axiosClient.get("/property");
    const {name, category} = filters;
    return axiosClient.get("/property", {
        params: {
            name: name ,
            category: category 
        }
    });
}

export const getPropertyById = async (id) => {
    return axiosClient.get(`/property/${id}`);
}

export const createProperty = async ({name, category, description, numbers}) => {
    return axiosClient.post("/property", {name, category, description, numbers})
}

export const updateProperty = async ({id, name, category, description, numbers}) => {
    return axiosClient.patch(`/property/${id}`, {name, category, description, numbers})
}

export const deleteProperty = async (id) => {
    return axiosClient.delete(`/property/${id}`);
}