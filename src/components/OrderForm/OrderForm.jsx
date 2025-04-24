import React, { useState, useEffect } from "react";
import "./OrderForm.css";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export default function OrderForm({ initialData = {}, onSubmit, closeForm, role }) {
    const [formData, setFormData] = useState({
        order_date: "",
        category: "",
        observator: "",
        observator_phone_number: "",
        floor: "",
        lift_required: "Yes",
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
        if(dataToSubmit.observator_phone_number === "" || dataToSubmit.observator_phone_number === null) {
            delete dataToSubmit.observator_phone_number;
        }
        if(dataToSubmit.observator === "" || dataToSubmit.observator === null) {
            delete dataToSubmit.observator;
        }
        if(dataToSubmit.customer_name === "" || dataToSubmit.customer_name === null) {
            delete dataToSubmit.customer_name;
        }
        onSubmit(dataToSubmit);
    };

    return (
        <div className="form-container">
            <div id="order-form">
            {initialData.id ? <h1>Sửa lịch vận chuyển</h1> : <h1>Đặt lịch vận chuyển</h1>}
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    name="order_date"
                    value={formData.order_date || ""}
                    placeholder="Order Date"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    value={formData.category || ""}
                    placeholder="Category"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="observator"
                    value={formData.observator ? formData.observator : ""}
                    placeholder="Observator"
                    onChange={handleChange}
                />
                <input
                    type="phone"
                    name="observator_phone_number"
                    value={formData.observator_phone_number || ""}
                    placeholder="Observator Phone Number"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="floor"
                    value={formData.floor || ""}
                    placeholder="Floor"
                    onChange={handleChange}
                    required
                />
                <select
                    name="lift_required"
                    value={formData.lift_required}
                    onChange={handleChange}
                    required
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>

                </select>

                {role==="manager" && <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name || ""}
                    placeholder="Customer Name"
                    onChange={handleChange}
                    required
                />}

                <textarea
                    name="description"
                    value={formData.description || ""}
                    placeholder="Description"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="add-button">{initialData.id ? "Update" : "Add"} Order</button>
                <button type="button" className="closeForm-button" onClick={closeForm}><ArrowBackOutlinedIcon /></button>
            </form>
            </div>
        </div>
    );
}