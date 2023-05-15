import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/CurrentTemp";
import HourlyData from "./components/HourlyData";
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hourly" element={<HourlyData />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
