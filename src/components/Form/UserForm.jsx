import React, { useState, useEffect } from "react";
import "./Form.css"
import { ArrowBackOutlined } from "@mui/icons-material";
import * as XLSX from "xlsx"

export default function UserForm({ initialData = {}, onSubmit, closeForm, fileSubmit }) {
    const [fileData, setFileData] = useState([]);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        authentication: "",
        name: "",
        phone_number: "",
        identification: "",
        customer_name: "" || initialData?.customer?.name
    });
    const [isClosing, setIsClosing] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        let success;
        if (fileData.length > 0) {
            success = await fileSubmit(fileData);
        } else {
            const dataToSubmit = { ...formData };
            if (dataToSubmit.customer_name === "") {
                delete dataToSubmit.customer_name;
            }
            if (dataToSubmit.phone_number === "") {
                delete dataToSubmit.phone_number;
            }
            if (dataToSubmit.identification === "") {
                delete dataToSubmit.identification;
            }
            if (dataToSubmit.name === "") {
                delete dataToSubmit.name;
            }
            success = await onSubmit(formData);
        }
        if (success) {
            handleClose();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setFileData(jsonData);
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeForm();
        }, 500);
    }
    return (
        <div className={`form-container ${isClosing ? "fade-out" : ""}`}>
            <form onSubmit={handleSubmit} className="form">
                {initialData.email ? <h1>Update User</h1> : <h1>Add User</h1>}
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    placeholder="Email"
                    onChange={handleChange}
                    required={fileData ? 0 : 1}
                    disabled={initialData.email ? 1 : 0}
                />

                {!initialData.email &&
                    <>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            id="password"
                            type="text"
                            name="password"
                            value={formData.password || ""}
                            placeholder="password"
                            onChange={handleChange}
                            required={fileData ? 0 : 1}
                        />
                    </>}
                <label htmlFor="authentication"><strong>Authentication</strong></label>
                <select
                    id="authentication"
                    name="authentication"
                    value={formData.authentication}
                    onChange={handleChange}
                    required={fileData ? 0 : 1}
                >
                    <option value="" hidden disabled>--Chọn loại vai trò--</option>
                    <option value="customer">Customer</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                </select>
                <label htmlFor="name"><strong>Name</strong></label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    placeholder="Name"
                    onChange={handleChange}
                    required={fileData ? 0 : 1}
                />
                <label htmlFor="phone_number"><strong>Phone Number</strong></label>
                <input
                    id="phone_number"
                    type="text"
                    name="phone_number"
                    value={formData.phone_number || ""}
                    placeholder="Phone Number"
                    onChange={handleChange}
                    required={fileData ? 0 : 1}
                />
                <label htmlFor="identification"><strong>Identification</strong></label>
                <input
                    id="identification"
                    type="text"
                    name="identification"
                    value={formData.identification || ""}
                    placeholder="Identification"
                    onChange={handleChange}
                    required={fileData ? 0 : 1}
                />

                <label htmlFor="customer_name"><strong>Customer Name</strong></label>
                <input
                    id="customer_name"
                    type="text"
                    name="customer_name"
                    value={formData.customer_name || ""}
                    placeholder="Customer Name"
                    onChange={handleChange}
                />
                {!initialData.email &&
                    <>
                        <label htmlFor="fileInput"><strong>Insert User File Here</strong></label>
                        <input id="fileInput" type="file" accept=".xlsx" onChange={handleFileChange} />
                    </>
                }

                <button type="submit" className="add-button">{initialData.email ? "Update" : "Add"} User</button>
                <button type="button" className="closeForm-button" onClick={handleClose}><ArrowBackOutlined /></button>
            </form>
        </div>
    );
}
