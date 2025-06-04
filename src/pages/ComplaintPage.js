import React, { useState, useEffect, useRef } from "react";
import { getComplaintFeedbacks, createComplaintFeedback, updateComplaintFeedback, deleteComplaintFeedback } from "../api/complaint_feedbackApi";
import NavBar from "../components/NavBar/NavBar";
import Card from "../components/Card/Card";
import "./Page.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ComplaintForm from "../components/Form/ComplaintForm";
import FilterForm from "../components/FilterForm/FilterForm";
import { useAuth } from "../contexts/AuthContext";
import FlashMessage from "../components/FlashMessage";

function ComplaintPage() {
    const [addComplaintFormOpened, setAddComplaintFormOpened] = useState(false);
    const [updateComplaintFormOpened, setUpdateComplaintFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [complaints, setComplaints] = useState([]);
    const [flashMessage, setFlashMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const {role} = useAuth()
    const timeOutRef = useRef(null);
    const email = localStorage.getItem("user");

    const filterFields = [
        {name: "types", type: "text", placeholder: "Types", },
        {name: "category", type: "text", placeholder: "Category", },
    ]
    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const res = await getComplaintFeedbacks();
                setComplaints(res.data);
            } catch (error) {
                console.error("Failed to fetch complaints", error);
            }
        };
        fetchComplaints();
    }, []);

    const openAddComplaintForm = () => {
        setAddComplaintFormOpened(true);
    };

    const closeAddComplaintForm = () => {
        setAddComplaintFormOpened(false);
    };

    const openUpdateComplaintForm = (complaintData) => {
        console.log("📤 Opening update complaint form with data:", complaintData);
        setUpdateComplaintFormOpened(true);
        setInitialData(complaintData);
    };

    const closeUpdateComplaintForm = () => {
        setUpdateComplaintFormOpened(false);
    };

    const handleAddComplaint = async (complaintData) => {
        try {
            console.log("📤 Adding complaint:", complaintData);
            await createComplaintFeedback(complaintData);
            const res = await getComplaintFeedbacks();
            setComplaints(res.data);
            renderFlashMessage("Complaint added successfully", "success");
            return true;
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to add complaint", "error");
            return false;
        }
    };

    const handleUpdateComplaint = async (complaintData) => {
        try {
            console.log("📤 Updating complaint:", complaintData);
            await updateComplaintFeedback(complaintData);
            const res = await getComplaintFeedbacks();
            setComplaints(res.data);
            renderFlashMessage("Complaint updated successfully", "success");
            return true;
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to update complaint", "error");
            return false;
        }
    };

    const deleteOneComplaint = async (complaintId) => {
        try {
            console.log("📤 Deleting complaint:", complaintId);
            await deleteComplaintFeedback(complaintId);
            const res = await getComplaintFeedbacks();
            setComplaints(res.data);
            renderFlashMessage("Complaint deleted successfully", "success");
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to delete complaint", "error");
        }
    };
    const filterComplaints = async (filter) => {
        try {
            const res = await getComplaintFeedbacks(filter);
            setComplaints(res.data);
        } catch (error) {
            console.error("Failed to fetch complaints", error);
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

            {role ==="manager" && <FilterForm onFilter={filterComplaints} fields={filterFields}/>}

            <div className="data-section">
                {complaints.map((complaint) => {
                    return (
                    <Card
                        data={{...complaint}}
                        key={complaint.id}
                        type="complaint"
                        openForm={openUpdateComplaintForm}
                        deleteItem={deleteOneComplaint}
                    />
                )})}
            </div>
            <button className="addIcon" onClick={openAddComplaintForm}>
                <AddCircleOutlineIcon />
            </button>
            {addComplaintFormOpened && <ComplaintForm initialData={""} onSubmit={handleAddComplaint} closeForm={closeAddComplaintForm} />}
            {updateComplaintFormOpened && <ComplaintForm initialData={initialData} onSubmit={handleUpdateComplaint} closeForm={closeUpdateComplaintForm} />}
            {flashMessage && <FlashMessage message={message} severity={severity} closeMessage={handleFlashMessageClose} />} 
        </div>
    );
}

export default ComplaintPage;