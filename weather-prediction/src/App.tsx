import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/CurrentTemp";
import HourlyData from "./components/HourlyData";
import MonthlyData from "./components/MonthlyData";
import YearlyData from "./components/YearlyData";
const App = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <div className="container-md">
          <a className="navbar-brand d-flex justify-content-center " href="#">
            Weather Prediction
          </a>
        </div>
      </nav>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hourly" element={<HourlyData />} />
            <Route path="/monthly" element={<MonthlyData />} />
            <Route path="/yearly" element={<YearlyData />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
};

export default App;
