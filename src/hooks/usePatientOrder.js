import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useMedicineOrder from "./useMedicineOrder";
import useLabOrder from "./useLabOrder";

const usePatientOrder = () => {
  const [orderIndex, setOrderIndex] = useState(0);
  const [isMedicalOrdder, setIsMedicalOrdder] = useState(false);
  const [isLabOrder, setIsLabOrder] = useState(false);

  const genderOptions = [
    { label: "Select", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
    { label: "Unknown", value: "Unknown" },
  ];

  const orderValidationSchema = Yup.object().shape({
    patientName: Yup.string().required("Patient name is required"),
    gender: Yup.string().required("Please select gender"),
    dob: Yup.string().required("Please select DOB"),
    medicineOrders: Yup.array().of(
      Yup.object().shape({
        selectedMedicine: Yup.string().required("Medicine is required"),
        selectedStrength: Yup.string().required("Strength is required"),
        qty: Yup.number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
      })
    ),
    labOrders: Yup.array().of(
      Yup.object().shape({
        selectedLab: Yup.string().required("Lab test is required"),
        specimen: Yup.string().required("Specimen type is required"),
        priority: Yup.string().required("Priority is required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      patientName: "",
      gender: "",
      dob: "",
      medicineOrders: [], // Medicine orders array
      labOrders: [],
    },
    validationSchema: orderValidationSchema,
    onSubmit: (values) => {
      // console.log(values, {
      //   selectedMedicine,
      //   strengthOptions,
      //   selectedStrength,
      //   MedicinePrice,
      //   qty,
      //   selectedLab,
      //   specimenOptions,
      //   selectSpecime,
      //   priorityOptionsn,
      //   selectPriority,
      //   price,
      //   instructionsText,
      // });
    },
  });

  const medicalOrderData = useMedicineOrder(formik);
  const labOrderData = useLabOrder(formik);

  const {
    selectedMedicine,
    strengthOptions,
    selectedStrength,
    MedicinePrice,
    qty,
  } = medicalOrderData;

  const {
    selectedLab,
    specimenOptions,
    selectSpecime,
    priorityOptionsn,
    selectPriority,
    price,
    instructionsText,
  } = labOrderData;

  const handleGenderOptionsChange = (e) => {
    formik.setFieldValue("gender", e.target.value);
  };

  const handleOrderIndex = () => {
    setOrderIndex((count) => count + 1);
  };

  const handleAddMedicineOrder = () => {
    formik.setFieldValue("medicineOrders", [
      ...formik.values.medicineOrders,
      {
        selectedMedicine: "",
        selectedStrength: "",
        qty: 1,
      },
    ]);
  };

  const handleAddLabOrder = () => {
    formik.setFieldValue("labOrders", [
      ...formik.values.labOrders,
      {
        selectedLab: "",
        specimen: "",
        priority: "",
      },
    ]);
  };

  return {
    ...medicalOrderData,
    ...labOrderData,
    formik,
    genderOptions,
    handleGenderOptionsChange,
    orderIndex,
    handleOrderIndex,
    isMedicalOrdder,
    setIsMedicalOrdder,
    isLabOrder,
    setIsLabOrder,
    handleAddMedicineOrder,
    handleAddLabOrder,
  };
};

export default usePatientOrder;
