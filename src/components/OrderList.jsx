import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CancelfillIcon from "../icons/CancelIcon";
import Dropdown from "./Dropdown";
import InputField from "./Input";
import TextArea from "./TextArea";



const OrdersList = (props) => {
  const {
    formik,
    handleMedicineChange,
    handleStrengthChange,
    handleQuantityChange,
    handlePriceChange,
    handleDeleteMedicineOrder,
    handleDeleteLabOrder, // assume you have a similar handler for lab orders
    handleClearData,
  } = props;

  // Combine orders from both arrays, tagging them with type and saving their original index
  const combinedOrders = [
    ...formik.values.medicineOrders.map((order, medIndex) => ({
      ...order,
      type: "medicine",
      internalIndex: medIndex, // used for updating/deleting
    })),
    ...formik.values.labOrders.map((order, labIndex) => ({
      ...order,
      type: "lab",
      internalIndex: labIndex,
    })),
  ];

  // Sort orders based on the orderIndex field (assumed to be assigned when added)
  const sortedOrders = combinedOrders.sort(
    (a, b) => a.orderIndex - b.orderIndex
  );

  // Called when a drag and drop action is completed
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Create a new ordered list from the sorted orders
    const newOrders = Array.from(sortedOrders);
    const [removed] = newOrders.splice(result.source.index, 1);
    console.log("removed: ", removed);
    newOrders.splice(result.destination.index, 0, removed);

    // Reassign orderIndex based on new positions
    newOrders.forEach((order, idx) => {
      order.orderIndex = idx + 1;
    });

    // Separate orders back into medicine and lab arrays (dropping temporary keys)
    const newMedicineOrders = newOrders
      .filter((order) => order.type === "medicine")
      .map(({ type, internalIndex, ...rest }) => rest);
    const newLabOrders = newOrders
      .filter((order) => order.type === "lab")
      .map(({ type, internalIndex, ...rest }) => rest);

    // Update the Formik state
    formik.setFieldValue("medicineOrders", newMedicineOrders);
    formik.setFieldValue("labOrders", newLabOrders);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="ordersDroppable">
        {(provided) => (
          <div
            className="orders-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {sortedOrders.map((order, index) => (
              <Draggable
                key={`${order.type}-${order.orderIndex}`}
                draggableId={`${order.type}-${order.orderIndex}`}
                index={index}
              >
                {(provided) => (
                  <div
                    className="order-item bg-white p-6 rounded-lg shadow-md mb-4"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {order.type === "medicine" ? (
                      // Render Medicine Order Card
                      <div className="bg-white p-6 rounded-lg shadow-md space-y-4 relative transform transition-all duration-300 hover:shadow-lg animate-fadeIn">
                        <div className="flex justify-between items-center border-b pb-4">
                          <p className="text-xl font-semibold text-gray-800">
                            Medicine Order #{order.orderIndex}
                          </p>
                          <button
                            className="hover:text-red-500 transition-colors duration-300 p-2 rounded-full hover:bg-red-50"
                            onClick={() =>
                              handleDeleteMedicineOrder(order.internalIndex)
                            }
                          >
                            <CancelfillIcon className="text-red-400 w-6 h-6 transform transition-transform duration-300 hover:rotate-90" />
                          </button>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                          <Dropdown
                            isError
                            isRequired
                            dynamicError
                            index={order.internalIndex}
                            objKey="medicineOrders"
                            inputName="selectedMedicine"
                            label="Medicine"
                            formik={formik}
                            options={formik.values.medicineOptions}
                            value={order.selectedMedicine}
                            onChange={(e) =>
                              handleMedicineChange(e, order.internalIndex)
                            }
                            handleClearData={handleClearData}
                          />
                          <Dropdown
                            isError
                            isRequired
                            dynamicError
                            index={order.internalIndex}
                            objKey="medicineOrders"
                            inputName="selectedStrength"
                            formik={formik}
                            label="Strength"
                            options={formik.values.strengthOptions}
                            value={order.selectedStrength}
                            onChange={(e) =>
                              handleStrengthChange(e, order.internalIndex)
                            }
                            handleClearData={handleClearData}
                          />
                          <InputField
                            isError
                            dynamicError
                            isRequired
                            index={order.internalIndex}
                            type="number"
                            objKey="medicineOrders"
                            inputName="price"
                            label="Price"
                            formik={formik}
                            value={order.price}
                            onChange={(e) =>
                              handlePriceChange(e, order.internalIndex)
                            }
                          />
                          <InputField
                            isError
                            dynamicError
                            isRequired
                            index={order.internalIndex}
                            type="number"
                            objKey="medicineOrders"
                            inputName="qty"
                            label="Qty"
                            formik={formik}
                            value={order.qty}
                            onChange={(e) =>
                              handleQuantityChange(e, order.internalIndex)
                            }
                          />
                          <InputField
                            label="Total"
                            formik={formik}
                            value={order.total}
                            disabled
                            className="md:col-span-2"
                          />
                        </div>
                      </div>
                    ) : (
                      // Render Lab Order Card
                      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
                        <div className="flex justify-between items-center border-b pb-4">
                          <p className="text-xl font-semibold text-gray-800">
                            Lab Order #{order.orderIndex}
                          </p>
                          <button
                            className="hover:text-red-500 transition-colors duration-300 p-2 rounded-full hover:bg-red-50"
                            onClick={() =>
                              handleDeleteLabOrder(order.internalIndex)
                            }
                          >
                            <CancelfillIcon className="text-red-400 w-6 h-6 transform transition-transform duration-300 hover:rotate-90" />
                          </button>
                        </div>
                        <Dropdown
                          isError
                          isRequired
                          dynamicError
                          index={order.internalIndex}
                          objKey="labOrders"
                          label="Lab Test Name"
                          inputName="name"
                          value={order.name}
                          options={order.labTestOptions}
                          formik={formik}
                          onChange={(e) => {
                            const labTestValue = e.target.value;
                            if (labTestValue === "") {
                              formik.setFieldValue(
                                `labOrders[${order.internalIndex}].priority`,
                                null
                              );
                            } else {
                              formik.setFieldValue(
                                `labOrders[${order.internalIndex}].name`,
                                {
                                  label: labTestValue,
                                  value: labTestValue,
                                }
                              );
                            }
                          }}
                        />
                        <Dropdown
                          label="Specimen Type"
                          inputName="specimenType"
                          value={order.specimen}
                          options={order.specimenOptions}
                          isMultiple
                          disabled={true}
                          formik={formik}
                        />
                        <Dropdown
                          isError
                          dynamicError
                          isRequired
                          index={order.internalIndex}
                          objKey="labOrders"
                          label="Priority"
                          inputName="priority"
                          value={order.priority}
                          options={order.priorityOptions}
                          formik={formik}
                          onChange={(e) => {
                            const newPriority = e.target.value;
                            if (newPriority === "") {
                              formik.setFieldValue(
                                `labOrders[${order.internalIndex}].priority`,
                                null
                              );
                            } else {
                              formik.setFieldValue(
                                `labOrders[${order.internalIndex}].priority`,
                                {
                                  label: newPriority,
                                  value: newPriority,
                                }
                              );
                            }
                          }}
                        />
                        <InputField
                          isError
                          dynamicError
                          isRequired
                          index={order.internalIndex}
                          objKey="labOrders"
                          label="Price"
                          inputName="price"
                          type="number"
                          value={order.price}
                          formik={formik}
                          onChange={(e) => {
                            const newPrice = e.target.value;
                            formik.setFieldValue(
                              `labOrders[${order.internalIndex}].price`,
                              newPrice
                            );
                          }}
                        />
                        <TextArea
                          label="Instructions"
                          placeholder="Enter Instructions"
                          inputName="instruction"
                          value={order.instruction}
                          formik={formik}
                          onChange={(e) => {
                            const newInstruction = e.target.value;
                            formik.setFieldValue(
                              `labOrders[${order.internalIndex}].instruction`,
                              newInstruction
                            );
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default OrdersList;
