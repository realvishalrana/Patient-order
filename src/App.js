import React from "react";
import OrderIndex from "./components";
import "./output.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderConfirmation from "./components/OrderConfirmation";
  
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrderIndex />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
