import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getToken } from "../Auth/Auth";

const RequireAuth = () => {
	return <Outlet />;
};

export default RequireAuth;
