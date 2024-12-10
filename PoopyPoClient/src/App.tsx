import React from "react";
import NavBar from "./Components/NavBar";
import "./Styles.css";
import Sidebar from "./Components/Sidebar";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import About from "./Components/About";
import MapComponent from "./Components/Map/MapComponent";
import TransparentOverlay from "./Components/Utils/TransparentOverlay";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="app">
        <NavBar toggleSidebar={toggleSidebar} />
        {isSidebarOpen && <TransparentOverlay onClick={toggleSidebar} />}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/PoopyPoClient" element={<MapComponent />} />
          <Route path="/PoopyPoClient/about" element={<About />} />
          <Route path="/PoopyPoClient/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
