import React, { useState, useEffect } from "react";
import "./Form.css"
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import * as XLSX from 'xlsx';

export default function UserForm({ initialData = {}, onSubmit, closeForm, fileSubmit }) {
    const [fileData, setFileData] = useState([]);
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
            if (dataToSubmit.contact_person === "") {
                delete dataToSubmit.contact_person;
            }
            if (dataToSubmit.contact_number === "") {
                delete dataToSubmit.contact_number;
            }
            if (dataToSubmit.director_name === "" || (!dataToSubmit.director_name)) {
                delete dataToSubmit.director_name;
            }
            if (dataToSubmit.director_phone_number === "" || (!dataToSubmit.director_phone_number)) {
                delete dataToSubmit.director_phone_number;
            }

            success = onSubmit(dataToSubmit);
        }
        if (success) {
            handleClose();
        }
    };
    async function handleFileAsync(e) {
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
    };


    return (
        <div className={`form-container ${isClosing ? "fade-out" : ""}`}>
            <form onSubmit={handleSubmit} className="form">
                {initialData.id ? <h1>Edit Customer</h1> : <h1>Add Customer</h1>}
                <label htmlFor="name"><strong>Name</strong></label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name ? formData.name : ""}
                    placeholder="Name"
                    onChange={handleChange}
                    required={fileData ? 0 : 1}

                />
                <label htmlFor="floor"><strong>Floor</strong></label>
                <input
                    id="floor"
                    type="text"
                    name="floor"
                    value={formData.floor || ""}
                    placeholder="Floor"
                    onChange={handleChange}
                    required={fileData ? 0 : 1}
                />
                <label htmlFor="rented_area"><strong>Rented Area</strong></label>
                <input
                    id="rented_area"
                    type="text"
                    name="rented_area"
                    value={formData.rented_area || ""}
                    placeholder="Rented Area"
                    onChange={handleChange}
                    required={fileData ? 0 : 1}
                />

                <label htmlFor="contract_expired_time"><strong>Contract Expired Time</strong></label>
                <input
                    type="date"
                    name="contract_expired_time"
                    value={formData.contract_expired_time || ""}
                    placeholder="Contract Expired Time"
                    onChange={handleChange}
                    required={fileData ? 0 : 1}
                />
                <label htmlFor="contact_person"><strong>Contact Person</strong></label>
                <input
                    id="contact_person"
                    type="text"
                    name="contact_person"
                    value={formData.contact_person ? formData.contact_person : ""}
                    placeholder="Contact Person"
                    onChange={handleChange}
                />
                <label htmlFor="contact_number"><strong>Contact Number</strong></label>
                <input
                    id="contact_number"
                    type="phone"
                    name="contact_number"
                    value={formData.contact_number || ""}
                    placeholder="Contact Number"
                    onChange={handleChange}
                />
                <label htmlFor="director_name"><strong>Director Name</strong></label>
                <input
                    id="director_name"
                    type="text"
                    name="director_name"
                    value={formData.director_name || ""}
                    placeholder="Director Name"
                    onChange={handleChange}
                />
                <label htmlFor="director_phone_number"><strong>Director Phone Number</strong></label>
                <input
                    id="director_phone_number"
                    type="phone"
                    name="director_phone_number"
                    value={formData.director_phone_number || ""}
                    placeholder="Director Phone Number"
                    onChange={handleChange}
                />
                {!initialData.id &&
                    <>
                        <label htmlFor="input_dom_element"><strong>Insert Customer File Here</strong></label>
                        <input type="file" accept=".xlsx" id="input_dom_element" onChange={handleFileAsync} />
                    </>
                }


                <button type="submit" className="add-button">{initialData.id ? "Update" : "Add"} Customer</button>
                <button type="button" className="closeForm-button" onClick={handleClose}><ArrowBackOutlinedIcon /></button>
            </form>
        </div>
    );
}