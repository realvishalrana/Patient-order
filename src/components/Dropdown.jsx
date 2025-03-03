import React from "react";
import { getError } from "../utils/helper";

const Dropdown = ({
  isRequierd = false,
  className = "control-select",
  label,
  value,
  options = [],
  onChange,
  formik,
  inputName,
  isError,
}) => {
  return (
    <>
      <label>
        {label} {isRequierd && "*"}
      </label>
      <select className={className} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {isError && formik ? (
        <div style={{ color: "red" }}>{getError({ formik, inputName })}</div>
      ) : null}
    </>
  );
};
export default Dropdown;
