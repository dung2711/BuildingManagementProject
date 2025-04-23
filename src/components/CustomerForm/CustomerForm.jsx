import React, { useState, useEffect } from "react";
import "./CustomerForm.css"

export default function UserForm({ initialData = {}, onSubmit, closeForm }) {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        floor: "",
        rented_area: "",
        contract_expired_time: "",
        contact_person: "",
        contact_number: "",
        director_name: "",
        director_phone_number: "",
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
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const dataToSubmit = {...formData };
        if(dataToSubmit.contact_person === "") {
            delete dataToSubmit.contact_person;
        }
        if(dataToSubmit.contact_number === "") {
            delete dataToSubmit.contact_number;
        }
        if(dataToSubmit.director_name === "") {
            delete dataToSubmit.director_name;
        }
        if(dataToSubmit.director_phone_number === "") {
            delete dataToSubmit.director_phone_number;
        }
        
        onSubmit(dataToSubmit);
    };
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} id="customer-form">
                <input
                    type="text"
                    name="name"
                    value={formData.name ? formData.name : ""}
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="floor"
                    value={formData.floor || ""}
                    placeholder="Floor"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="rented_area"
                    value={formData.rented_area || ""}
                    placeholder="Rented Area"
                    onChange={handleChange}
                    required
                />


                <input
                    type="date"
                    name="contract_expired_time"
                    value={formData.contract_expired_time || ""}
                    placeholder="Contract Expired Time"
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="contact_person"
                    value={formData.contact_person ? formData.contact_person : ""}  
                    placeholder="Contact Person"
                    onChange={handleChange}
                />

                <input
                    type="phone"
                    name="contact_number"
                    value={formData.contact_number || ""}
                    placeholder="Contact Number"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="director_name"
                    value={formData.director_name || ""}
                    placeholder="Director Name"
                    onChange={handleChange}
                />

                <input
                    type="phone"
                    name="director_phone_number"
                    value={formData.director_phone_number || ""}
                    placeholder="Director Phone Number"
                    onChange={handleChange}
                />


                <button type="submit">{initialData.id ? "Update" : "Add"} Customer</button>
                <button type="button" onClick={closeForm}>Close</button>
            </form>
        </div>
    );
}
