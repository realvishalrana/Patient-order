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
  onChange = () => {},
  handleClearData = () => {},
  disabled = false,
  isMultiple = false,
}) => {

  // Handle change for single select vs. multi-select
  const handleDropdownChange = (e) => {
    if (isMultiple) {
      const selectedValues = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      // Match the selected values with the original option objects
      const selectedObjects = options.filter((opt) =>
        selectedValues.includes(opt.value)
      );
      onChange({ target: { value: selectedObjects } });
    } else {
      onChange(e);
    }
  };

  // Clear the dropdown value (sets to [] for multi-select or null for single)
  const handleClear = () => {
    if (dynamicError && objKey && index !== false) {
      const fieldPath = `${objKey}[${index}].${inputName}`;
      formik.setFieldValue(fieldPath, isMultiple ? [] : null);
    } else {
      formik.setFieldValue(inputName, isMultiple ? [] : null);
    }
    handleClearData({ objKey, index, inputName });
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium text-gray-700">
        {label} {isRequired && "*"}
      </label>
      <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-2 w-full focus-within:ring-2 focus-within:ring-blue-500">
        <select
          className="flex-1 bg-transparent focus:outline-none"
          multiple={isMultiple}
          disabled={disabled}
          value={
            isMultiple
              ? value
                ? value.map((item) => item.value)
                : []
              : value
              ? value.value
              : ""
          }
          onChange={handleDropdownChange}
        >
          {/* For single select, include a placeholder option */}
          {!isMultiple && <option value="">Select...</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Only show clear button when not disabled */}
        {!disabled && value && (
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
