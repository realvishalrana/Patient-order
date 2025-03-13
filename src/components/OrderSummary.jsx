import React from "react";

const OrderSummary = ({ data }) => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 space-y-8">
        {/* Patient Details Section */}
        <div className="border-b pb-6 transition transform hover:scale-105 duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Patient Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">
                Patient Name
              </label>
              <p className="mt-1 text-gray-900">{data.patientName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">
                Date of Birth
              </label>
              <p className="mt-1 text-gray-900">
                {new Date(data.dob).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Gender</label>
              <p className="mt-1 text-gray-900 capitalize">
                {data.gender.label}
              </p>
            </div>
          </div>
        </div>

        {/* Lab Orders Section */}
        {data.labOrders.length > 0 && (
          <div className="border-b pb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Lab Orders</h2>
            <div className="space-y-6">
              {data.labOrders.map((labOrder, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg transition shadow-sm hover:shadow-lg duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Test Name
                      </label>
                      <p className="mt-1 text-gray-900">
                        {labOrder.name.label}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Specimen
                      </label>
                      <p className="mt-1 text-gray-900">
                        {labOrder.specimen[0].label}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Priority
                      </label>
                      <p className="mt-1 text-gray-900">
                        {labOrder.priority.label}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Price
                      </label>
                      <p className="mt-1 text-gray-900">
                        ${labOrder.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  {labOrder.instruction && (
                    <div className="mt-4">
                      <label className="text-sm font-medium text-gray-600">
                        Instructions
                      </label>
                      <p className="mt-1 text-gray-900">
                        {labOrder.instruction}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medicine Orders Section */}
        {data.medicineOrders.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Medication Orders
            </h2>
            <div className="space-y-6">
              {data.medicineOrders.map((medicine, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-4 rounded-lg transition shadow-sm hover:shadow-lg duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Medication
                      </label>
                      <p className="mt-1 text-gray-900">
                        {medicine.selectedMedicine.label}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Strength
                      </label>
                      <p className="mt-1 text-gray-900">
                        {medicine.selectedStrength.label}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Quantity
                      </label>
                      <p className="mt-1 text-gray-900">
                        {medicine.qty}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Total Price
                      </label>
                      <p className="mt-1 text-gray-900">
                        ${medicine.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Total Pricing Section */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Order Summary
          </h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Lab Tests:</span>
            <span className="font-medium">
              $
              {data.labOrders
                .reduce((sum, item) => sum + item.price, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600">Total Medications:</span>
            <span className="font-medium">
              $
              {data.medicineOrders
                .reduce((sum, item) => sum + item.total, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-blue-200">
            <span className="text-lg font-bold text-gray-800">
              Grand Total:
            </span>
            <span className="text-lg font-bold text-blue-600">
              $
              {(
                data.labOrders.reduce((sum, item) => sum + item.price, 0) +
                data.medicineOrders.reduce((sum, item) => sum + item.total, 0)
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
