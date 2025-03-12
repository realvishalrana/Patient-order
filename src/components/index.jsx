import React from "react";
import useMedicineOrder from "../hooks/useMedicineOrder";
import Dropdown from "./Dropdown";
import InputField from "./Input";
import OrdersList from "./OrderList";

const OrderIndex = () => {
  const props = useMedicineOrder();

  const { formik, handleAddMedicine, handleAddLabOrder } = props;

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-gray-800">
        Basic Details
      </h2>
      <div className="space-y-4 bg-white p-3">
        <InputField
          formik={formik}
          label="Patient Name"
          inputName="patientName"
          isError
          isRequired
          {...formik.getFieldProps("patientName")}
        />
        <InputField
          formik={formik}
          label="DOB"
          inputName="dob"
          type="date"
          isError
          isRequired
          {...formik.getFieldProps("dob")}
        />
        <Dropdown
          label="Gender"
          formik={formik}
          value={formik.values.gender}
          inputName="gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          isError
          isRequired
          onChange={(e) =>
            formik.setFieldValue("gender", {
              label: e.target.value,
              value: e.target.value,
            })
          }
        />
      </div>

      <div className="mt-6 md:mt-8">
        <div className="flex  md:flex-row justify-between items-start md:items-center w-full mb-4 md:mb-6 bg-white p-2 md:p-4 rounded-lg shadow-sm gap-2">
          <span className="text-lg md:text-2xl font-bold text-gray-800">
            Orders
          </span>
          <div className="flex  md:flex-row gap-2 w-full md:w-auto">
            <button
              onClick={handleAddMedicine}
              className="px-4 py-2 md:px-6 md:py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 text-sm md:text-base"
            >
              Add Medicine Order
            </button>
            <button
              onClick={handleAddLabOrder}
              className="px-4 py-2 md:px-6 md:py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 text-sm md:text-base"
            >
              Add Lab Order
            </button>
          </div>
        </div>

        <OrdersList {...props} />
      </div>

      <div className="flex justify-end md:flex-row gap-4 md:gap-6 mt-6 md:mt-8">
        <button
          onClick={() => {
            formik.resetForm({
              values: {
                ...formik.initialValues,
                medicineOptions: formik.values.medicineOptions,
                lapOptions: formik.values.lapOptions,
              },
            });
          }}
          className="px-4 py-2 md:px-8 md:py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 text-sm md:text-base"
        >
          Reset
        </button>
        <button
          type="submit"
          onClick={() => formik.handleSubmit()}
          className="px-4 py-2 md:px-8 md:py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 text-sm md:text-base"
        >
          Save Order
        </button>
      </div>
    </div>
  );
};

export default OrderIndex;
