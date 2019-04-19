import React from "react";

//: Options is an array of:
//:(id, whats returned when a label is selected)value, (string)label and (optional booolen)selected}

//: onChange is a method with the paramitor event e.
const SelectForm = ({ name, label, value, options, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        value={value}
        onChange={onChange}
        id={name}
        className="form-control"
        name={name}
      >
        <option>{""}</option>
        {options.map((option, index) => (
          <option key={index} selected={option.selected} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}></div>}
    </div>
  );
};

export default SelectForm;
