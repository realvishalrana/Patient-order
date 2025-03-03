import React from "react";
import Dropdown from "./Dropdown";
import Input from "./Input";

const MedicineOrder = ({ formik }) => {
  return formik?.values?.medicineOrders.map((order, index) => (
    <div key={index} className="medicine-order">
      <Dropdown
        label="Medicine"
        options={formik.medicineOptions}
        value={order.selectedMedicine}
        onChange={(e) =>
          formik.setFieldValue(
            `medicineOrders[${index}].selectedMedicine`,
            e.target.value
          )
        }
      />
      <Dropdown
        label="Strength"
        options={formik.strengthOptions}
        value={order.selectedStrength}
        onChange={(e) =>
          formik.setFieldValue(
            `medicineOrders[${index}].selectedStrength`,
            e.target.value
          )
        }
      />
      <Input
        label="Quantity"
        value={order.qty}
        onChange={(e) =>
          formik.setFieldValue(`medicineOrders[${index}].qty`, e.target.value)
        }
      />
      <div style={{ color: "red" }}>
        {formik.errors.medicineOrders &&
          formik.errors.medicineOrders[index] &&
          formik.errors.medicineOrders[index].selectedMedicine}
        {formik.errors.medicineOrders &&
          formik.errors.medicineOrders[index] &&
          formik.errors.medicineOrders[index].selectedStrength}
        {formik.errors.medicineOrders &&
          formik.errors.medicineOrders[index] &&
          formik.errors.medicineOrders[index].qty}
      </div>
    </div>
  ));
};

// import React from "react";
// import Dropdown from "./Dropdown";
// import Menu from "../img/menu.svg";
// import Delete from "../img/delete.svg";

// const MedicineOrder = ({
//   // orderIndex = 1,
//   medicineOptions = [],
//   strengthOptions,
//   handleStrengthChange,
//   selectedStrength,
//   handleMedicineChange,
//   selectedMedicine,
//   MedicinePrice,
//   qty,
//   setQty,
//   setMedicineMedicinePrice,
// }) => {
//   return (
//     <div className="card card-order">
//       <div className="flex item-center justify-between">
//         <div className="block-header">Medicine Order (#{1})</div>

//         <div className="flex item-center gap-12">
//           <button className="button button-icon button-drag">
//             <img src={Menu} alt="" height="24px" width="24px" />
//           </button>
//           <button className="button button-icon">
//             <img src={Delete} alt="" height="24px" width="24px" />
//           </button>
//         </div>
//       </div>

//       <div className="block-content">
//         <div className="grid grid-cols-4 gap-y-24 gap-x-16">
//           <div className="control-wrapper">
//             <Dropdown
//               label="Medicine Name"
//               isError
//               isRequierd
//               options={medicineOptions}
//               onChange={handleMedicineChange}
//               value={selectedMedicine || ""}
//             />
//           </div>

//           <div className="control-wrapper">
//             <Dropdown
//               label="Strength"
//               isError
//               isRequierd
//               options={strengthOptions.map((variant) => ({
//                 label: `${variant.strength} ${variant.unit}`,
//                 value: variant.id,
//               }))}
//               onChange={handleStrengthChange}
//               value={selectedStrength || ""}
//             />
//           </div>

//           <div className="control-wrapper col-start-1">
//             <label>Price*</label>
//             <input
//               className="control-input"
//               type="number"
//               value={MedicinePrice}
//               onChange={(e) => {
//                 setMedicineMedicinePrice(e.target.value);
//               }}
//             />
//           </div>

//           <div className="control-wrapper">
//             <label>Qty*</label>
//             <input
//               className="control-input"
//               type="number"
//               value={qty}
//               onChange={(e) => setQty(e.target.value)}
//             />
//           </div>

//           <div className="control-wrapper">
//             <label>Total</label>
//             <input
//               className="control-input"
//               type="number"
//               disabled
//               value={MedicinePrice * qty}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

export default MedicineOrder;
