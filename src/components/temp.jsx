import React, { useState, useEffect } from "react";
import axios from "axios";

const Temp = () => {
  const [patient, setPatient] = useState({
    name: "Dexter Elma",
    gender: "Male",
    dob: "1981-03-18",
  });

  const [orders, setOrders] = useState([]);
  const [medicineOptions, setMedicineOptions] = useState([]); // For storing medicine options
  const [labOptions, setLabOptions] = useState([]); // For storing lab options

  // Fetch medicine and lab data when the component is mounted
  useEffect(() => {
    // Fetch medicine data
    axios.get("http://localhost:3000/medicine")
      .then((response) => {
        setMedicineOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching medicine data:", error);
      });

    // Fetch lab data
    axios.get("http://localhost:3000/laboratory-test")
      .then((response) => {
        setLabOptions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching laboratory data:", error);
      });
  }, []);

  const handlePatientChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleAddOrder = (type) => {
    if (type === "Medicine") {
      setOrders([
        ...orders,
        { type: "Medicine", name: "", strength: "", price: 0, qty: 1 },
      ]);
    } else if (type === "Lab") {
      setOrders([
        ...orders,
        { type: "Lab", name: "", specimen: "", priority: "", price: 0, instructions: "" },
      ]);
    }
  };

  const handleOrderChange = (index, e) => {
    const updatedOrders = orders.map((order, i) =>
      i === index ? { ...order, [e.target.name]: e.target.value } : order
    );
    setOrders(updatedOrders);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Patient Data:", patient);
    console.log("Orders:", orders);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Patient Form</h2>
      <label>
        Patient Name:
        <input type="text" name="name" value={patient.name} onChange={handlePatientChange} />
      </label>
      <label>
        Gender:
        <select name="gender" value={patient.gender} onChange={handlePatientChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <label>
        Date of Birth:
        <input type="date" name="dob" value={patient.dob} onChange={handlePatientChange} />
      </label>

      <h2>Orders</h2>
      {orders.map((order, index) => (
        <div key={index}>
          {order.type === "Medicine" ? (
            <>
              <h3>Medicine Order #{index + 1}</h3>
              <label>
                Medicine Name:
                <select name="name" value={order.name} onChange={(e) => handleOrderChange(index, e)}>
                  <option value="">Select Medicine</option>
                  {medicineOptions.map((med) => (
                    <option key={med.id} value={med.name}>{med.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Strength:
                <input type="text" name="strength" value={order.strength} onChange={(e) => handleOrderChange(index, e)} />
              </label>
              <label>
                Price:
                <input type="number" name="price" value={order.price} onChange={(e) => handleOrderChange(index, e)} />
              </label>
              <label>
                Quantity:
                <input type="number" name="qty" value={order.qty} onChange={(e) => handleOrderChange(index, e)} />
              </label>
              <p>Total: {order.qty * order.price}</p>
            </>
          ) : (
            <>
              <h3>Lab Order #{index + 1}</h3>
              <label>
                Lab Test Name:
                <select name="name" value={order.name} onChange={(e) => handleOrderChange(index, e)}>
                  <option value="">Select Lab Test</option>
                  {labOptions.map((lab) => (
                    <option key={lab.id} value={lab.name}>{lab.name}</option>
                  ))}
                </select>
              </label>
              <label>
                Specimen Type:
                <input type="text" name="specimen" value={order.specimen} onChange={(e) => handleOrderChange(index, e)} />
              </label>
              <label>
                Priority:
                <input type="text" name="priority" value={order.priority} onChange={(e) => handleOrderChange(index, e)} />
              </label>
              <label>
                Price:
                <input type="number" name="price" value={order.price} onChange={(e) => handleOrderChange(index, e)} />
              </label>
              <label>
                Instructions:
                <textarea name="instructions" value={order.instructions} onChange={(e) => handleOrderChange(index, e)} />
              </label>
            </>
          )}
        </div>
      ))}
      <button type="button" onClick={() => handleAddOrder("Medicine")}>Add Medicine Order</button>
      <button type="button" onClick={() => handleAddOrder("Lab")}>Add Lab Order</button>
      <button type="reset">Reset</button>
      <button type="submit">Save</button>
    </form>
  );
};

export default Temp;
