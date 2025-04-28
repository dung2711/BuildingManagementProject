import React, { useEffect, useState } from "react";
import "./DetailCard.css";
import { updateOrder } from "../../api/orderApi";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateIssue } from "../../api/issueApi";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

export default function DetailCard({ data, type, openForm, closeForm, deleteItem, role, renderFlashMessage }) {
    const [status, setStatus] = useState("");
    useEffect(() => {
        if (data.status) {
            setStatus(data.status);
        }
    }, [data.status]);

    const changeOrderStatus = async (newStatus) => {
        setStatus(newStatus);
        try {
            await updateOrder({ id: data.id, status: newStatus });
        } catch (error) {
            console.error("Failed to update order status", error);
        }
    }
    const changeIssueStatus = async (newStatus) => {
        setStatus(newStatus);
        try {
            await updateIssue({ id: data.id, status: newStatus });
        } catch (error) {
            console.error("Failed to update issue status", error);
        }
    }
    return (
        <div className="detailCard-container">
            {type === "order" && <div className="detailCard">
                <h1>Chi tiết lịch hẹn</h1>
                <h2>#{data.id}</h2>
                <h2 >Thông Tin: </h2>
                <div className="info-section">
                    <p><strong>Category: </strong> {data.category}</p>
                    <p><strong>Order Date: </strong> {data.order_date}</p>
                    <p><strong>Floor: </strong> {data.floor}</p>
                    {data.observator && <p><strong>Observator: </strong> {data.observator}</p>}
                    {data.observator_phone_number && <p><strong>Observator Phone Number: </strong> {data.observator_phone_number}</p>}
                    {data.lift_required && <p><strong>Lift Required: </strong> {data.lift_required}</p>}
                    {data.customer.name && <p><strong>Customer Name: </strong> {data.customer.name}</p>}
                    <p><strong>Status: </strong> {status}</p>
                </div>
                <h2>Mô tả: </h2>
                {data.description && <textarea
                    value={data.description} // ví dụ: description = "1"
                    readOnly
                    className="readonly-textarea"
                />}
                <div className="detailCard-actions">
                    <div className="left-action">
                        {role === "manager" && data.status !== "Đã hủy" && <button id="accept-button" onClick={() => {
                            changeOrderStatus("Chấp nhận")
                            renderFlashMessage("Chấp nhận thành công", "success")
                        }
                        }>Accept</button>}
                        {role === "manager" && data.status !== "Đã hủy" && <button id="deny-button" onClick={() => {
                            changeOrderStatus("Từ chối")
                            renderFlashMessage("Từ chối thành công", "success")
                        }}
                        >Deny</button>}
                        {role === "customer" && <button id="cancel-button" onClick={() => {
                            changeOrderStatus("Đã hủy");
                            renderFlashMessage("Hủy thành công", "success")
                        }}>Cancel</button>}
                    </div>
                    <div className="right-action">
                        <button className="edit-button" onClick={() => openForm(data)}><EditSquareIcon /></button>
                        {role === "manager" && <button className="delete-button" onClick={() => deleteItem(data.id)}><DeleteIcon /></button>}
                    </div>
                    <button className="close-button" onClick={closeForm}><ArrowBackOutlinedIcon /></button>

                </div>
            </div>}

            {type === "issue" && <div className="detailCard">
                <h1>Chi tiết sửa chữa</h1>
                <h2>#{data.id}</h2>
                <h2 >Thông Tin: </h2>
                <div className="info-section">
                    <p><strong>Name: </strong> {data.name}</p>
                    <p><strong>Category: </strong> {data.category}</p>
                    {data.customer.name && <p><strong>Customer Name: </strong> {data.customer.name}</p>}
                    <p><strong>Status: </strong> {status}</p>
                </div>
                <h2>Mô tả: </h2>
                {data.description && <textarea
                    value={data.description} // ví dụ: description = "1"
                    readOnly
                    className="readonly-textarea"
                />}
                <div className="detailCard-actions">
                    <div className="left-action">
                        {role === "manager" && data.status !== "Đã hủy" && <button id="accept-button" onClick={() => {
                            changeIssueStatus("Chấp nhận");
                            renderFlashMessage("Chấp nhận thành công", "success")
                        }}>Accept</button>}
                        {role === "manager" && data.status !== "Đã hủy" && <button id="deny-button" onClick={() => {
                            changeIssueStatus("Từ chối");
                            renderFlashMessage("Từ chối thành công", "success")
                        }}>Deny</button>}
                        {role === "customer" && <button id="cancel-button" onClick={() => {
                            changeIssueStatus("Đã hủy");
                            renderFlashMessage("Hủy thành công", "success")
                        }}>Cancel</button>}
                    </div>
                    <div className="right-action">
                        <button className="edit-button" onClick={() => openForm(data)}><EditSquareIcon /></button>
                        {role === "manager" && <button className="delete-button" onClick={() => deleteItem(data.id)}><DeleteIcon /></button>}
                    </div>
                    <button className="close-button" onClick={closeForm}><ArrowBackOutlinedIcon /></button>

                </div>
            </div>}
        </div>
    )
}