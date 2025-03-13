import { useLocation, useNavigate } from "react-router-dom";
import PrinterIcon from "../icons/PrinterIcon";
import LeftArrow from "../icons/LeftArrowIcon";
import OrderSummary from "../components/OrderSummary";
import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";


const exportToPDF = () => {
  const input = document.getElementById("order-confirmation");
  if (!input) return;

  // Override problematic styles
  input.style.backgroundColor = "#fff";

  html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      // Calculate image height in PDF units
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add extra pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pageWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("order_confirmation.pdf");
    })
    .catch((error) => console.error("Export to PDF error: ", error));
};

const OrderConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderData = state?.orderData || {};

  if (!state?.orderData) {
    return <div className="p-8 text-red-500">No order data found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-gray-100 p-2 rounded"
          >
            <LeftArrow />
            Back to Form
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              <PrinterIcon className="h-5 w-5" />
              Print
            </button>
            <button
              onClick={() => exportToPDF(orderData)}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-100"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div
          id="order-confirmation"
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">
            Order Confirmation - #{orderData.orderId || "N/A"}
          </h1>

          {/* Tabs Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Patient Information Card */}
            <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
              <PatientInfo data={orderData} />
            </div>

            {/* Orders Section */}
            <div className="md:col-span-2 space-y-8">
              <OrderSection
                title="Lab Orders"
                data={orderData.labOrders}
                renderItem={(item) => <LabOrderItem item={item} />}
              />
              <OrderSection
                title="Medicine Orders"
                data={orderData.medicineOrders}
                renderItem={(item) => <MedicineOrderItem item={item} />}
              />
            </div>
          </div>

          {/* Summary Section */}
          <div className="mt-8 pt-6 border-t">
            <OrderSummary data={orderData} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-components
const PatientInfo = ({ data }) => (
  <div className="space-y-3">
    <InfoRow label="Name" value={data.patientName} />
    <InfoRow label="DOB" value={new Date(data.dob).toLocaleDateString()} />
    <InfoRow label="Gender" value={data.gender?.label} />
  </div>
);

const LabOrderItem = ({ item }) => (
  <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
    <div className="grid grid-cols-2 gap-4">
      <InfoRow label="Test Name" value={item.name.label} />
      <InfoRow label="Priority" value={item.priority.label} />
      <InfoRow label="Specimen" value={item.specimen[0]?.label} />
      <InfoRow label="Price" value={`$${item.price.toFixed(2)}`} />
    </div>
    {item.instruction && (
      <div className="mt-3 pt-3 border-t">
        <p className="text-sm text-gray-600">{item.instruction}</p>
      </div>
    )}
  </div>
);

const MedicineOrderItem = ({ item }) => (
  <div className="bg-white p-4 rounded-lg border hover:shadow-md transition-shadow">
    <div className="grid grid-cols-2 gap-4">
      <InfoRow label="Medication" value={item.selectedMedicine.label} />
      <InfoRow label="Strength" value={item.selectedStrength.label} />
      <InfoRow label="Quantity" value={item.qty} />
      <InfoRow label="Total" value={`$${item.total.toFixed(2)}`} />
    </div>
  </div>
);

const OrderSection = ({ title, data, renderItem }) => {
  if (!data || data.length === 0) return null;

  return (
    <section>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index}>{renderItem(item)}</div>
        ))}
      </div>
    </section>
  );
};

const InfoRow = ({ label, value }) => (
  <div>
    <span className="text-sm font-medium text-gray-600">{label}:</span>
    <p className="mt-1 text-gray-900">{value || "N/A"}</p>
  </div>
);

export default OrderConfirmation;
