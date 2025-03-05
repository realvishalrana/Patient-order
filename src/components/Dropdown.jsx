import React from "react";
import { getError } from "../utils/helper";
import CancelIcon from "../icons/CancelIcon";

const Dropdown = ({
  isRequired = false,
  // className = "border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
  label,
  value,
  options = [],
  onChange,
  formik,
  inputName,
  isError,
}) => {
  const handleClear = (formik, keyName) => {
    if (!formik || !keyName.includes("[")) {
      formik.setFieldValue(keyName, "");
      return;
    }
  
    const pathParts = keyName
      .replace(/\[(\d+)\]/g, ".$1") // Convert `array[index]` to `.index`
      .split(".");
  
    const fieldName = pathParts.pop(); // Last key (e.g., 'selectedMedicine')
  
    let parentObject = formik.values;
    for (const part of pathParts) {
      parentObject = parentObject?.[part];
    }
  
    if (parentObject && fieldName) {
      parentObject[fieldName] = ""; // Clear the field
      formik.setValues({ ...formik.values }); // Trigger state update
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
          value={value}
          onChange={onChange}
        >
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
            onClick={() => handleClear(formik, inputName)}
            >
            <CancelIcon size={16} />
          </button>
        )}
      </div>
      {isError && formik ? (
        <div className="text-red-500 text-sm mt-1">
          {getError({ formik, inputName })}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
