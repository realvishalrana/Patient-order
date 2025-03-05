import React from "react";
import Input from "./Input";
import Dropdown from "./Dropdown";
import usePatientOrder from "../hooks/usePatientOrder";
import { getError } from "../utils/helper";
import MedicineOrder from "./MedicineOrder";
import LabOrder from "./LabOrder";

const PatientOrder = () => {
  const props = usePatientOrder();

  const {
    formik,
    genderOptions,
    handleGenderOptionsChange,
    isMedicalOrdder,
    setIsMedicalOrdder,
    isLabOrder,
    setIsLabOrder,
    handleAddMedicineOrder,
    handleAddLabOrder,
  } = props;

  return (
    <div className="root-wrapper">
      <header className="header">Patient Order Form</header>
      <main>
        <div className="border-separator"></div>
        <div className="block-section">
          <div className="flex-col gap-24">
            <div className="block-header">Basic Details</div>

            <div className="block-content">
              <div className="grid grid-cols-4 gap-16">
                <div className="control-wrapper">
                  <Input
                    isError
                    isRequired
                    label="Patient Name"
                    formik={formik}
                    inputName="patientName"
                    labelClass="control-label"
                    {...formik.getFieldProps("patientName")}
                  />
                </div>

                <div className="control-wrapper">
                  <Dropdown
                    isRequierd
                    isError
                    label="Gender"
                    formik={formik}
                    inputName="gender"
                    options={genderOptions}
                    onChange={handleGenderOptionsChange}
                  />
                </div>

                <div className="control-wrapper">
                  <label>Date Of Birth*</label>
                  <input
                    className="control-input"
                    type="date"
                    onChange={(e) => {
                      formik.setFieldValue("dob", e.target.value);
                    }}
                  />
                  <div style={{ color: "red" }}>
                    {getError({ formik, inputName: "dob" })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-separator"></div>
        <div className="block-section">
          <div className="flex-col gap-32">
            <div className="flex item-center justify-between">
              <div className="block-header">Orders</div>
              <div className="flex gap-16">
                <button
                  className="button button-solid"
                  onClick={() => handleAddMedicineOrder()}
                >
                  Add Medicine Order
                </button>
                <button
                  className="button button-solid"
                  onClick={handleAddLabOrder}
                >
                  Add Lab Order
                </button>
              </div>
            </div>

            <div className="flex-col gap-24">
              <MedicineOrder {...props} />
              <LabOrder {...props} />
            </div>
          </div>
        </div>
        <div className="border-separator"></div>
      </main>

      <footer className="footer">
        <div className="flex item-center justify-end gap-16">
          <button
            className="button button-solid"
            onClick={() => formik.resetForm()}
          >
            Reset
          </button>
          <button
            className="button button-solid"
            type="submit"
            onClick={formik.handleSubmit}
          >
            Save
          </button>
        </div>
      </footer>
    </div>
  );
};

export default PatientOrder;
