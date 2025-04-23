import React, { useState, useEffect } from "react";
import "./IssueForm.css";

export default function IssueForm({ initialData = {}, onSubmit, closeForm, role }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        numbers: "",
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
            <form onSubmit={handleSubmit} id="issue-form">
                <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    placeholder="Issue Name"
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
                    name="numbers"
                    value={formData.numbers || ""}
                    placeholder="Numbers"
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    value={formData.description || ""}
                    placeholder="Description"
                    onChange={handleChange}
                    required
                />
                {role ==="manager" && <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name || ""}
                    placeholder="Customer Name"
                    onChange={handleChange}
                    required
                />}
                <button type="submit">{initialData.id ? "Update" : "Add"} Issue</button>
                <button type="button" onClick={closeForm}>Close</button>
            </form>
        </div>
    );
}