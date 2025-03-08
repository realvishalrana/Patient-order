import React from "react";
import useMedicineOrder from "../hooks/useMedicineOrder";
import Dropdown from "./Dropdown";
import InputField from "./Input";
import CancelfillIcon from "../icons/CancelIcon";

const OrderIndex = () => {
  const {
    handleAddMedicine,
    handleMedicineChange,
    handleStrengthChange,
    handleQuantityChange,
    handlePriceChange,
    formik: medicineFormik,
    handleDeleteMedicineOrder,
  } = useMedicineOrder();

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Basic Details
      </h2>
      <div className="space-y-4">
        <InputField
          formik={medicineFormik}
          label="Patient Name"
          inputName="patientName"
          isError
          isRequired
          {...medicineFormik.getFieldProps("patientName")}
        />
        <InputField
          formik={medicineFormik}
          label="DOB"
          inputName="dob"
          type="date"
          isError
          isRequired
          {...medicineFormik.getFieldProps("dob")}
        />
        <Dropdown
          label="Gender"
          formik={medicineFormik}
          value={medicineFormik.values.gender}
          inputName="gender"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          isError
          isRequired
          onChange={(e) =>
            medicineFormik.setFieldValue("gender", {
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
          </div>
        </div>

        <div className="grid gap-6 mt-4">
          {medicineFormik.values?.medicineOrders?.length > 0 ? (
            medicineFormik.values?.medicineOrders?.map((order, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md space-y-4 relative transform transition-all duration-300 hover:shadow-lg animate-fadeIn"
              >
                <div className="flex justify-between items-center border-b pb-4">
                  <p className="text-xl font-semibold text-gray-800">
                    Medicine Order #{index + 1}
                  </p>
                  <button
                    className="hover:text-red-500 transition-colors duration-300 p-2 rounded-full hover:bg-red-50"
                    onClick={() => handleDeleteMedicineOrder(index)}
                  >
                    <CancelfillIcon className="text-red-400 w-6 h-6 transform transition-transform duration-300 hover:rotate-90" />
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Dropdown
                    isError
                    isRequired
                    dynamicError
                    index={index}
                    objKey="medicineOrders"
                    inputName="selectedMedicine"
                    label="Medicine"
                    formik={medicineFormik}
                    options={medicineFormik.values.medicineOptions}
                    value={order.selectedMedicine}
                    onChange={(e) => handleMedicineChange(e, index)}
                  />
                  <Dropdown
                    isError
                    isRequired
                    dynamicError
                    index={index}
                    objKey="medicineOrders"
                    inputName="selectedStrength"
                    formik={medicineFormik}
                    label="Strength"
                    options={medicineFormik.values.strengthOptions}
                    value={order.selectedStrength}
                    onChange={(e) => handleStrengthChange(e, index)}
                  />
                  <InputField
                    isError
                    dynamicError
                    isRequired
                    index={index}
                    type="number"
                    objKey="medicineOrders"
                    inputName="price"
                    label="Price"
                    formik={medicineFormik}
                    value={order.price}
                    onChange={(e) => handlePriceChange(e, index)}
                  />
                  <InputField
                    isError
                    dynamicError
                    isRequired
                    index={index}
                    type="number"
                    objKey="medicineOrders"
                    inputName="qty"
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
                    className="md:col-span-2"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 bg-white rounded-lg shadow-sm">
              No Orders Found
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        onClick={() => medicineFormik.handleSubmit()}
        className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 w-full md:w-auto"
      >
        Save Order
      </button>
    </div>
  );
};

export default OrderIndex;
