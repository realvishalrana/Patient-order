import axios from "axios";
import { getIn, useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import Dropdown from "./Dropdown";
import InputField from "./Input";

const OrderIndex = () => {
  const formik = useFormik({
    initialValues: {
      patientName: "",
      gender: "",
      dob: "",
      // medicineOrders: [
      //   {
      //     selectedMedicine: "",
      //     selectedStrength: "",
      //     qty: "",
      //     price: 0,
      //     total: 0,
      //   },
      // ],
      // labOrders: [
      //   {
      //     selectedLab: "",
      //     specimen: "",
      //     priority: "",
      //     instructions: "",
      //     price: 0,
      //   },
      // ],
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

  const getLabOrder = () => {
    try {
      axios({
        method: "get",
        url: "http://localhost:3000/medicine",
      }).then(({ data = [] }) => {
        const modifiedData = data.map((med) => {
          return {
            ...med,
            label: med.name,
            value: med.id,
          };
        });
        formik.setFieldValue("medicineOptions", modifiedData);
      });
    } catch (error) {
      console.error("getLabOrder data found");
    }
  };

  useEffect(() => {
    getLabOrder();
  }, []);

  const handleAddMedicine = () => {
    const medicineOrders = Array.isArray(formik.values?.medicineOrders)
      ? [...formik.values?.medicineOrders]
      : [];

    formik.setFieldValue("medicineOrders", [
      medicineOrders,
      {
        selectedMedicine: "",
        selectedStrength: "",
        qty: "",
        price: 0,
        total: 0,
      },
    ]);
  };

  const handleMedicineChange = (event, index) => {
    const selectedMedicine = event.target.value;
    const medicineOrders = [...formik.values.medicineOrders];
    medicineOrders[index].selectedMedicine = selectedMedicine;
    formik.setFieldValue("medicineOrders", medicineOrders);

    const { medicineOptions } = formik.values;
    const findedMedicine = medicineOptions.find(
      (med) => med.value === selectedMedicine
    );

    if (findedMedicine) {
      const strengthOptions = findedMedicine.variants
        .map((data) => ({
          label: `${data.strength} ${data.unit}`,
          value: data.id,
          ...data,
        }))
        .sort((a, b) => a - b);

      formik.setFieldValue("strengthOptions", strengthOptions);
      formik.setFieldValue(
        `medicineOrders[${index}].selectedStrength`,
        strengthOptions[0].strength
      );
      formik.setFieldValue(
        `medicineOrders[${index}].price`,
        strengthOptions[0].price
      );
      formik.setFieldValue(`medicineOrders[${index}].total`, 0);
      formik.setFieldValue(`medicineOrders[${index}].qty`, 0);
    }
  };

  const handleStrengthChange = (event, index) => {
    const selectedStrength = event.target.value;
    const medicineOrders = [...formik.values.medicineOrders];
    medicineOrders[index].selectedStrength = selectedStrength;
    formik.setFieldValue("medicineOrders", medicineOrders);

    const { medicineOptions } = formik.values;
    const findedMedicine = medicineOptions.find(
      (med) => med.value === medicineOrders[index].selectedMedicine
    );
    const findedStrength = findedMedicine?.variants.find(
      (variant) => variant.id === selectedStrength
    );
    if (findedStrength) {
      formik.setFieldValue(
        `medicineOrders[${index}].price`,
        findedStrength.price
      );

      const total =
        Number(formik.values.medicineOrders[index].qty) *
        Number(findedStrength.price);

      formik.setFieldValue(`medicineOrders[${index}].total`, total);
    }
  };

  const handleQuantityChange = (event, index) => {
    const quantity = event.target.value;
    const medicineOrders = [...formik.values.medicineOrders];
    medicineOrders[index].qty = quantity;
    formik.setFieldValue("medicineOrders", medicineOrders);
    formik.setFieldValue(
      `medicineOrders[${index}].total`,
      quantity * formik.values.medicineOrders[index].price
    );
  };

  const handlePriceChange = (event, index) => {
    const price = event.target.value;
    const medicineOrders = [...formik.values.medicineOrders];
    medicineOrders[index].price = price;
    formik.setFieldValue("medicineOrders", medicineOrders);
    formik.setFieldValue(
      `medicineOrders[${index}].total`,
      price * formik.values.medicineOrders[index].qty
    );
  };

  return (
    <div className="">
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
      <div
        style={{
          display: "flex",
          gap: "30px",
        }}
      >
        <button onClick={handleAddMedicine}>Add Medicine Order</button>
        {formik.values?.medicineOrders?.map((order, index) => (
          <div key={index}>
            <Dropdown
              label="Medicine"
              options={formik.values.medicineOptions}
              value={order?.selectedMedicine}
              onChange={(e) => handleMedicineChange(e, index)}
            />
            <Dropdown
              label="Strength"
              options={formik.values.strengthOptions}
              value={order.selectedStrength}
              onChange={(e) => handleStrengthChange(e, index)}
            />
            <InputField
              label="Price"
              formik={formik}
              value={order.price}
              onChange={(e) => handlePriceChange(e, index)}
            />
            <InputField
              label="Qty"
              formik={formik}
              value={order.qty}
              onChange={(e) => handleQuantityChange(e, index)}
            />
            <InputField
              label="total"
              formik={formik}
              value={order.total}
              disabled
            />
          </div>
        ))}
      </div>
      <button>Add Lab Order</button>
    </div>
  );
};

export default OrderIndex;
