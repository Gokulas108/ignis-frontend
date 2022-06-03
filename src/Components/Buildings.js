import Layout from "./Layout";
import { useEffect, useState } from "react";
import { Table, Button, Row, Col, message, Modal, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddProperty from "./addProperty";
import ContractDetails from "./contractDetails";
import api from "../axiosConfig";
const { Search } = Input;

export default function Buildings() {
	const [data, setData] = useState([]);
	const [buildingLoading, setBuidlingLoading] = useState(false);
	const [assetLoading, setAssetLoading] = useState(false);
	const [asset, setAsset] = useState([]);
	const [renewal, setRenewal] = useState([]);

	useEffect(() => {
		getBuildingDetails();
	}, []);

	const getBuildingDetails = () => {
		setBuidlingLoading(true);
		setAssetLoading(true);
		api.get("/buildings").then((res) => {
			console.log(res);
			setData(res.data.message);
			setAsset(res.data.message);
			setBuidlingLoading(false);
			setAssetLoading(false);
		});
	};

	//forms
	const [buildingDetails, setBuildingDetails] = useState({});

	// const [isModalVisible, setIsModalVisible] = useState(false);
	const columns = [
		{
			title: "Ref No.",
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
			title: "Status",
			dataIndex: "zone_no",
			key: "zone_no",
			render: (text) => (
				<label style={{ color: "grey" }}>Pending approval</label>
			),
		},
	];
	const assetColumns = [
		{
			title: "Asset Tagging Required",
			dataIndex: "building_name",
			key: "building_name",
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
			title: "Upcoming Renewals",
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
	// const handleOk = () => {
	//   setIsModalVisible(false);
	// };

	// const handleCancel = () => {
	//   setIsModalVisible(false);
	// };
	const [isMainModel, setMainModel] = useState(false); // Add property modal
	const [isSubModel, setSubModel] = useState(false); // Contract details modal

	const onModalClick = () => {
		setMainModel(false);
		setSubModel(true);
	};

	const success = () => {
		message.success("Building added");
	};

	const onSearch = (value) => console.log(value);

	return (
		<>
			<Row>
				<Col span={18}>
					<Row style={{ marginBottom: 10 }}>
						<Col style={{ paddingTop: 5 }} span="12">
							<Search
								placeholder="Search by Name, Building No. etc..."
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
								Add new building
							</Button>
						</Col>
					</Row>

					<Table
						dataSource={data}
						columns={columns}
						loading={buildingLoading}
					/>
					<Modal
						title="Add a new building"
						visible={isMainModel}
						// onCancel={() => setMainModel(false)}
						zIndex={1000}
						footer={null}
						className="addNewBuildingModal"
					>
						<AddProperty
							onModalClick={onModalClick}
							setBuildingDetails={setBuildingDetails}
						/>
					</Modal>
					<Modal
						title="Contract Details"
						visible={isSubModel}
						// onOk={(e) => onSubModel(e, false)}
						onCancel={(e) => setSubModel(false)}
						zIndex={1000}
						footer={null}
						className="addNewBuildingModal"
					>
						<ContractDetails
							setSubModel={setSubModel}
							buildingDetails={buildingDetails}
							success={success}
							getBuildingDetails={getBuildingDetails}
						/>
					</Modal>
				</Col>
				<Col span={6} style={{ paddingLeft: "20px" }}>
					<Row>
						<Col span={24}>
							<Table
								dataSource={asset}
								columns={assetColumns}
								pagination={false}
								loading={assetLoading}
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
			</Row>
		</>
	);
}
