import axios from "axios";
import { useEffect, useState } from "react";

const optionsData = [
  { label: "Critical Care", value: "CriticalCare" },
  { label: "Standard Care", value: "StandardCare" },
  { label: "Routine Care", value: "RoutineCare" },
  { label: "Scheduled Care", value: "ScheduledCare" },
];
const useLabOrder = () => {
  const [labOptions, setLabOptions] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [specimenOptions, setSpecimenOptions] = useState([]);
  const [selectSpecimen, setSelectSpecimen] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState(optionsData);
  const [selectPriority, setSelectPriority] = useState();
  const [price, setPrice] = useState(0);
  const [instructionsText, setInstructionsText] = useState("");

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

        setLabOptions(modifiedData);
      });
    } catch (error) {
      console.error("getLabOrder data found");
    }
  };

  const handleLabChange = (e) => {
    setSelectedLab(e.target.value);
    setSpecimenOptions([]);
    setPrice(0);
    setInstructionsText("");
  };

  const handleSpecimenChange = (e) => {
    const selectedVariant = specimenOptions.find(
      (variant) => variant === e.target.value
    );
    if (selectedVariant) {
      setSelectSpecimen(selectedVariant);
    }
  };

  useEffect(() => {
    if (selectedLab) {
      const labData = labOptions.find((option) => option.value === selectedLab);
      if (labData) {
        setSpecimenOptions(labData.specimens);
        setPrice(labData.price);
        setInstructionsText(labData.instruction);
      }
    }
  }, [selectedLab, labOptions]);

  useEffect(() => {
    getLabOrder();
  }, []);

  return {
    labOptions,
    setLabOptions,
    selectedLab,
    setSelectedLab,
    specimenOptions,
    setSpecimenOptions,
    priorityOptions,
    setPriorityOptions,
    price,
    setPrice,
    instructionsText,
    setInstructionsText,
    handleLabChange,
    handleSpecimenChange,
    selectSpecimen,
    setSelectSpecimen,
    selectPriority,
    setSelectPriority,
  };
};

export default useLabOrder;
