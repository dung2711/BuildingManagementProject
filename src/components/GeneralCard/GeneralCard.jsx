import React from "react";
import "./GeneralCard.css";
import InputIcon from '@mui/icons-material/Input';


export default function GeneralCard({ data, type, openDetailCard }) {
    return (
        <div className="generalCard">
            {type === "order" && <div>
                <h3>#{data.id}</h3>
                <div className="top-section">
                    <p><strong>Category: </strong> {data.category}</p>
                    <p><strong>Order Date: </strong> {data.order_date}</p>
                    {data.customer.name && <p><strong>Customer Name: </strong> {data.customer.name}</p>}
                </div>
                <div className="bottom-section" onClick={() => openDetailCard(data)}>
                    {data.status==="Chấp nhận" && <p>🟩{data.status}</p>}
                    {data.status==="Đã hủy" && <p>⬜{data.status}</p>}
                    {data.status==="Từ chối" && <p>🟥{data.status}</p>}
                    {data.status==="Đang xử lý" && <p>🟦{data.status}</p>}

                    <div className="generalCard-actions">
                        <button className="edit-button"><InputIcon /></button>
                    </div>
                </div>
            </div>}

            {type === "issue" && <div>
                <h3>#{data.id}</h3>
                <div className="top-section">
                <p><strong>Type: </strong> {data.name}</p>
                {data.customer.name && <p><strong>Customer Name: </strong> {data.customer.name}</p>}
                </div>
                <div className="bottom-section" onClick={() => openDetailCard(data)}>
                {data.status==="Chấp nhận" && <p>🟩{data.status}</p>}
                    {data.status==="Đã hủy" && <p>🟥{data.status}</p>}
                    {data.status==="Từ chối" && <p>🟥{data.status}</p>}
                    {data.status==="Đang xử lý" && <p>🟦{data.status}</p>}
                <div className="generalCard-actions" > 
                    <button className="edit-button"><InputIcon /></button>
                </div>
                </div>
            </div>
            }

        </div>
    )
}