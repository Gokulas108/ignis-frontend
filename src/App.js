import React from "react";
import Login from "./Components/Login";
import Layout from "./Components/Layout";
import Dashboard from "./Components/Dashboard";
import Buildings from "./Components/Buildings";
import Notifications from "./Components/Notifications";
import Masters from "./Components/Masters";
import { getToken } from "./Auth/Auth";
import LoadPDF from "./Components/Pdf";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import "./App.less";
import Workorder from "./Components/Workorder";
import Master from "./Components/Masters";
import { AuthProvider } from "./Auth/AuthProvider";
import RequireAuth from "./Components/RequireAuth";
import ResetPassword from "./Components/ResetPassword";
import Authorization from "./Components/Authorization";

let DefaultIcon = L.icon({
	iconUrl: icon,
	shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function App() {
	return (
		<BrowserRouter>
			{/* <div> */}
			{/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route exact path="/" element={<Layout />}>
					<Route path="/buildings" element={<Buildings />} />
					<Route path="/notifications" element={<Notifications />} />
					<Route path="/workorder" element={<Workorder />} />
					<Route path="/master" element={<Master />} />
					<Route path="/authorization" element={<Authorization />} />

					<Route exact path="/" element={<Dashboard />} />
				</Route>
				<Route path="/resetpassword" element={<ResetPassword />} />
			</Routes>
			{/* </div> */}
		</BrowserRouter>
	);
}
