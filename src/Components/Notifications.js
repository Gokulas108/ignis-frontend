import Layout from "./Layout";
import { useEffect, useState } from "react";
import { Table, Button, Row, Col, Divider, Modal, Input, message } from "antd";
import {
	PlusOutlined,
	BellOutlined,
	FormOutlined,
	EyeOutlined,
	LoadingOutlined,
} from "@ant-design/icons";
import Createnewnotification from "./createnewnotification";
import Createworkorder from "./createworkorder";
import Createworkorder2 from "./createworkorder2";
import api from "../axiosConfig";
import { getUser } from "../Auth/Auth";

const { Search } = Input;

export default function Notifcation() {
	const [data, setData] = useState([]);
	const [asset, setAsset] = useState([]);
	const [notificationLoading, setNotificationLoading] = useState(false);
	const [selectedNotification, setSelectedNotification] = useState(null);
	const [buildingDetails, setBuildingDetails] = useState([]);
	const [buildingLoading, setBuidlingLoading] = useState(false);
	const [renewal, setRenewal] = useState([]);
	const [userType, setUserType] = useState(null);

	useEffect(() => {
		getNotificationsDetails();
		getBuildingDetails();
		const user = getUser();
		console.log(user);
		setUserType(user.role);
	}, []);

	const getNotificationsDetails = () => {
		setNotificationLoading(true);
		api
			.get("/notifications")
			.then((res) => {
				console.log(res);
				setData(res.data.message);
			})
			.catch((err) =>
				message.error("Error while fetching notification details!")
			)
			.finally(() => {
				setNotificationLoading(false);
			});
	};

	const getBuildingDetails = () => {
		setBuidlingLoading(true);
		api
			.get("/buildings")
			.then((res) => {
				console.log(res);
				setBuildingDetails(res.data.message);
			})
			.catch((err) => message.error("Error while fetching building details!"))
			.finally(() => {
				setBuidlingLoading(false);
			});
	};

	const columns = [
		{
			title: "Notification No.",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Building Name",
			dataIndex: "building_name",
			key: "building_name",
		},
		{
			title: "Type",
			dataIndex: "notification_type",
			key: "notification_type",
		},
		{
			title: "Reason",
			dataIndex: "reason",
			key: "reason",
			width: "40%",
		},
		{
			title: "Action",
			dataIndex: "id",
			key: "id",
			render: (text, record) =>
				userType === "engineer" ? (
					<Button
						style={{ float: "right" }}
						icon={<FormOutlined />}
						type="primary"
						onClick={() => setWorkOrderModel(true)}
					></Button>
				) : userType === "admin" ? (
					<Button
						icon={<EyeOutlined />}
						style={{ float: "right" }}
						type="primary"
						onClick={() => {
							setMainModel(true);
							setSelectedNotification(record);
						}}
					></Button>
				) : null,
		},
	];
	const assetColumns = [
		{
			title: "Asset Tagging Requests",
			dataIndex: "bldgNo",
			key: "bldgNo",
			colSpan: 2,
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			colSpan: 0,
			render: (text, row, index) => (
				<a style={{ float: "right" }}>{"View >"}</a>
			),
		},
	];
	const renewalColumns = [
		{
			title: "Recent Updates",
			dataIndex: "bldgNo",
			key: "bldgNo",
			colSpan: 2,
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			colSpan: 0,
			render: (text, row, index) => (
				<a style={{ float: "right" }}>{"View >"}</a>
			),
		},
	];

	const [isMainModel, setMainModel] = useState(false); // Create a new notification modal
	const [isWorkOrderModel, setWorkOrderModel] = useState(false); // Create Work order modal
	const [isWorkOrderModel2, setWorkOrderModel2] = useState(false);
	const [mainModalForm, setMainModalForm] = useState(null);

	const onModalClick = (success) => {
		setMainModel(false);
		if (success) {
			message.success("Notification created successfully");
			getNotificationsDetails();
		}
	};

	const onWorkOrderModalClick = () => {
		setWorkOrderModel(false);
		setWorkOrderModel2(true);
	};
	const onSearch = (value) => console.log(value);

	return (
		<>
			<Row>
				<Col span={18}>
					<Row style={{ marginBottom: 10 }}>
						<Col style={{ paddingTop: 5 }} span="12">
							<Search
								placeholder="Search by Notification No., Notification Type. etc..."
								onSearch={onSearch}
							/>
						</Col>

						<Col span="12">
							{userType === "admin" ? (
								<Button
									style={{ float: "right" }}
									icon={<PlusOutlined />}
									type="primary"
									onClick={() => setMainModel(true)}
								>
									Create Notification
								</Button>
							) : null}
						</Col>
					</Row>

					<Table
						dataSource={data}
						columns={columns}
						loading={notificationLoading}
					/>
					<Modal
						title="Create a new notification"
						visible={isMainModel}
						// onOk={() => setMainModel(false)}
						onCancel={() => {
							setMainModel(false);
							setSelectedNotification(null);
							mainModalForm.resetFields();
						}}
						zIndex={1000}
						footer={null}
						className="addNewBuildingModal"
					>
						{buildingLoading ? (
							<LoadingOutlined />
						) : (
							<Createnewnotification
								key={selectedNotification?.id || 0}
								buildingDetails={buildingDetails}
								onModalClick={onModalClick}
								selectedNotification={selectedNotification}
								setMainModalForm={setMainModalForm}
							/>
						)}
					</Modal>
					<br />
				</Col>
				<Col span={6} style={{ paddingLeft: "20px" }}>
					<Row>
						<Col span={24}>
							<Table
								dataSource={asset}
								columns={assetColumns}
								pagination={false}
							/>
						</Col>
					</Row>
					<br />
					<Row>
						<Col span={24}>
							<Table
								dataSource={renewal}
								columns={renewalColumns}
								pagination={false}
							/>
						</Col>
					</Row>
				</Col>
				<Modal
					title="Create Work Order"
					visible={isWorkOrderModel}
					// onOk={() => setMainModel(false)}
					onCancel={() => setWorkOrderModel(false)}
					zIndex={1000}
					footer={null}
					className="addNewBuildingModal"
				>
					<Createworkorder onWorkOrderModalClick={onWorkOrderModalClick} />
				</Modal>

				<Modal
					title="Create Work Order"
					visible={isWorkOrderModel2}
					// onOk={() => setMainModel(false)}
					//onCancel={() => setMainModel(false)}
					zIndex={1000}
					footer={null}
					className="addNewBuildingModal"
				>
					<Createworkorder2 setWorkOrderModel2={setWorkOrderModel2} />
				</Modal>
			</Row>
		</>
	);
}
