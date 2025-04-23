import React, { useState, useEffect } from "react";
import { getProperties, createProperty, updateProperty, deleteProperty } from "../../api/propertyApi";
import NavBar from "../../components/NavBar/NavBar";
import Card from "../../components/Card/Card";
import "./PropertyPage.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PropertyForm from "../../components/PropertyForm/PropertyForm";
import FilterForm from "../../components/FilterForm/FilterForm";

function PropertyPage() {
    const [addPropertyFormOpened, setAddPropertyFormOpened] = useState(false);
    const [updatePropertyFormOpened, setUpdatePropertyFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [properties, setProperties] = useState([]);
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
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    };

    const handleUpdateProperty = async (propertyData) => {
        try {
            await updateProperty(propertyData);
            closeUpdatePropertyForm();
            const res = await getProperties();
            setProperties(res.data);
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    };

    const deleteOneProperty = async (propertyId) => {
        try {
            await deleteProperty(propertyId);
            const res = await getProperties();
            setProperties(res.data);
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
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

    return (
        <div>
            <NavBar />

            <FilterForm onFilter={filterProperties} fields={filterFields}/>

            <div id="property-section">
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
            <button id="addIcon" onClick={openAddPropertyForm}>
                <AddCircleOutlineIcon />
            </button>
            {addPropertyFormOpened && <PropertyForm initialData={""} onSubmit={handleAddProperty} closeForm={closeAddPropertyForm} />}
            {updatePropertyFormOpened && <PropertyForm initialData={initialData} onSubmit={handleUpdateProperty} closeForm={closeUpdatePropertyForm} />}
        </div>
    );
}

export default PropertyPage;