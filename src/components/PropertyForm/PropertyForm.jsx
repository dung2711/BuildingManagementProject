import React, { useState, useEffect } from "react";
import "./PropertyForm.css";

export default function PropertyForm({ initialData = {}, onSubmit, closeForm }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        numbers: "",
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
        onSubmit(dataToSubmit);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} id="property-form">
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
                    name="category"
                    value={formData.category || ""}
                    placeholder="Category"
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
                <input
                    type="number"
                    name="numbers"
                    value={formData.numbers || ""}
                    placeholder="Numbers"
                    onChange={handleChange}
                />
                <button type="submit">{initialData.id ? "Update" : "Add"} Property</button>
                <button type="button" onClick={closeForm}>Close</button>
            </form>
        </div>
    );
}