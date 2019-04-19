import React from "react";

//: Options is an array of {value, (string)label and (booolen)selected}
//: onChange is a method with the paramitor event e.
const SelectForm = ({ label, options, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="exampleFormControlSelect1">{label}</label>
      <select
        onChange={onChange}
        id="exampleFormControlSelect1"
        className="form-control"
      >
        {options.map((g, i) => (
          <option key={i} selected={g.selected} value={g.value}>
            {g.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;
