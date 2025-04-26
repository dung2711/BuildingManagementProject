import React, { useState, useEffect } from "react";
import "./Form.css";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const categories = [

    "Điện",
    "Nước",
    "Điều hòa / Quạt thông gió",
    "Internet / Hệ thống mạng",
    "Cửa / Cửa sổ / Khóa / Cửa cuốn",
    "Trần / Tường / Sàn",

]

export default function IssueForm({ initialData = {}, onSubmit, closeForm}) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        customer_name: "" || initialData?.customer?.name,
    });

    useEffect(() => {
        if (initialData?.id) {
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
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSubmit = { ...formData };
        if (dataToSubmit.numbers === "" || dataToSubmit.numbers === null) {
            delete dataToSubmit.numbers;
        }
        if (dataToSubmit.customer_name === "" || dataToSubmit.customer_name === null) {
            delete dataToSubmit.customer_name;
        }
        onSubmit(dataToSubmit);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
            {initialData.id ? <h1>Edit Issue</h1> : <h1>Add Issue</h1>}
                <select
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled hidden>-- Chọn loại dịch vụ --</option>
                    <option value="Sửa chữa">Sửa chữa</option>
                    <option value="Lắp đặt">Lắp đặt</option>
                </select>
                <select
                    name="category"
                    value={formData.category || ""}
                    onChange={handleChange}
                    required
                >
                    
                    <option value="" disabled hidden>-- Chọn hạng mục --</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name || ""}
                    placeholder="Customer Name"
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    value={formData.description || ""}
                    placeholder="Description"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="add-button">{initialData.id ? "Update" : "Add"} Issue</button>
                <button type="button" className="closeForm-button" onClick={closeForm}><ArrowBackOutlinedIcon /></button>
            </form>
        </div>
    );
}