import React, { useState, useEffect } from "react";
import "./Form.css";
import { ArrowBackOutlined } from "@mui/icons-material";

const categories = [
    "Vệ sinh",
    "Bảo vệ",
    "Tiếng ồn",
    "Tiện ích",
    "Dịch vụ khách hàng"
];

export default function ComplaintForm({ initialData = {}, onSubmit, closeForm }) {
    const [formData, setFormData] = useState({
        types: "",
        category: "",
        description: "",
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
        if (dataToSubmit.types === "" || dataToSubmit.types === null) {
            delete dataToSubmit.types;
        }
        if (dataToSubmit.category === "" || dataToSubmit.category === null) {
            delete dataToSubmit.category;
        }
        if (dataToSubmit.description === "" || dataToSubmit.description === null) {
            delete dataToSubmit.description;
        }
        onSubmit(dataToSubmit);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                {initialData.id? <h1>Update complaint/feedback</h1> : <h1>Add complaint/feedback</h1>}
                <select
                    name="types"
                    value={formData.types}
                    onChange={handleChange}
                    required
                >   
                    <option value="" disabled hidden>-- Chọn loại khiếu nại --</option>
                    <option value="Khiếu nại">Khiếu nại</option>
                    <option value="Góp ý">Góp ý</option>
                    <option value="Khác">Khác</option>
                </select>
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >   
                    <option value="" disabled hidden>-- Chọn hạng mục --</option>
                    {categories.map((category) => {
                        return (
                            <option value={category}>{category}</option>
                        )
                    })}
                </select>
                <textarea
                    name="description"
                    value={formData.description || ""}
                    placeholder="Description"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="add-button">{initialData.id ? "Update" : "Add"} Complaint</button>
                <button type="button" className="closeForm-button" onClick={closeForm}><ArrowBackOutlined /></button>
            </form>
        </div>
    );
}