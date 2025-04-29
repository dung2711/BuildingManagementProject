import React, { useState, useEffect, useRef } from "react";
import { getProperties, createProperty, updateProperty, deleteProperty } from "../api/propertyApi";
import NavBar from "../components/NavBar/NavBar";
import Card from "../components/Card/Card";
import "./Page.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PropertyForm from "../components/Form/PropertyForm";
import FilterForm from "../components/FilterForm/FilterForm";
import FlashMessage from "../components/FlashMessage";

function PropertyPage() {
    const [addPropertyFormOpened, setAddPropertyFormOpened] = useState(false);
    const [updatePropertyFormOpened, setUpdatePropertyFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [properties, setProperties] = useState([]);
    const [flashMessage, setFlashMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const timeOutRef = useRef(null);

    const filterFields = [
        { name: "name", type: "text", placeholder: "Property Name" },
        { name: "category", type: "text", placeholder: "Category" },
    ];

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await getProperties();
                setProperties(res.data);
            } catch (error) {
                console.error("Failed to fetch properties", error);
            }
        };
        fetchProperties();
    }, []);

    const openAddPropertyForm = () => {
        setAddPropertyFormOpened(true);
    };

    const closeAddPropertyForm = () => {
        setAddPropertyFormOpened(false);
    };

    const openUpdatePropertyForm = (propertyData) => {
        setUpdatePropertyFormOpened(true);
        setInitialData(propertyData);
    };

    const closeUpdatePropertyForm = () => {
        setUpdatePropertyFormOpened(false);
    };

    const handleAddProperty = async (propertyData) => {
        try {
            await createProperty(propertyData);
            closeAddPropertyForm();
            const res = await getProperties();
            setProperties(res.data);
            renderFlashMessage("Property added successfully", "success");
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to add property", "error");
        }
    };

    const handleAddPropertyByFile = async (properties) => {
        try {
            for (const property of properties){
                try {
                    await createProperty({
                        name: property.Name,
                        category: property.Category,
                        description: property.Description,
                        numbers: property.Number,
                    })
                } catch (error) {
                    console.log("Error adding property: ", error.response?.data);
                    renderFlashMessage("Error adding properties", "error");
                }
            }
            const res = await getProperties();
            setProperties(res.data);
            closeAddPropertyForm();
            renderFlashMessage("Added properties successfully", "success");
        } catch (error) {
            console.log("Error adding property: ", error.response?.data);
            renderFlashMessage("Error adding properties", "error");
        }
    }

    const handleUpdateProperty = async (propertyData) => {
        try {
            await updateProperty(propertyData);
            closeUpdatePropertyForm();
            const res = await getProperties();
            setProperties(res.data);
            renderFlashMessage("Property updated successfully", "success");
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to update property", "error");
        }
    };

    const deleteOneProperty = async (propertyId) => {
        try {
            await deleteProperty(propertyId);
            const res = await getProperties();
            setProperties(res.data);
            renderFlashMessage("Property deleted successfully", "success");
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to delete property", "error");
        }
    };
    const filterProperties = async (filters) => {
        try {
            const res = await getProperties(filters);
            setProperties(res.data);
        } catch (error) {
            console.error("Failed to filter properties", error);
        }
    }

    const handleFlashMessageClose = () => {
        console.log("Flash message closed");
        setFlashMessage(false);
    };
    const renderFlashMessage = (msg, severity) => {
        console.log("Render flash message:");
        setMessage(msg);
        setSeverity(severity);
        setFlashMessage(true);
        if (timeOutRef.current) {
            clearTimeout(timeOutRef.current);
        }
        timeOutRef.current = setTimeout(() => {
            setFlashMessage(false);
        }, 3000);
    }
    return (
        <div>
            <NavBar />

            <FilterForm onFilter={filterProperties} fields={filterFields} />

            <div className="data-section">
                {properties.map((property) => (
                    <Card
                        data={property}
                        key={property.id}
                        type="property"
                        openForm={openUpdatePropertyForm}
                        deleteItem={deleteOneProperty}
                    />
                ))}
            </div>
            <button className="addIcon" onClick={openAddPropertyForm}>
                <AddCircleOutlineIcon />
            </button>
            {addPropertyFormOpened && <PropertyForm initialData={""} onSubmit={handleAddProperty} closeForm={closeAddPropertyForm} fileSubmit={handleAddPropertyByFile} />}
            {updatePropertyFormOpened && <PropertyForm initialData={initialData} onSubmit={handleUpdateProperty} closeForm={closeUpdatePropertyForm} />}
            {flashMessage && <FlashMessage message={message} severity={severity} closeMessage={handleFlashMessageClose} />}
        </div>
    );
}

export default PropertyPage;