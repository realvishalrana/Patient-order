import React from "react";
import { getErrors } from "../utils/helper";

const TextArea = ({
  id,
  label,
  inputName,
  className = "",
  inputValue,
  rows = 4,
  regex = null,
  formik = null,
  objKey = false,
  isError = false,
  disabled = false,
  labelClass = "text-sm font-[400] text-black block mb-1",
  isRequired = false,
  containerClass = "",
  placeholder,
  ...other
}) => {
  const errors = isError && getErrors({ formik, objKey, inputName });

  return (
    <div className={`w-full text-left ${containerClass}`}>
      <label htmlFor={id} className={labelClass}>
        {label} {isRequired && "*"}
      </label>

      <div className="relative group overflow-auto">
        <textarea
          id={id}
          rows={rows}
          name={inputName}
          value={inputValue}
          disabled={disabled}
          placeholder={placeholder || `Enter ${label}`}
          className={`text-black form-input px-3 py-3 rounded-lg w-full border focus:outline-none transition flex text-sm ${
            errors
              ? "border-red bg-rose-50"
              : "focus:border-2 focus:border-primary"
          } ${className}`}
          {...(formik ? formik?.getFieldProps(id) : {})}
          {...other}
        />
      </div>

      {isError && formik ? (
        <p className="text-xs text-red">
          {getErrors({ formik, objKey, inputName })}
        </p>
      ) : null}
    </div>
  );
};

export default TextArea;
