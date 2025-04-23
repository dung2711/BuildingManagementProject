import React, { useState, useEffect } from "react";
import { getIssues, createIssue, updateIssue, deleteIssue } from "../../api/issueApi";
import { getCustomers } from "../../api/customerApi";
import NavBar from "../../components/NavBar/NavBar";
import Card from "../../components/Card/Card";
import "./IssuePage.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IssueForm from "../../components/IssueForm/IssueForm";
import { useAuth } from "../../contexts/AuthContext";
import FilterForm from "../../components/FilterForm/FilterForm";

function IssuePage() {
    const [addIssueFormOpened, setAddIssueFormOpened] = useState(false);
    const [updateIssueFormOpened, setUpdateIssueFormOpened] = useState(false);
    const [initialData, setInitialData] = useState({});
    const [issues, setIssues] = useState([]);
    const [customers, setCustomers] = useState([]);
    const {role} = useAuth();
    const filterFields = [
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

    const handleAddIssue = async (issueData) => {
        try {
            console.log("📤 Adding issue:", issueData);
            await createIssue(issueData);
            closeAddIssueForm();
            const res = await getIssues();
            setIssues(res.data);
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    };

    const handleUpdateIssue = async (issueData) => {
        try {
            console.log("📤 Updating issue:", issueData);
            await updateIssue(issueData);
            closeUpdateIssueForm();
            const res = await getIssues();
            setIssues(res.data);
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
        }
    };

    const deleteOneIssue = async (issueId) => {
        try {
            console.log("📤 Deleting issue:", issueId);
            await deleteIssue(issueId);
            const res = await getIssues();
            setIssues(res.data);
        } catch (error) {
            console.log("❌ Error response:", error.response?.data);
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
    return (
        <div>
            <NavBar />

            <FilterForm onFilter={filterIssues} fields={filterFields}/>

            <div id="issue-section">
                {issues.map((issue) => {
                    const customer = customers.find((customer) => customer.id === issue.customer_id);
                    return (
                    <Card
                        data={{...issue, customer}}
                        key={issue.id}
                        type="issue"
                        openForm={openUpdateIssueForm}
                        deleteItem={deleteOneIssue}
                    />
                )})}
            </div>
            <button id="addIcon" onClick={openAddIssueForm}>
                <AddCircleOutlineIcon />
            </button>
            {addIssueFormOpened && <IssueForm initialData={""} onSubmit={handleAddIssue} closeForm={closeAddIssueForm} role={role} />}
            {updateIssueFormOpened && <IssueForm initialData={initialData} onSubmit={handleUpdateIssue} closeForm={closeUpdateIssueForm} role={role} />}
        </div>
    );
}

export default IssuePage;