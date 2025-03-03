import React from "react";
import Dropdown from "./Dropdown";
import Menu from "../img/menu.svg";
import Delete from "../img/delete.svg";

const convertToLableValue = (data = []) => {
  const modifiedData = data.map((i) => {
    return {
      label: i,
      value: i,
    };
  });

  return modifiedData;
};

const LabOrder = ({
  labOptions,
  handleLabChange,
  selectedLab,
  price,
  priorityOptions,
  handleSpecimenChange,
  specimenOptions,
  selectSpecimen,
  instructionsText,
  selectPriority,
  setSelectPriority,
  setPrice,
  setInstructionsText,
}) => {
  return (
    <div className="card card-order">
      <div className="flex item-center justify-between">
        <div className="block-header">Lab Order (#{2})</div>

        <div className="flex item-center gap-12">
          <button className="button button-icon button-drag">
            <img src={Menu} alt="" height="24px" width="24px" />
          </button>
          <button className="button button-icon">
            <img src={Delete} alt="" height="24px" width="24px" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-y-24 gap-x-16">
        <div className="control-wrapper">
          <Dropdown
            label="Lab Test Name"
            isError
            isRequierd
            options={labOptions}
            onChange={handleLabChange}
            value={selectedLab || ""}
          />
        </div>

        <div className="control-wrapper">
          <Dropdown
            label="Specimen Type"
            isError
            isRequierd
            options={convertToLableValue(specimenOptions)}
            onChange={handleSpecimenChange}
            value={selectSpecimen || ""}
          />
        </div>

        <div className="control-wrapper">
          <Dropdown
            label="Priority"
            isError
            isRequierd
            options={priorityOptions}
            onChange={(e) => {
              setSelectPriority(e.target.value);
            }}
            value={selectPriority || ""}
          />
        </div>

        <div className="control-wrapper">
          <label>Price*</label>
          <input
            className="control-input"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            min="0"
          />
        </div>

        <div className="col-span-full">
          <div className="control-wrapper">
            <label>Instructions*</label>
            <textarea
              className="control-textarea"
              rows="1"
              value={instructionsText}
              onChange={(e) => {
                setInstructionsText(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabOrder;
