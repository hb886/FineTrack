import React from "react";
import SideBar from "./components/SideBar";
import Demo from "./components/Demo";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Transactions from "./components/Transactions";


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

          <div style={{ flex: 1, overflowY: "auto" }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
    </div>
  );
};

export default App;
