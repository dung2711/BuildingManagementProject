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
        <form className="filter-form" onSubmit={handleSubmit}>
            <div className="filter-fields">
                {fields.map(field => (
                    <div key={field.name} className="filter-field">
                        {field.type === "select" ? (
                            <select
                                name={field.name}
                                value={filters[field.name] || ""}
                                onChange={handleChange}
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
                            {field.type === "date" && <div><label>{field.placeholder}</label><br /></div>}
                            
                            <input
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={filters[field.name] || ""}
                                onChange={handleChange}
                            />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="filter-buttons">
                <button type="submit">Filter</button>
                <button type="button" onClick={handleReset}>Reset</button>
            </div>
        </form>
    );
}
