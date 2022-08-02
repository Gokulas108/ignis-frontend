import React from "react";
import { Layout, Menu } from "antd";
import { useState } from "react";
import Logo from "../Assets/Logo.png";
import { getToken, resetUserSession, getUser } from "../Auth/Auth";
import api from "../axiosConfig";

import {
	BarChartOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	BankOutlined,
	ApiOutlined,
	BellOutlined,
	ReconciliationOutlined,
	CalendarOutlined,
	FormOutlined,
	CommentOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import { LoadingOutlined } from "@ant-design/icons";

import { Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const headings = {
	"/": "Dashboard",
	"/buildings": "Buildings",
	"/workorder": "Work Orders",
	"/notifications": "Notifications",
	"/master": "Master Page",
};

React.useLayoutEffect = React.useEffect;

const LayoutComponent = () => {
	const [collapsed, setCollapsed] = useState(true);
	const [showButton, setShowButton] = useState(false);
	const [loading, setLoading] = useState(false);
	const [pageLoading, setPageLoading] = React.useState(0);

	let navigate = useNavigate();
	let location = useLocation();

	React.useEffect(() => {
		if (!getToken()) {
			resetUserSession();
			navigate("/login");
		}
	}, []);

	React.useEffect(() => {
		console.log("Location changed");
		verify();
	}, [location]);

	const verify = () => {
		setLoading(true);
		api
			.post("auth/verify", { user: getUser(), token: getToken() })
			.then((res) => {
				console.log(res);
				setLoading(false);
			})
			.catch((err) => {
				resetUserSession();
				setLoading(false);
				navigate("/login");
			});
	};

	return getToken ? (
		<div>
			<Layout>
				<div
					style={{
						zIndex: 999,
						top: 3,
						left: 8,
						height: "40px",
						position: "fixed",
						display: showButton ? "inline-block" : "none",
						color: "white",
						cursor: "pointer",
						fontSize: 18,
					}}
					onClick={() => setCollapsed(!collapsed)}
				>
					{collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
				</div>
				{showButton && (
					<Header
						style={{
							position: "absolute",
							display: "none",
						}}
					>
						<Menu theme="dark" mode="horizontal"></Menu>
					</Header>
				)}
				<Sider
					width={170}
					style={{
						overflow: "auto",
						height: "100%",
						position: "fixed",
						left: 0,
						zIndex: 998,
						backgroundColor: "#003049",
					}}
					breakpoint="lg"
					collapsed={collapsed}
					onCollapse={(val) => setCollapsed(val)}
					collapsedWidth={0}
					onBreakpoint={(val) => setShowButton(val)}
				>
					<div className="logo">
						<img src={Logo} height="45px" />
					</div>
					<Menu
						theme="dark"
						style={{ backgroundColor: "#003049" }}
						mode="inline"
						defaultSelectedKeys={[location.pathname]}
						onClick={(item) => navigate(item.key)}
					>
						<Menu.Item
							key="/"
							className="itemStyle"
							icon={<BarChartOutlined />}
						>
							Dashboard
						</Menu.Item>
						<Menu.Item
							key="/buildings"
							className="itemStyle"
							icon={<BankOutlined />}
						>
							Buildings
						</Menu.Item>
						<Menu.Item
							key="/notifications"
							className="itemStyle"
							icon={<BellOutlined />}
						>
							Notifications
						</Menu.Item>
					</Menu>
				</Sider>

				<Layout
					className="site-layout sidebar"
					style={{
						marginLeft: showButton ? 0 : 170,
						marginTop: 0,
					}}
				>
					<div
						className="pageHeader"
						style={{
							paddingLeft: showButton ? "35px" : "12px",
							width: "100%",
							display: "block",
						}}
					>
						{headings[location.pathname]}

						<label
							onClick={() => {
								resetUserSession();
								navigate("/login");
							}}
							style={{
								float: "right",
								paddingRight: "180px",
								cursor: "pointer",
								fontSize: "14px",
							}}
						>
							Logout
						</label>
						{getUser()?.role === "admin" ? (
							<div
								style={{
									float: "right",
									paddingRight: "20px",
									cursor: "pointer",
									fontSize: "14px",
								}}
								onClick={() => {
									navigate("/master");
								}}
							>
								<SettingOutlined />
							</div>
						) : null}
						<div
							style={{
								backgroundColor: "orange",
								width: `${pageLoading}%`,
								position: "relative",
								bottom: 0,
								left: "-13px",
								height: "15px",
							}}
						></div>
					</div>
					<Content
						style={{
							borderRadius: showButton ? "0" : "2px 0 0 0",
							overflow: "initial",
						}}
					>
						<div className="site-layout-background" style={{ padding: 24 }}>
							{loading ? (
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: "400px",
									}}
								>
									<LoadingOutlined />
								</div>
							) : (
								<div style={{}}>
									<Outlet context={[pageLoading, setPageLoading]} />
								</div>
							)}
						</div>
					</Content>
					<Footer style={{ textAlign: "center", backgroundColor: "#F7F7F7" }}>
						FIRELINK ©2022
					</Footer>
				</Layout>
			</Layout>
		</div>
	) : (
		<div
			style={{
				fontSize: "25px",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<LoadingOutlined />
			<Navigate to="/login" />
		</div>
	);
};

export default LayoutComponent;
