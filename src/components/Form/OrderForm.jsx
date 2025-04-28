import React, { useState, useEffect } from "react";
import "./Form.css";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import DatePicker from "react-horizontal-datepicker";
import dayjs from "dayjs";

const categories = [
    "Vận chuyển ra khỏi tòa nhà",
    "Vận chuyển vào tòa nhà",
    "Vận chuyển giữa các tầng",
];

export default function OrderForm({ initialData = {}, onSubmit, closeForm }) {
    const [formData, setFormData] = useState({
        order_date: "",
        category: "",
        observator: "",
        observator_phone_number: "",
        floor: "",
        lift_required: "Cần thang máy",
        description: "",
        customer_name: "" || initialData?.customer?.name || initialData?.customer_name,
    });

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
    const handleDateChange = (date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        setFormData(prev => ({
            ...prev,
            order_date: formattedDate,
        }));
        console.log(formData.order_date);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form data:", formData.order_date);
        const dataToSubmit = { ...formData };
        if(dataToSubmit.observator_phone_number === "" || dataToSubmit.observator_phone_number === null) {
            delete dataToSubmit.observator_phone_number;
        }
        if(dataToSubmit.observator === "" || dataToSubmit.observator === null) {
            delete dataToSubmit.observator;
        }
        if(dataToSubmit.customer_name === "" || dataToSubmit.customer_name === null) {
            delete dataToSubmit.customer_name;
        }
        onSubmit(dataToSubmit);
    };

    return (
        <div className="form-container">
            <div className="form">
            {initialData.id ? <h1>Sửa lịch vận chuyển</h1> : <h1>Đặt lịch vận chuyển</h1>}
            <form onSubmit={handleSubmit}>
                <DatePicker 
                getSelectedDay={handleDateChange}
                endDate={30}
                color={'#1e94cb'}
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled hidden>-- Chọn loại dịch vụ --</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                    
                </select>
                <input
                    type="text"
                    name="observator"
                    value={formData.observator ? formData.observator : ""}
                    placeholder="Observator"
                    onChange={handleChange}
                />
                <input
                    type="phone"
                    name="observator_phone_number"
                    value={formData.observator_phone_number || ""}
                    placeholder="Observator Phone Number"
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="floor"
                    value={formData.floor || ""}
                    placeholder="Floor"
                    onChange={handleChange}
                    required
                />
                <select
                    name="lift_required"
                    value={formData.lift_required}
                    onChange={handleChange}
                    required
                >
                    <option value="Cần thang máy">Cần thang máy</option>
                    <option value="Không cần thang máy">Không cần thang máy</option>

                </select>

                <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name || ""}
                    placeholder="Customer Name"
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="description"
                    value={formData.description || ""}
                    placeholder="Description"
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="add-button">{initialData.id ? "Update" : "Add"} Order</button>
                <button type="button" className="closeForm-button" onClick={closeForm}><ArrowBackOutlinedIcon /></button>
            </form>
            </div>
        </div>
    );
}