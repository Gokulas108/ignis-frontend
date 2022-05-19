import React from "react";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
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
					<Route path="/" element={<Layout />}>
						<Route path="/buildings" element={<Buildings />} />
						<Route path="/notifications" element={<Notifications />} />
						<Route path="/" element={<Dashboard />} />
						<Route path="/workorder" element={<Workorder />} />
					</Route>
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
		</Router>
	);
}
