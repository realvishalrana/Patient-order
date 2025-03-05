import React from "react";
import { getError } from "../utils/helper";
import CancelIcon from "../icons/CancelIcon";

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
  isClear = true,
  ...other
}) => {
  return (
    <>
      <label htmlFor={id} className={labelClass}>
        {label} {isRequired && "*"}
      </label>
      {/* {isClear  && (
        <button
          onClick={() => {
            formik?.setFieldValue(inputName, null);
          }}
          className="absolute cursor-pointer right-3"
        >
          <CancelIcon />
        </button>
      )} */}
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
