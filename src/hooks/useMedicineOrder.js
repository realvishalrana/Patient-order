import axios from "axios";
import React, { useEffect, useState } from "react";

const useMedicineOrder = (formik) => {
  const [medicineOptions, setMedicineOptions] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [strengthOptions, setStrengthOptions] = useState([]);
  const [selectedStrength, setSelectedStrength] = useState("");
  const [MedicinePrice, setMedicineMedicinePrice] = useState(0);
  const [qty, setQty] = useState(0);

  const getMedicineName = () => {
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
        setMedicineOptions(modifiedData);
      });
    } catch (error) {
      console.error("getMedicineName data found");
    }
  };

  const handleMedicineChange = (e) => {
    console.log(e.target.value, "line 323");
    setSelectedMedicine(e.target.value);
    setSelectedStrength("");
    setMedicineMedicinePrice(0);
  };

  const handleStrengthChange = (e) => {
    const selectedVariant = strengthOptions.find(
      (variant) => variant.id === e.target.value
    );
    if (selectedVariant) {
      setSelectedStrength(selectedVariant.id);
      setMedicineMedicinePrice(selectedVariant.price);
    }
  };

  useEffect(() => {
    getMedicineName();
  }, []);

  useEffect(() => {
    if (selectedMedicine) {
      const medicine = medicineOptions.find(
        (option) => option.value === selectedMedicine
      );
      if (medicine) {
        setStrengthOptions(medicine.variants);
        setSelectedStrength(medicine.variants[0].id);
        setMedicineMedicinePrice(medicine.variants[0].price);
      }
    }
  }, [selectedMedicine, medicineOptions]);

  return {
    medicineOptions,
    handleMedicineChange,
    handleStrengthChange,
    selectedStrength,
    MedicinePrice,
    strengthOptions,
    qty,
    setQty,
    setMedicineMedicinePrice,
  };
};

export default useMedicineOrder;
