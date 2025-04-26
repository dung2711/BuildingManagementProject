import React, { useState, useEffect } from "react";
import "./Form.css"
import { ArrowBackOutlined } from "@mui/icons-material";

export default function UserForm({ initialData ={} , onSubmit, closeForm }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        authentication: "customer", 
        name: "",
        phone_number: "",
        identification: "",
        customer_name: "" || initialData?.customer?.name
    });

    useEffect(() => {
        if (initialData?.email) {
          setFormData(prev => ({
            ...prev,
            ...initialData,
          }));
        }
      }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        const dataToSubmit = {...formData };
        if(dataToSubmit.customer_name === "") {
            delete dataToSubmit.customer_name;
        }
        if(dataToSubmit.phone_number === "") {
            delete dataToSubmit.phone_number;
        }
        if(dataToSubmit.identification === "") {
            delete dataToSubmit.identification;
        }
        if(dataToSubmit.name === "") {
            delete dataToSubmit.name;
        }
        event.preventDefault();
        onSubmit(formData); 
    };
    return (
        <div className="form-container">
        <form onSubmit={handleSubmit} className ="form">
            {initialData.id? <h1>Update User</h1> : <h1>Add User</h1>}
            <input
                type="email"
                name="email"
                value={formData.email || ""}
                placeholder="Email" 
                onChange={handleChange}
                required
            />
            {!initialData.email && <input
                type="text"
                name="password"
                value={formData.password || ""}
                placeholder="password"
                onChange={handleChange}
                required
            />}
            <select
                name="authentication"
                value={formData.authentication}
                onChange={handleChange}
                required
            >
                <option value="customer">Customer</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
            </select>

            <input
                type="text"
                name="name"
                value={formData.name || ""}
                placeholder="Name"
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="phone_number"
                value={formData.phone_number || ""}
                placeholder="Phone Number"
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="identification"
                value={formData.identification || ""}
                placeholder="Identification"
                onChange={handleChange}
                required
            />

             
                <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name || ""}
                    placeholder="Customer Name"
                    onChange={handleChange}
                />
            

            <button type="submit" className="add-button">{initialData.email ? "Update" : "Add"} User</button>
            <button type="button" className="closeForm-button" onClick={closeForm}><ArrowBackOutlined /></button>
        </form>
        </div> 
    );
}
