import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/CurrentTemp";
import HourlyData from "./components/HourlyData";
import MonthlyData from "./components/MonthlyData";
import YearlyData from "./components/YearlyData";
const App = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
        <div className="container-md">
        <div className="navbar-brand mx-auto text-center">
            Weather Prediction
          </div>
        </div>
      </nav>
      <div className="container p-3">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
           
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
