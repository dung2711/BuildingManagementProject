import { useState, useEffect } from 'react';
import "./TimeSlotSelector.css";

// Danh sách các khung giờ
const timeSlots = [
  "08:00-10:00", "10:00–12:00",
  "14:00–16:00", "16:00–18:00",
  "18:00–20:00", "20:00–21:00"
];

export default function TimeSlotSelector({ handleTimeChange, selectedDate, bookedSlots = [] }) {
  const [selectedSlot, setSelectedSlot] = useState("");

  const toggleSlot = (slot) => {
    setSelectedSlot(slot);
    handleTimeChange(slot);
  };

  // Kiểm tra slot có bị đặt không
  const isSlotBooked = (slot) => {
    return bookedSlots.some(
      (b) =>  b === slot
    );
  };

  // Reset khi ngày thay đổi
  useEffect(() => {
    setSelectedSlot("");  // Bỏ chọn khi chọn ngày khác
  }, [selectedDate]);

  return (
    <div className="timeSelector">
      {timeSlots.map(slot => {
        const disabled = isSlotBooked(slot);
        return (
          <button
            key={slot}
            onClick={(e) => {
              e.preventDefault();
              if (!disabled) toggleSlot(slot);
            }}
            className={slot === selectedSlot ? "selected" : ""}
            disabled={disabled}
            style={{
              backgroundColor: disabled ? "#ccc" : (slot === selectedSlot ? "#1e94cb" : "#f0f0f0"),
              color: disabled ? "#666" : (slot === selectedSlot ? "white" : "black"),
              margin: "5px",
              padding: "10px 15px", 
              borderRadius: "6px",
              border: "none",
              cursor: disabled ? "not-allowed" : "pointer"
            }}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
