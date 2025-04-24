import React from "react";
import "./GeneralCard.css";
import InputIcon from '@mui/icons-material/Input';


export default function GeneralCard({ data, type, openDetailCard }) {
    return (
        <div className="card">
            {type === "order" && <div>
                <h3>#{data.id}</h3>
                <p><strong>Category: </strong> {data.category}</p>
                <p><strong>Order Date: </strong> {data.order_date}</p>
                <p><strong>Floor: </strong> {data.floor}</p>
                {data.customer.name && <p><strong>Customer Name: </strong> {data.customer.name}</p>}
                <p><strong>Status: </strong> {data.status}</p>
                <div className="generalCard-actions">
                <button className="edit-button" onClick={() => openDetailCard(data)}><InputIcon /></button>
                </div>
            </div>}

            {type === "issue" && <div>
                <h3>#{data.id}</h3>
                <p><strong>Name: </strong> {data.name}</p>
                <p><strong>Category: </strong> {data.category}</p>
                <p><strong>Status: </strong> {data.status}</p>
                <div className="generalCard-actions">
                    <button className="edit-button" onClick={() => openDetailCard(data)}><InputIcon /></button>
                </div>
            </div>
                }

        </div>
    )
}