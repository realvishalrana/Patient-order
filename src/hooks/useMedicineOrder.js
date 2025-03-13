import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const useMedicineOrder = () => {
  const [globalOrderIndex, setGlobalOrderIndex] = useState(1);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      patientName: "",
      gender: "",
      dob: "",
      labOrders: [],
      medicineOrders: [],
      labTestOptions: [],
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
          name: Yup.object().nullable().required("Lab test is required"),
          specimen: Yup.array().required("Specimen type is required"),
          price: Yup.number()
            .min(1, "Price must be at least 1")
            .required("Price is required"),
          priority: Yup.object().nullable().required("Priority is required"),
        })
      ),
    }),
    onSubmit: (values) => {
      navigate("/order-confirmation", {
        state: {
          orderData: {
            ...values,
            orderId: `ORD-${Date.now()}`, // Generate unique ID
            timestamp: new Date().toISOString(),
          },
        },
      });
    },
  });

  const getMedicineOrder = () => {
    try {
      axios({
        method: "get",
        url: "http://localhost:3001/medicine",
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
      console.error("getMedicineOrder data found");
    }
  };

  const getLabOrder = () => {
    try {
      axios({
        method: "get",
        url: "http://localhost:3001/laboratory-test",
      }).then(({ data = [] }) => {
        const modifiedData = data.map((med) => {
          return {
            ...med,
            label: med.name,
            value: med.id,
          };
        });
        formik.setFieldValue("lapOptions", modifiedData);
      });
    } catch (error) {
      console.error("getLabOrder data found");
    }
  };

  useEffect(() => {
    getMedicineOrder();
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
        orderIndex: globalOrderIndex,
        selectedMedicine: selectedMedicineObj,
        selectedStrength: obj,
        qty: 1,
        price: firstVariants.price,
        total: 1 * firstVariants.price,
      },
    ]);
    setGlobalOrderIndex((prev) => prev + 1);
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

  const handleClearData = ({ objKey, index, inputName }) => {
    if (inputName === "selectedMedicine") {
      const fieldPath = `${objKey}[${index}].selectedStrength`;
      formik.setFieldValue(fieldPath, null);
    }
    formik.setFieldValue(`${objKey}[${index}].price`, 0);
    formik.setFieldValue(`${objKey}[${index}].total`, 0);
    formik.setFieldValue(`${objKey}[${index}].qty`, 1);
  };

  const handleAddLabOrder = () => {
    // For demonstration, we take the second lab test from your list
    const selectedLabTest = formik.values.lapOptions[0];

    if (!selectedLabTest) {
      console.error("No lab test data available.");
      return;
    }

    // Prepare specimen options – here we assume each specimen is a string.
    const specimenOptions = selectedLabTest.specimens.map((specimen) => ({
      label: specimen,
      value: specimen, // Adjust if you have an ID for each specimen
    }));

    // Define your priority options as needed.
    const priorityOptions = [
      { label: "Critical Care", value: "CriticalCare" },
      { label: "Standard Care", value: "StandardCare" },
      { label: "Routine Care", value: "RoutineCare" },
      { label: "Scheduled Care", value: "ScheduledCare" },
    ];

    const selectedMedicineObj = {
      label: selectedLabTest.name,
      value: selectedLabTest.id,
    };

    // Create a lab order object with pre-populated values.
    const newLabOrder = {
      orderIndex: globalOrderIndex,
      name: selectedMedicineObj,
      labTestOptions: [selectedMedicineObj],
      specimenOptions: specimenOptions,
      specimen: specimenOptions,
      price: selectedLabTest.price,
      instruction: selectedLabTest.instruction,
      priorityOptions: priorityOptions,
      priority: priorityOptions[0],
    };

    // Append the new lab order to your existing lab orders array.
    formik.setFieldValue("labOrders", [
      ...(formik.values.labOrders || []),
      newLabOrder,
    ]);

    // Increment the global counter
    setGlobalOrderIndex((prev) => prev + 1);
  };

  const handleDeleteMedicineOrder = (index) => {
    const medicineOrders = [...formik.values.medicineOrders];
    medicineOrders.splice(index, 1);
    formik.setFieldValue("medicineOrders", medicineOrders);
    setGlobalOrderIndex((prev) => prev - 1);
  };

  const handleDeleteLabOrder = (index) => {
    const labOrders = [...formik.values.labOrders];
    labOrders.splice(index, 1);
    formik.setFieldValue("labOrders", labOrders);
    setGlobalOrderIndex((prev) => prev - 1);
  };

  const handleLabChange = (e, order) => {
    const labTestValue = e.target.value;
    if (labTestValue === "") {
      formik.setFieldValue(`labOrders[${order.internalIndex}].priority`, null);
      formik.setFieldValue(`labOrders[${order.internalIndex}].name`, null);
      formik.setFieldValue(`labOrders[${order.internalIndex}].price`, "");
      // Corrected field name here as well
      formik.setFieldValue(`labOrders[${order.internalIndex}].instruction`, "");
    } else {
      // Otherwise, update the lab test name field
      formik.setFieldValue(`labOrders[${order.internalIndex}].name`, {
        label: labTestValue,
        value: labTestValue,
      });
    }
  };

  const hanldePriorityChange = (e, order) => {
    const newPriority = e.target.value;
    if (newPriority === "") {
      formik.setFieldValue(`labOrders[${order.internalIndex}].priority`, null);
    } else {
      formik.setFieldValue(`labOrders[${order.internalIndex}].priority`, {
        label: newPriority,
        value: newPriority,
      });
    }
  };

  return {
    formik,
    handleAddMedicine,
    handleMedicineChange,
    handleStrengthChange,
    handleQuantityChange,
    handlePriceChange,
    handleDeleteMedicineOrder,
    handleClearData,
    handleAddLabOrder,
    handleDeleteLabOrder,
    handleLabChange,
    hanldePriorityChange,
  };
};

export default useMedicineOrder;
