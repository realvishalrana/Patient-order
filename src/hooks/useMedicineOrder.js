import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

const useMedicineOrder = () => {
  const formik = useFormik({
    initialValues: {
      patientName: "",
      gender: "",
      dob: "",
      medicineOptions: [],
      strengthOptions: [],
    },
    validationSchema: Yup.object().shape({
      patientName: Yup.string().required("Patient name is required"),
      gender: Yup.object().nullable().required("Please select gender"),
      dob: Yup.string().required("Please select DOB"),
      medicineOrders: Yup.array().of(
        Yup.object().shape({
          selectedMedicine: Yup.object()
            .nullable()
            .required("Medicine is required"),
          selectedStrength: Yup.object()
            .nullable()
            .required("Strength is required"),
          qty: Yup.number()
            .min(1, "Quantity must be at least 1")
            .required("Quantity is required"),
          price: Yup.number()
            .min(1, "Price must be at least 1")
            .required("Price is required"),
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
    if (
      !formik.values.medicineOptions ||
      formik.values.medicineOptions.length === 0
    ) {
      console.error("No medicines available to add.");
      return;
    }

    const firstArray = formik.values.medicineOptions[0];
    const firstVariants = firstArray.variants[0];

    if (!firstVariants) {
      console.error("No variants available for the selected medicine.");
      return;
    }

    const strengthOptions = firstArray.variants
      .map((data) => ({
        label: `${data.strength} ${data.unit}`,
        value: data.id,
        ...data,
      }))
      .sort((a, b) => a.value - b.value);

    const selectedMedicineObj = {
      label: firstArray.name,
      value: firstArray.id,
    };

    const obj = {
      label: strengthOptions[0]?.label || "",
      value: strengthOptions[0]?.value || "",
      ...strengthOptions[0],
    };

    formik.setFieldValue("strengthOptions", strengthOptions);
    formik.setFieldValue("medicineOrders", [
      ...(formik.values.medicineOrders || []), // Ensures it's always an array
      {
        selectedMedicine: selectedMedicineObj,
        selectedStrength: obj,
        qty: 1,
        price: firstVariants.price,
        total: 1 * firstVariants.price,
      },
    ]);
  };

  const handleMedicineChange = (event, index) => {
    // Convert event value to string for comparison
    const selectedMedicineValue = event.target.value;
    // Find the full selected medicine object from medicineOptions
    const selectedMedicineObj = formik.values.medicineOptions.find(
      (med) => med.value.toString() === selectedMedicineValue.toString()
    );

    // Update the medicine order at the given index with the full object
    const medicineOrders = [...formik.values.medicineOrders];
    medicineOrders[index].selectedMedicine = selectedMedicineObj;
    formik.setFieldValue("medicineOrders", medicineOrders);

    if (selectedMedicineObj) {
      // Build strength options from the selected medicine variants,
      // including both label and value
      const strengthOptions = selectedMedicineObj.variants
        .map((data) => ({
          label: `${data.strength} ${data.unit}`,
          value: data.id,
          ...data,
        }))
        .sort((a, b) => a.value - b.value);

      // Optionally update a global strengthOptions if needed
      formik.setFieldValue("strengthOptions", strengthOptions);

      // Use the first strength option as the default selection
      const defaultStrength = strengthOptions[0];
      medicineOrders[index].selectedStrength = defaultStrength;
      medicineOrders[index].price = defaultStrength.price;
      medicineOrders[index].qty = 1;
      medicineOrders[index].total = 1 * defaultStrength.price;
      formik.setFieldValue("medicineOrders", medicineOrders);
    }
  };

  const handleStrengthChange = (event, index) => {
    // Get the selected strength value from the event
    const selectedStrengthValue = event.target.value;
    // Find the full strength object from the current global strengthOptions
    const selectedStrengthObj = formik.values.strengthOptions.find(
      (s) => s.value.toString() === selectedStrengthValue.toString()
    );

    // Update the medicine order at the given index with the full object
    const medicineOrders = [...formik.values.medicineOrders];
    medicineOrders[index].selectedStrength = selectedStrengthObj;
    formik.setFieldValue("medicineOrders", medicineOrders);

    if (selectedStrengthObj) {
      // Update the price and total using the new strength details
      medicineOrders[index].price = selectedStrengthObj.price;
      medicineOrders[index].total =
        Number(medicineOrders[index].qty) * Number(selectedStrengthObj.price);
      formik.setFieldValue("medicineOrders", medicineOrders);
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

  const handleDeleteMedicineOrder = (index) => {
    const medicineOrders = [...formik.values.medicineOrders];
    medicineOrders.splice(index, 1);
    formik.setFieldValue("medicineOrders", medicineOrders);
  };

  return {
    formik,
    handleAddMedicine,
    handleMedicineChange,
    handleStrengthChange,
    handleQuantityChange,
    handlePriceChange,
    handleDeleteMedicineOrder,
  };
};

export default useMedicineOrder;
