import React from "react";
import "./Card.css";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Card({ data, type, openForm, deleteItem }) {
    return (
        <div className="card">
            {type === "user" && <div>
                <h3>#{data.email}</h3>
                <p><strong>Email:</strong> {data.email}</p>
                <p><strong>Role:</strong> {data.authentication}</p>
                {data.name && <p><strong>Phone:</strong> {data.name}</p>}
                {data.phone_number && <p><strong>Phone Number:</strong> {data.phone_number}</p>}
                {data.identification && <p><strong>ID:</strong> {data.identification}</p>}
                {data.customer_id && (
                    <p><strong>Customer Name:</strong> {data.customer.name}</p>
                )}
                <div className="card-actions">
                    <button className="edit-button" onClick={() => openForm(data)}><EditSquareIcon /></button>
                    <button className="delete-button" onClick={() => deleteItem(data.email)}><DeleteIcon /></button>
                </div>
            </div>}
            {type === "customer" && <div>
                <h3>#{data.id}</h3>
                <p><strong>Company Name:</strong> {data.name}</p>
                <p><strong>Floor:</strong> {data.floor}</p>
                <p><strong>Rented Area:</strong> {data.rented_area}</p>
                {data.contract_expired_time && <p><strong>Contract Expired Time:</strong> {data.contract_expired_time}</p>}
                {data.contact_person && <p><strong>Contact Person:</strong> {data.contact_person}</p>}
                {data.contact_number && <p><strong>Contact Number:</strong> {data.contact_number}</p>}
                {data.director_name && <p><strong>Director Name:</strong> {data.director_name}</p>}
                {data.director_phone_number && <p><strong>Director Phone Number:</strong> {data.director_phone_number}</p>}
                <div className="card-actions">
                    <button className="edit-button" onClick={() => openForm(data)}><EditSquareIcon /></button>
                    <button className="delete-button" onClick={() => deleteItem(data.id)}><DeleteIcon /></button>
                </div>
            </div>}

            {type === "order" && <div>
                <h3>#{data.id}</h3>
                <p><strong>Category: </strong> {data.category}</p>
                <p><strong>Order Date: </strong> {data.order_date}</p>
                <p><strong>Floor: </strong> {data.floor}</p>
                {data.observator && <p><strong>Observator: </strong> {data.observator}</p>}
                {data.observator_phone_number && <p><strong>Observator Phone Number: </strong> {data.observator_phone_number}</p>}
                {data.lift_required && <p><strong>Lift Required: </strong> {data.lift_required}</p>}
                {data.description && <p><strong>Description</strong> {data.description}</p>}
                {data.customer.name && <p><strong>Customer Name: </strong> {data.customer.name}</p>}
                <div className="card-actions">
                    <button className="edit-button" onClick={() => openForm(data)}><EditSquareIcon /></button>
                    <button className="delete-button" onClick={() => deleteItem(data.id)}><DeleteIcon /></button>
                </div>
            </div>}
                {type === "property" && <div>
                <h3>#{data.id}</h3>
                <p><strong>Name: </strong> {data.name}</p>
                <p><strong>Category: </strong> {data.category}</p>
                <p><strong>Description: </strong> {data.description}</p>
                {data.numbers && <p><strong>Numbers: </strong> {data.numbers}</p>}
                <div className="card-actions">
                    <button className="edit-button" onClick={() => openForm(data)}><EditSquareIcon /></button>
                    <button className="delete-button" onClick={() => deleteItem(data.id)}><DeleteIcon /></button>
                </div>
            </div>}

            {type === "complaint" && <div>
                <h3>#{data.id}</h3>
                <p><strong>Type: </strong> {data.types}</p>
                <p><strong>Category: </strong> {data.category}</p>
                {data.description && <p><strong>Description</strong> {data.description}</p>}
                <p><strong>User: </strong> {data.email}</p>
                <div className="card-actions">
                    <button className="edit-button" onClick={() => openForm(data)}><EditSquareIcon /></button>
                    <button className="delete-button" onClick={() => deleteItem(data.id)}><DeleteIcon /></button>
                </div>
            </div>}
            {type === "issue" && <div>
                <h3>#{data.id}</h3>
                <p><strong>Name: </strong> {data.name}</p>
                <p><strong>Category: </strong> {data.category}</p>
                {data.description && <p><strong>Description</strong> {data.description}</p>}
                {data.numbers && <p><strong>Numbers: </strong> {data.numbers}</p>}
                {data.customer.name && <p><strong>Customer Name: </strong> {data.customer.name}</p>}
                <div className="card-actions">
                    <button className="edit-button" onClick={() => openForm(data)}><EditSquareIcon /></button>
                    <button className="delete-button" onClick={() => deleteItem(data.id)}><DeleteIcon /></button>
                </div>
            </div>
                }

        </div>
    )
}