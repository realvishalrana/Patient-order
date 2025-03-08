import React from "react";
import { getErrors } from "../utils/helper";

const InputField = ({
  id,
  label,
  inputName,
  inputClassName = "control-input",
  inputValue,
  formik = null,
  type = "text",
  isError = false,
  disabled = false,
  labelClass,
  placeholder,
  isRequired = false,
  isClear = true,
  objKey = false,
  dynamicError = false,
  index = false,
  ...other
}) => {
  return (
    <div className="relative w-full ">
      <label
        htmlFor={id}
        className={`block text-sm font-medium text-gray-700 ${labelClass}`}
      >
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
        <div className="text-red-500 text-sm mt-1">
          {getErrors({ formik, objKey, inputName, index, dynamicError })}
        </div>
      ) : null}
    </div>
  );
};

export default InputField;
