import Layout from "./Layout";
import { useEffect, useState } from "react";
import { Table, Button, Row, Col, Divider, Modal, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Createnewnotification from "./createnewnotification";
import Createworkorder from "./createworkorder";
import Createworkorder2 from "./createworkorder2";
import api from "../axiosConfig";

const { Search } = Input;

export default function Buildings() {
	const [data, setData] = useState([]);
	const [asset, setAsset] = useState([]);
	const [buildingLoading, setBuidlingLoading] = useState(false);
	const [renewal, setRenewal] = useState([]);

	useEffect(() => {
		getBuildingDetails();
	}, []);

	const getBuildingDetails = () => {
		setBuidlingLoading(true);
		// setAssetLoading(true);
		api.get("/buildings").then((res) => {
			console.log(res);
			setData(res.data.message);
			// setAsset(res.data.message);
			setBuidlingLoading(false);
			// setAssetLoading(false);
		});
	};

	const columns = [
		{
			title: "Notification No.",
			dataIndex: "id",
			key: "id",
		},
		{
			title: "Building No.",
			dataIndex: "building_no",
			key: "building_no",
		},
		{
			title: "Building Name",
			dataIndex: "building_name",
			key: "building_name",
		},
		{
			title: "Type",
			dataIndex: "zone_no",
			key: "zone_no",
			render: (text) => <label>Asset tagging</label>,
		},
		{
			title: "Action",
			dataIndex: "zone_no",
			key: "zone_no",
			render: (text) => (
				<Button
					style={{ float: "right" }}
					icon={<PlusOutlined />}
					type="primary"
					onClick={() => setWorkOrderModel(true)}
				>
					Create Work Order
				</Button>
			),
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

	const onModalClick = () => {
		setMainModel(false);
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
							<Button
								style={{ float: "right" }}
								icon={<PlusOutlined />}
								type="primary"
								onClick={() => setMainModel(true)}
							>
								Create Notification
							</Button>
						</Col>
					</Row>

					<Table
						dataSource={data}
						columns={columns}
						loading={buildingLoading}
					/>
					<Modal
						title="Create a new notification"
						visible={isMainModel}
						// onOk={() => setMainModel(false)}
						onCancel={() => setMainModel(false)}
						zIndex={1000}
						footer={null}
						className="addNewBuildingModal"
					>
						<Createnewnotification onModalClick={onModalClick} />
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
