import React, { useState, useEffect } from "react";
import "./Form.css";
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { DatePicker } from "../DatePicker/DatePicker";
import TimeSlotSelector from "../TimeSlotSelector/TimeSlotSelector";
import dayjs from "dayjs";
import { getBookedSlotsByDate } from "../../api/orderApi";

const categories = [
    "Vận chuyển ra khỏi tòa nhà",
    "Vận chuyển vào tòa nhà",
    "Vận chuyển giữa các tầng",
];

export default function OrderForm({ initialData = {}, onSubmit, closeForm }) {
    const [formData, setFormData] = useState({
        order_date: "",
        time: "",
        category: "",
        observator: "",
        observator_phone_number: "",
        floor: "",
        lift_required: "Cần thang máy",
        description: "",
        customer_name: "" || initialData?.customer?.name || initialData?.customer_name,
    });
    const [bookedSlots, setBookedSlots] = useState([]);
    const [isClosing, setIsClosing] = useState(false);

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
    const handleDateChange = async (date) => {
        const formattedDate = dayjs(date).format("YYYY-MM-DD");
        setFormData(prev => ({
            ...prev,
            order_date: formattedDate,
        }));
        // Lấy các khung giờ đã đặt cho ngày này
        try {
            const response = await getBookedSlotsByDate(formattedDate);
            setBookedSlots(response.data || []);
            console.log("Booked slots for date:", formattedDate, response.data);
        } catch (error) {
            console.error("Failed to fetch booked slots:", error);
            setBookedSlots([]);
        }
    }
    const handleTimeChange = (slot) => {
        setFormData(prev => ({
            ...prev,
            time: slot
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const dataToSubmit = { ...formData };
        if (dataToSubmit.observator_phone_number === "" || dataToSubmit.observator_phone_number === null) {
            delete dataToSubmit.observator_phone_number;
        }
        if (dataToSubmit.observator === "" || dataToSubmit.observator === null) {
            delete dataToSubmit.observator;
        }
        if (dataToSubmit.customer_name === "" || dataToSubmit.customer_name === null) {
            delete dataToSubmit.customer_name;
        }
        console.log(dataToSubmit);
        const success = await onSubmit(dataToSubmit);
        if (success) {
            handleClose();
        }
    };

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            closeForm();
        }, 500);
    }

    return (
        <div className={`form-container ${isClosing ? "fade-out" : ""}`}>
            <div className="form">
                {initialData.id ? <h1>Sửa lịch vận chuyển</h1> : <h1>Đặt lịch vận chuyển</h1>}
                <form onSubmit={handleSubmit}>
                    <div className="date-picker mb-4">
                        <DatePicker
                            getSelectedDay={handleDateChange}
                            endDate={30}
                            color={'#1e94cb'}
                        />
                        <TimeSlotSelector
                            handleTimeChange={handleTimeChange}
                            selectedDate={formData.order_date}
                            bookedSlots={bookedSlots}
                        />
                    </div>
                    <div>
                            <label htmlFor="category"><strong>Dịch vụ</strong></label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="border p-2 rounded-lg"
                            >
                                <option value="" disabled hidden>-- Chọn loại dịch vụ --</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                    <div>

                        <div>
                            <label htmlFor="observator"><strong>Người liên hệ</strong></label>
                            <input
                                id="observator"
                                type="text"
                                name="observator"
                                value={formData.observator || ""}
                                placeholder="Observator"
                                onChange={handleChange}
                                className="form-input w-full border p-2 rounded-lg"
                            />
                        </div>

                        <div>
                            <label htmlFor="observator_phone_number"><strong>Số điện thoại liên hệ</strong></label>
                            <input
                                id="observator_phone_number"
                                type="text"
                                name="observator_phone_number"
                                value={formData.observator_phone_number || ""}
                                placeholder="Observator Phone Number"
                                onChange={handleChange}
                                className="form-input w-full border p-2 rounded-lg"
                            />
                        </div>

                        <div>
                            <label htmlFor="floor"><strong>Tầng</strong></label>
                            <input
                                id="floor"
                                type="text"
                                name="floor"
                                value={formData.floor || ""}
                                placeholder="Floor"
                                onChange={handleChange}
                                required
                                className="form-input w-full border p-2 rounded-lg"
                            />
                        </div>

                        <div>
                            <label htmlFor="lift_required"><strong>Thang máy</strong></label>
                            <select
                                id="lift_required"
                                name="lift_required"
                                value={formData.lift_required}
                                onChange={handleChange}
                                required
                                className="form-select w-full border p-2 rounded-lg"
                            >
                                <option value="Cần thang máy">Cần thang máy</option>
                                <option value="Không cần thang máy">Không cần thang máy</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="customer_name"><strong>Tên khách hàng</strong></label>
                            <input
                                id="customer_name"
                                type="text"
                                name="customer_name"
                                value={formData.customer_name || ""}
                                placeholder="Customer Name"
                                onChange={handleChange}
                                required
                                className="form-input w-full border p-2 rounded-lg"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="description"><strong>Mô tả</strong></label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description || ""}
                                placeholder="Description"
                                onChange={handleChange}
                                required
                                className="form-textarea w-full border p-2 rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                        <button type="submit" className="add-button">
                            {initialData.id ? "Update" : "Add"} Order
                        </button>
                        <button type="button" className="closeForm-button" onClick={handleClose}>
                            <ArrowBackOutlinedIcon />
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}