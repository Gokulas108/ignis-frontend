import Layout from "./Layout";
import { useEffect, useState } from "react";
import { Table, Button, Row, Col, message, Modal, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddProperty from "./addProperty";
import ContractDetails from "./contractDetails";
const { Search } = Input;

export default function Buildings() {
	const [data, setData] = useState([]);
	const [asset, setAsset] = useState([]);
	const [renewal, setRenewal] = useState([]);

	//forms
	const [buildingDetails, setBuildingDetails] = useState({});

	// const [isModalVisible, setIsModalVisible] = useState(false);
	const columns = [
		{
			title: "Ref No.",
			dataIndex: "pfid",
			key: "pfid",
		},
		{
			title: "Building No.",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Building Name",
			dataIndex: "site",
			key: "site",
		},
		{
			title: "Status",
			dataIndex: "timestamp",
			key: "timestamp",
		},
	];
	const assetColumns = [
		{
			title: "Asset Tagging Required",
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

					<Table dataSource={data} columns={columns} />
					<Modal
						title="Add a new building"
						visible={isMainModel}
						// onOk={() => setMainModel(false)}
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
