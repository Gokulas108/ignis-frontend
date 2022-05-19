import React from "react";
import { Layout, Menu } from "antd";
import { useState } from "react";
import Logo from "../Assets/Logo.png";
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
} from "@ant-design/icons";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const headings = {
	"/": "Dashboard",
	"/buildings": "Buildings",
	"/workorder": "Work Orders",
	"/notifications": "Notifications",
};

React.useLayoutEffect = React.useEffect;

const LayoutComponent = () => {
	const [collapsed, setCollapsed] = useState(true);
	const [showButton, setShowButton] = useState(false);

	let navigate = useNavigate();
	let location = useLocation();

	return (
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
						{/* <Menu.Item key="3" icon={<ApiOutlined />}>
              Assets
            </Menu.Item> */}
						<Menu.Item
							key="/notifications"
							className="itemStyle"
							icon={<BellOutlined />}
						>
							Notifications
						</Menu.Item>
						<Menu.Item
							key="/workorder"
							className="itemStyle"
							icon={<ReconciliationOutlined />}
						>
							Work Orders
						</Menu.Item>
						<Menu.Item
							key="6"
							className="itemStyle"
							icon={<CalendarOutlined />}
						>
							Schedule
						</Menu.Item>
						<Menu.Item key="7" className="itemStyle" icon={<FormOutlined />}>
							Reports
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
					{/* <div className="topBar">
            {" "}
            <CommentOutlined />
          </div> */}
					<div
						className="pageHeader"
						style={{ paddingLeft: showButton ? "35px" : "12px" }}
					>
						{headings[location.pathname]}
					</div>
					<Content
						style={{
							borderRadius: showButton ? "0" : "2px 0 0 0",
							overflow: "initial",
						}}
					>
						<div className="site-layout-background" style={{ padding: 24 }}>
							<Outlet />
						</div>
					</Content>
					<Footer style={{ textAlign: "center", backgroundColor: "#F7F7F7" }}>
						FIRELINK ©2022
					</Footer>
				</Layout>
			</Layout>
		</div>
	);
};

export default LayoutComponent;
