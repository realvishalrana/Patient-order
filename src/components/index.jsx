import React from "react";
import useMedicineOrder from "../hooks/useMedicineOrder";
import Dropdown from "./Dropdown";
import InputField from "./Input";
import OrdersList from "./OrderList";

const OrderIndex = () => {
  const props = useMedicineOrder();

  const { formik, handleAddMedicine, handleAddLabOrder } = props;

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Basic Details
      </h2>
      <div className="space-y-4">
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

      <div className="mt-8">
        <div className="flex justify-between items-center w-full mb-6 bg-white p-4 rounded-lg shadow-sm">
          <span className="text-2xl font-bold text-gray-800">Orders</span>
          <div className="flex gap-x-4">
            <button
              onClick={handleAddMedicine}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Add Medicine Order
            </button>
            <button
              onClick={handleAddLabOrder}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Add Lab Order
            </button>
          </div>
        </div>

        <OrdersList {...props} />
      </div>

      <div className="flex justify-between">
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
          className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 w-full md:w-auto"
        >
          Reset
        </button>
        <button
          type="submit"
          onClick={() => formik.handleSubmit()}
          className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 w-full md:w-auto"
        >
          Save Order
        </button>
      </div>
    </div>
  );
};

export default OrderIndex;
