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
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [first, setIsFirst] = useState(false);

  useEffect(() => {
    if (!first) {
      // Create WebSocket connection
      const ws = new WebSocket("ws://localhost:5179/api/Notification/ws");

      // Save the WebSocket instance

      // Listen for messages
      ws.onmessage = (event: MessageEvent<string>) => {
        console.log(`recieved wescoket message ${event.data}`);
      };

      // Handle WebSocket closure
      ws.onclose = () => {
        console.log("WebSocket connection closed");
      };

      // Handle errors
      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
      setSocket(ws);

      // Clean up the connection on component unmount
      // return () => {
      //   ws.close();
      // };
      setIsFirst(true);
    }
  }, []);

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
