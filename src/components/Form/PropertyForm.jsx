import React, { useState, useEffect } from "react";
import "./Form.css";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import * as XLSX from "xlsx"


export default function PropertyForm({ initialData = {}, onSubmit, closeForm, fileSubmit }) {
    const [fileData, setFileData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        numbers: "",
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
        let success;
        if (fileData.length > 0) {
            success = await fileSubmit(fileData);
        } else {
            const dataToSubmit = { ...formData };
            if (dataToSubmit.numbers === "" || dataToSubmit.numbers === null) {
                delete dataToSubmit.numbers;
            }
            success = await onSubmit(dataToSubmit);
        };
        if (success) {
            handleClose();
        }
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setFileData(jsonData);
    }

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeForm();
        }, 500);
    }

    return (
        <div className={`form-container ${isClosing ? "fade-out" : ""}`}>
            <form onSubmit={handleSubmit} className="form">
                {initialData.id ? <h1>Edit Property</h1> : <h1>Add Property</h1>}
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
                <label htmlFor="category"><strong>Category</strong></label>
                <input
                    id="category"
                    type="text"
                    name="category"
                    value={formData.category || ""}
                    placeholder="Category"
                    onChange={handleChange}
                    required={fileData ? 0 : 1}
                />
                <label htmlFor="numbers"><strong>Number</strong></label>
                <input
                    id="numbers"
                    type="number"
                    name="numbers"
                    value={formData.numbers || ""}
                    placeholder="Numbers"
                    onChange={handleChange}
                />
                <label htmlFor="description"><strong>Description</strong></label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description || ""}
                    placeholder="Description"
                    onChange={handleChange}
                    required={fileData ? 0 : 1}
                />
                {!initialData.id &&
                    <>
                        <label htmlFor="fileInput"><strong>Insert Property File Here</strong></label>
                        <input id="fileInput" type="file" accept=".xlsx" onChange={handleFileChange} />
                    </>
                }

                <button type="submit" className="add-button">{initialData.id ? "Update" : "Add"} Property</button>
                <button type="button" className="closeForm-button" onClick={handleClose}><ArrowBackOutlinedIcon /></button>
            </form>
        </div>
    );
}