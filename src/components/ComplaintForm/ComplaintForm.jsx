import React, { useState, useEffect } from "react";
import "./ComplaintForm.css";

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
            <form onSubmit={handleSubmit} id="complaint-form">

                <input
                    type="text"
                    name="types"
                    value={formData.types || ""}
                    placeholder="Type"
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
                <button type="submit">{initialData.id ? "Update" : "Add"} Complaint</button>
                <button type="button" onClick={closeForm}>Close</button>
            </form>
        </div>
    );
}