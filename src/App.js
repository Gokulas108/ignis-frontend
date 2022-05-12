import React from "react";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Buildings from "./Components/Buildings";
import Notifications from "./Components/Notifications";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "./App.less";
import Workorder from "./Components/Workorder";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/buildings" element={<Buildings />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/login" element={<Login />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/workorder" element={<Workorder />} />

          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </div>
    </Router>
  );
}
