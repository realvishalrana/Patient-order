import React from "react";
import useMedicineOrder from "../hooks/useMedicineOrder";
import usePatientOrders from "../hooks/usePatientOrders";
import Dropdown from "./Dropdown";
import InputField from "./Input";

const OrderIndex = () => {
  const { formik } = usePatientOrders();
  const {
    handleAddMedicine,
    handleMedicineChange,
    handleStrengthChange,
    handleQuantityChange,
    handlePriceChange,
    formik: medicineFormik,
  } = useMedicineOrder();
  
  return (
    <div className="container mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
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
            { label: "Select Gender", value: "" },
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          isError
          isRequired
          onChange={(e) => formik.setFieldValue("gender", e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </form>

      <div className="mt-6">
        <button
          onClick={handleAddMedicine}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mb-4"
        >
          Add Medicine Order
        </button>
        <div className="grid gap-4">
          {medicineFormik.values?.medicineOrders?.length > 0 &&medicineFormik.values?.medicineOrders?.map((order, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow-md space-y-2"
            >
              <Dropdown
                label="Medicine"
                formik={formik}
                inputName={`medicineOrders[${index}].selectedMedicine`}
                options={medicineFormik.values.medicineOptions}
                value={order.selectedMedicine}
                onChange={(e) => handleMedicineChange(e, index)}
              />
              <Dropdown
                formik={formik}
                inputName={`medicineOrders[${index}].selectedStrength`}
                label="Strength"
                options={medicineFormik.values.strengthOptions}
                value={order.selectedStrength}
                onChange={(e) => handleStrengthChange(e, index)}
              />
              <InputField
                label="Price"
                formik={medicineFormik}
                value={order.price}
                onChange={(e) => handlePriceChange(e, index)}
              />
              <InputField
                label="Qty"
                formik={medicineFormik}
                value={order.qty}
                onChange={(e) => handleQuantityChange(e, index)}
              />
              <InputField
                label="Total"
                formik={medicineFormik}
                value={order.total}
                disabled
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        onClick={() => medicineFormik.handleSubmit()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save Orders
      </button>
    </div>
  );
};

export default OrderIndex;
