import React from "react";
import InputField from "./Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropdown from "./Dropdown";

const OrderIndex = () => {
  const formik = useFormik({
    initialValues: {
      patientName: "",
      gender: "",
      dob: "",
      medicineOrders: [
        {
          selectedMedicine: "",
          selectedStrength: "",
          qty: "",
          price: 0,
          total: 0,
        },
      ],
      labOrders: [
        {
          selectedLab: "",
          specimen: "",
          priority: "",
          instructions: "",
          price: 0,
        },
      ],
    },
    validationSchema: Yup.object().shape({
      patientName: Yup.string().required("Patient name is required"),
      gender: Yup.string().required("Please select gender"),
      dob: Yup.string().required("Please select DOB"),
      medicineOrders: Yup.array().of(
        Yup.object().shape({
          selectedMedicine: Yup.string().required("Medicine is required"),
          selectedStrength: Yup.object().required("Strength is required"),
          qty: Yup.number()
            .min(1, "Quantity must be at least 1")
            .required("Quantity is required"),
        })
      ),
      labOrders: Yup.array().of(
        Yup.object().shape({
          selectedLab: Yup.string().required("Lab test is required"),
          specimen: Yup.string().required("Specimen type is required"),
          qty: Yup.number()
            .min(1, "Quantity must be at least 1")
            .required("Quantity is required"),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log("values: ", values);
    },
  });

  return (
    <div>
      Basic Details
      <form onSubmit={formik.handleSubmit}>
        <InputField
          formik={formik}
          label={"Patient Name"}
          inputName={"patientName"}
          isError
          isRequired
          {...formik.getFieldProps("patientName")}
        />
        <InputField
          formik={formik}
          label={"DOB"}
          inputName={"dob"}
          isError
          type="date"
          isRequired
          {...formik.getFieldProps("dob")}
        />
        <Dropdown
          label="gender"
          formik={formik}
          value={formik.values.gender}
          inputName="gender"
          options={[
            { label: "Select Gender", value: "" },
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
          isError
          isRequierd
          onChange={(e) => formik.setFieldValue("gender", e.target.value)}
        />

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default OrderIndex;
