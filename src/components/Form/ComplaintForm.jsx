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
    const [isClosing, setIsClosing] = useState(false);

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

    const handleSubmit = async (event) => {
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
        const success = await onSubmit(dataToSubmit);
        if(success){
            handleClose();
        }
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeForm()
        }, 500);
    }

    return (
        <div className={`form-container ${isClosing ? "fade-out" : ""}`}>
            <form onSubmit={handleSubmit} className="form">
                {initialData.id ? <h1>Update complaint/feedback</h1> : <h1>Add complaint/feedback</h1>}
                <label htmlFor="type"><strong>Type</strong></label>
                <select
                    id="type"
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
                <label htmlFor="category"><strong>Category</strong></label>
                <select
                    id="category"
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
                <label htmlFor="description"><strong>Description</strong></label>
                <textarea
                    name="description"
                    value={formData.description || ""}
                    placeholder="Description"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="add-button">{initialData.id ? "Update" : "Add"} Complaint</button>
                <button type="button" className="closeForm-button" onClick={handleClose}><ArrowBackOutlined /></button>
            </form>
        </div>
    );
}