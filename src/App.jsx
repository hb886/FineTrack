import React from "react";
import SideBar from "./components/SideBar";
import Demo from "./components/Demo";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transactions from "./components/Transactions";
import Analytics from "./components/Analytics";
import Budget from "./components/Budget";


const App = () => {
  return (
    <div>
    <BrowserRouter>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "Poppins",}}
      >
        <Demo />

        <div style={{ display: "flex", flex: 1 }}>
          <SideBar />

          <div style={{ flex: 1, overflowY: "auto", height:"calc(100vh - 80px)" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/budget" element={<Budget />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
    </div>
  );
};

export default App;
