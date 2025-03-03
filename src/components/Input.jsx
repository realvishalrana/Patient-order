import React from "react";
import { getError } from "../utils/helper";

const InputField = ({
  id,
  label,
  inputName,
  inputClassName = "control-input",
  inputValue,
  formik = null,
  type = "text",
  objKey = false,
  isError = false,
  disabled = false,
  labelClass,
  placeholder,
  isRequired = false,
  ...other
}) => {
  return (
    <>
      <label htmlFor={id} className={labelClass}>
        {label} {isRequired && "*"}
      </label>

      <input
        id={id}
        type={type}
        name={inputName}
        value={inputValue}
        disabled={disabled}
        placeholder={placeholder ?? `Enter ${label}`}
        className={inputClassName}
        {...other}
      />

      {isError && formik ? (
        <div style={{ color: "red" }}>{getError({ formik, inputName })}</div>
      ) : null}
    </>
  );
};

export default InputField;
