import axios from "axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

const useMedicineOrder = () => {
  const formik = useFormik({
    initialValues: {
      medicineOptions: [],
      strengthOptions: [],
    },
    // validationSchema: Yup.object().shape({
    //   medicineOrders: Yup.array().of(
    //     Yup.object().shape({
    //       selectedMedicine: Yup.string().required("Medicine is required"),
    //       selectedStrength: Yup.object().required("Strength is required"),
    //       qty: Yup.number()
    //         .min(1, "Quantity must be at least 1")
    //         .required("Quantity is required"),
    //       price: Yup.number()
    //         .min(1, "Quantity must be at least 1")
    //         .required("Quantity is required"),
    //     })
    //   ),
    //   labOrders: Yup.array().of(
    //     Yup.object().shape({
    //       selectedLab: Yup.string().required("Lab test is required"),
    //       specimen: Yup.string().required("Specimen type is required"),
    //       qty: Yup.number()
    //         .min(1, "Quantity must be at least 1")
    //         .required("Quantity is required"),
    //     })
    //   ),
    // }),
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

  // const handleAddMedicine = () => {

  //   const firstArray = formik.values.medicineOptions[0];
  //   const firstVariants = firstArray.variants[0];

  //   const strengthOptions = firstArray.variants
  //     .map((data) => ({
  //       label: `${data.strength} ${data.unit}`,
  //       value: data.id,
  //       ...data,
  //     }))
  //     .sort((a, b) => a - b);

  //   const selectedMedicineObj = {
  //     label: firstArray.name,
  //     value: firstArray.id,
  //   };

  //   const obj = {
  //     label: strengthOptions[0]?.label,
  //     value: strengthOptions[0]?.value,
  //     ...strengthOptions[0],
  //   };

  //   formik.setFieldValue("strengthOptions", strengthOptions);
  //   formik.setFieldValue("medicineOrders", [
  //     ...formik.values.medicineOrders,
  //     {
  //       selectedMedicine: selectedMedicineObj,
  //       selectedStrength: obj,
  //       qty: 1,
  //       price: firstVariants.price,
  //       total: 1 * firstVariants.price,
  //     },
  //   ]);
  // };

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
      formik.setFieldValue(
        `medicineOrders[${index}].total`,
        Number(
          formik.values.medicineOrders[index].qty * strengthOptions[0].price
        )
      );
      formik.setFieldValue(`medicineOrders[${index}].qty`, 1);
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
    const findedStrength = findedMedicine.variants.find(
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

  return {
    formik,
    handleAddMedicine,
    handleMedicineChange,
    handleStrengthChange,
    handleQuantityChange,
    handlePriceChange,
  };
};

export default useMedicineOrder;
