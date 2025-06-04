import React, { useState } from "react";
import "./FilterForm.css";

export default function FilterForm({ fields = [], onFilter, initialValues = {} }) {
    const [filters, setFilters] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter(filters);
    };

    const handleReset = () => {
        const resetValues = {};
        fields.forEach(field => resetValues[field.name] = "");
        setFilters(resetValues);
        onFilter({});
    };

    return (
        <form onSubmit={handleSubmit} 
        className="filter-form  font-[Calibri]">
            <div className="filter-fields">
                {fields.map(field => (
                    <div key={field.name} className="filter-field">
                        {field.placeholder && <label className="text-sm font-semibold mb-1 text-gray-700" htmlFor={field.name}>{field.placeholder}</label>}
                        {field.type === "select" ? (
                            <select
                                name={field.name}
                                value={filters[field.name] || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">{field.placeholder || "Select"}</option>
                                {field.options?.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                        <div>  
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={filters[field.name] || ""}
                                onChange={handleChange}
                                className=" border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-[240px]"
                            />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="filter-buttons">
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">Filter</button>
                <button type="button" onClick={handleReset} className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition">Reset</button>
            </div>
        </form>
    );
}
