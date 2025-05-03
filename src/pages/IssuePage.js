import React, { useState, useEffect, useRef } from "react";
import { getIssues, createIssue, updateIssue, deleteIssue } from "../api/issueApi";
import { getCustomers } from "../api/customerApi";
import NavBar from "../components/NavBar/NavBar";
import "./Page.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IssueForm from "../components/Form/IssueForm";
import { useAuth } from "../contexts/AuthContext";
import FilterForm from "../components/FilterForm/FilterForm";
import GeneralCard from "../components/GeneralCard/GeneralCard";
import DetailCard from "../components/DetailCard/DetailCard";
import FlashMessage from "../components/FlashMessage";

function IssuePage() {
    const [addIssueFormOpened, setAddIssueFormOpened] = useState(false);
    const [updateIssueFormOpened, setUpdateIssueFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [issues, setIssues] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [openDetail, setOpenDetail] = useState(false);
    const [currentIssue, setCurrentIssue] = useState({});
    const [flashMessage, setFlashMessage] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const {role} = useAuth();
    const timeOutRef = useRef(null);

    const filterFields = 
    [   {name: "status", type: "select", placeholder: "Status", options: [
        { value: "Đang xử lý", label: "Đang xử lý" },
        { value: "Đã hủy", label: "Đã hủy" },
        { value: "Chấp nhận", label: "Chấp nhận" },
        { value: "Từ chối", label: "Từ chối" }
    ]},
        { name: "name", type: "text", placeholder: "Issue Name" },
        { name: "category", type: "text", placeholder: "Category" },
        { name: "customer_name", type: "text", placeholder: "Customer Name" }
    ];
    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const customerRes = await getCustomers();
                setCustomers(customerRes.data);
                const res = await getIssues();
                setIssues(res.data);
            } catch (error) {
                console.log(error.response?.data)
            }
        };
        fetchIssues();
    }, []);

    const openAddIssueForm = () => {
        setAddIssueFormOpened(true);
    };

    const closeAddIssueForm = () => {
        setAddIssueFormOpened(false);
    };

    const openUpdateIssueForm = (issueData) => {
        console.log("📤 Opening update issue form with data:", issueData);
        setUpdateIssueFormOpened(true);
        setInitialData(issueData);
    };

    const closeUpdateIssueForm = () => {
        setUpdateIssueFormOpened(false);
    };

    const openDetailCard = (issueData) => {
        setOpenDetail(true);
        setCurrentIssue(issueData);
    };

    const closeDetailCard = async () => {
        setOpenDetail(false);
        const res = await getIssues();
        setIssues(res.data);
        setCurrentIssue({});
    };
    const handleAddIssue = async (issueData) => {
        try {
            console.log("📤 Adding issue:", issueData);
            await createIssue(issueData);
            closeAddIssueForm();
            const res = await getIssues();
            setIssues(res.data);
            renderFlashMessage("Issue added successfully", "success");
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to add issue", "error");
        }
    };

    const handleUpdateIssue = async (issueData) => {
        try {
            console.log("📤 Updating issue:", issueData);
            await updateIssue(issueData);
            closeUpdateIssueForm();
            const res = await getIssues();
            setIssues(res.data);
            if (openDetail) {
                const updateIssue = res.data.find(i => i.id === issueData.id);
                const customer = customers.find(c => c.id === updateIssue.customer_id);
                setCurrentIssue({ ...updateIssue, customer });
                renderFlashMessage("Issue updated successfully", "success");
            }
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to update issue", "error");
        }
    };

    const deleteOneIssue = async (issueId) => {
        try {
            console.log("📤 Deleting issue:", issueId);
            await deleteIssue(issueId);
            setOpenDetail(false);
            setCurrentIssue({});
            const res = await getIssues();
            setIssues(res.data);
            renderFlashMessage("Issue deleted successfully", "success");
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
            renderFlashMessage("Failed to delete issue", "error");
        }
    };
    const filterIssues = async (filter) => {
        try {
            const res = await getIssues(filter);
            setIssues(res.data);
        } catch (error) {
            console.error("Failed to fetch issues", error);
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

            {role ==="manager" && <FilterForm onFilter={filterIssues} fields={filterFields}/>}

            <div className="data-section">
                {issues.map((issue) => {
                    const customer = customers.find((customer) => customer.id === issue.customer_id);
                    return (
                    <GeneralCard
                        data={{...issue, customer}}
                        key={issue.id}
                        type="issue"
                        openDetailCard={openDetailCard}
                    />
                )})}
            </div>
            <button className="addIcon" onClick={openAddIssueForm}>
                <AddCircleOutlineIcon />
            </button>
            {openDetail && <DetailCard 
            data={currentIssue} 
            type="issue" 
            closeForm={closeDetailCard} 
            openForm={openUpdateIssueForm} 
            deleteItem={deleteOneIssue} 
            role={role}
            renderFlashMessage={renderFlashMessage}
            />}
            {addIssueFormOpened && <IssueForm onSubmit={handleAddIssue} closeForm={closeAddIssueForm} role={role} />}
            {updateIssueFormOpened && <IssueForm initialData={initialData} onSubmit={handleUpdateIssue} closeForm={closeUpdateIssueForm} role={role} />}
            {flashMessage && <FlashMessage message={message} severity={severity} closeMessage={handleFlashMessageClose} />}
        </div>
    );
}

export default IssuePage;