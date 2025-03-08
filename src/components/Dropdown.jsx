import React from "react";
import { getErrors } from "../utils/helper";
import CancelIcon from "../icons/CancelIcon";

const Dropdown = ({
  label,
  value,
  formik,
  inputName,
  options = [],
  isRequired = false,
  isError = false,
  objKey = false,
  dynamicError = false,
  index = false,
  onChange = () => {}, // Default onChange function
}) => {
  // When a selection is made, store the full object (label and value)
  const handleDropdownChange = (e) => {
    onChange(e);
  };

  // Clear the dropdown value (set to null)
  const handleClear = () => {
    if (dynamicError && objKey && index !== false) {
      // Build the full path for nested fields
      const fieldPath = `${objKey}[${index}].${inputName}`;
      formik.setFieldValue(fieldPath, null);
    } else {
      formik.setFieldValue(inputName, null);
    }
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700">
        {label} {isRequired && "*"}
      </label>
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 w-full focus-within:ring-2 focus-within:ring-blue-500">
        <select
          className="flex-1 bg-transparent focus:outline-none"
          value={value ? value.value : ""} // if value exists, use its value property
          onChange={handleDropdownChange}
        >
          <option value="">Select...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {value && (
          <button
            type="button"
            className="text-gray-500 hover:text-red-500"
            onClick={handleClear}
          >
            <CancelIcon size={16} />
          </button>
        )}
      </div>
      {isError && formik ? (
        <div className="text-red-500 text-sm mt-1">
          {getErrors({ formik, objKey, inputName, index, dynamicError })}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
