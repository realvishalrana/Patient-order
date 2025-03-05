import { useFormik } from "formik";
import * as Yup from "yup";

const usePatientOrders = () => {
  const formik = useFormik({
    initialValues: {
      patientName: "",
      gender: "",
      dob: "",
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
          price: Yup.number()
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
  return { formik };
};

export default usePatientOrders;
