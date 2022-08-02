import Layout from "./Layout";
import { useEffect, useState } from "react";
import { Table, Button, Row, Col, message, Modal, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddProperty from "./addProperty";
import ContractDetails from "./contractDetails";
import { LoadingOutlined } from "@ant-design/icons";
import api from "../axiosConfig";
import { useOutletContext } from "react-router-dom";
const { Search } = Input;

export default function Buildings() {
	const [pageLoading, setPageLoading] = useOutletContext();
	const [data, setData] = useState([]);
	const [addPropertyForm, setAddPropertyForm] = useState(null);
	const [contractDetails, setContractDetails] = useState(null);
	const [buildingLoading, setBuidlingLoading] = useState(false);
	const [assetLoading, setAssetLoading] = useState(false);
	const [asset, setAsset] = useState([]);
	const [renewal, setRenewal] = useState([]);
	const [renewalLoading, setRenewalLoading] = useState(false);
	const [selectedBuilding, setSelectedBuilding] = useState(null);
	const [addPropertyLoading, setAddPropertyLoading] = useState(false);
	const [contractDetailsLoading, setContractDetailsLoading] = useState(false);
	const [contractType, setContractType] = useState([]);
	const [requiredFields, setRequiredFields] = useState({
		building_name: true,
		region: true,
		time_zone: true,
		jurisdiction: true,
		building_no: true,
		street_no: true,
		zone_no: true,
		// unit_no: true,
		building_area: true,
		occupancy_classification: true,
		hazard_classification: true,
		building_completion_certificate_number: true,
		contact_number: true,
		building_height: true,
		type_of_construction: true,
		owner: true,
		contract_number: true,
		contract_type: true,
	});
	useEffect(() => {
		getBuildingDetails();
		console.log("useEffect running");
	}, []);

	const getBuildingDetails = () => {
		setPageLoading(0);
		setBuidlingLoading(true);
		setAssetLoading(true);
		setRenewalLoading(true);
		api
			.get("/buildings", {
				onDownloadProgress: (progressEvent) => {
					const total = parseFloat(progressEvent.total);
					const current = parseFloat(progressEvent.loaded);

					let percentCompleted = Math.floor((current / total) * 100);
					setPageLoading(percentCompleted);
					console.log("completed: ", percentCompleted);
				},
			})
			.then((res) => {
				console.log(res);
				setData(res.data.message);
				setAsset(res.data.message);
				setBuidlingLoading(false);
				setAssetLoading(false);
				setRenewalLoading(false);
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
				<label style={{ color: "grey" }}>Asset Tagging Pending</label>
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
		setContractDetailsLoading(true);
		setSubModel(true);
		setTimeout(() => {
			setContractDetailsLoading(false);
		}, 1000);
	};

	const success = () => {
		message.success("Building added");
	};

	const errorMessage = (string) => {
		message.error(string);
	};

	const onSearch = (value) => console.log(value);

	const initializingForm = (data) => {
		setSelectedBuilding(data);
		addPropertyForm?.resetFields();
		contractDetails?.form.resetFields();
		// contractDetails?.resetTable();
		setMainModel(true);
		setAddPropertyLoading(true);
		setTimeout(() => {
			setAddPropertyLoading(false);
		}, 1000);
	};

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
								onClick={() => {
									initializingForm(null);
								}}
							>
								Add new building
							</Button>
						</Col>
					</Row>

					<Table
						dataSource={data}
						onRow={(record, index) => {
							return {
								onClick: (event) => {
									initializingForm(record);
								},
							};
						}}
						columns={columns}
						loading={buildingLoading}
					/>
					<Modal
						title="Add a new building"
						visible={isMainModel}
						onCancel={() => {
							addPropertyForm.resetFields();
							contractDetails?.form?.resetFields();
							// contractDetails?.resetTable();
							setMainModel(false);
							setSelectedBuilding(null);
						}}
						zIndex={1000}
						footer={null}
						className="addNewBuildingModal"
					>
						{addPropertyLoading ? (
							<div
								style={{
									fontSize: "25px",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<LoadingOutlined />
							</div>
						) : (
							<AddProperty
								onModalClick={onModalClick}
								setBuildingDetails={setBuildingDetails}
								selectedBuilding={selectedBuilding}
								setAddPropertyForm={setAddPropertyForm}
								setContractType={setContractType}
								setRequiredFields={setRequiredFields}
							/>
						)}
					</Modal>
					<Modal
						title="Contract Details"
						visible={isSubModel}
						// onOk={(e) => onSubModel(e, false)}
						onCancel={(e) => {
							addPropertyForm?.resetFields();
							contractDetails?.form?.resetFields();
							// contractDetails?.resetTable();
							setSubModel(false);
							setSelectedBuilding(null);
						}}
						zIndex={1000}
						footer={null}
						className="addNewBuildingModal"
					>
						{contractDetailsLoading ? (
							<div
								style={{
									fontSize: "25px",
									display: "flex",
									justifyContent: "center",
								}}
							>
								<LoadingOutlined />
							</div>
						) : (
							<ContractDetails
								setSubModel={setSubModel}
								buildingDetails={buildingDetails}
								success={success}
								getBuildingDetails={getBuildingDetails}
								selectedBuilding={selectedBuilding}
								setContractDetails={setContractDetails}
								errorMessage={errorMessage}
								contractType={contractType}
								requiredFields={requiredFields}
							/>
						)}
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
								loading={renewalLoading}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
}
