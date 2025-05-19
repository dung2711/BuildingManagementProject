import { useState } from 'react';
import "./TimeSlotSelector.css";

const timeSlots = [
  "08:00-10:00", "10:00–12:00",
  "14:00–16:00", "16:00–18:00",
  "18:00–20:00", "20:00–21:00"
];

export default function TimeSlotSelector({handleTimeChange}) {
  const [selectedSlots, setSelectedSlots] = useState("");

  const toggleSlot = (slot) => {
    setSelectedSlots(slot);
    handleTimeChange(slot);
  };

  return (
    <div className="timeSelector">
      {timeSlots.map(slot => (
        <button
          key={slot}
          onClick={(e) => {
            e.preventDefault();
            toggleSlot(slot);
        }}
          className={slot===selectedSlots ? "selected" : ""}
        >
          {slot}
        </button>
      ))}
    </div>
  );
}
