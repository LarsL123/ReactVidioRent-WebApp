import React from "react";

const SelectForm = ({ label, options, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="exampleFormControlSelect1">{label}</label>
      <select
        onChange={onChange}
        id="exampleFormControlSelect1"
        className="form-control"
      >
        {options.map(g => (
          <option value={g._id}>{g.name}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectForm;
