import { Form, Input, Button, Checkbox, Select, Radio } from "antd";
import { Row, Col, Divider, Popover, message } from "antd";
import axios from "axios";
import api from "../axiosConfig";
import { useEffect, useState, useRef } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const { Option } = Select;

export default function AddProperty(props) {
	const [displayMap, setDisplayMap] = useState(false);
	const [isLoadingMap, setLoadingMap] = useState(false);
	const [coordinates, setCoordinates] = useState({ lat: 0, long: 0 });
	const [occupancies, setOccupancies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [visible, setVisible] = useState(false);
	const [hazardPopover, setHazardPopover] = useState(false);
	const [popoverLoading, setPopoverLoading] = useState(false);
	const [newOccupancyClassification, setNewOccupancyClassification] =
		useState("");
	const [hazardClassification, setHazardClassification] = useState([]);
	const [newHazardClassification, setNewHazardClassification] = useState("");

	const handleVisibleChange = (newVisible) => {
		setVisible(newVisible);
	};

	const addNewOccupancy = () => {
		setPopoverLoading(true);
		let new_value = newOccupancyClassification;
		api.post("/dropdown/occupancyClassification", { new_value }).then((res) => {
			if (res.status === 200) {
				getOccupanciesClassification();
				setVisible(false);
				setNewOccupancyClassification("");
				message.success(
					"Added New value for dropdown 'Occupancy Classification'"
				);
			} else {
				message.error("Error!");
			}
			setPopoverLoading(false);
		});
	};

	const addNewHazard = () => {
		setPopoverLoading(true);
		let new_value = newHazardClassification;
		api.post("/dropdown/hazardClassification", { new_value }).then((res) => {
			if (res.status === 200) {
				getHazardClassification();
				setHazardPopover(false);
				setNewHazardClassification("");
				message.success("Added New value for dropdown 'Hazard Classification'");
			} else {
				message.error("Error!");
			}
			setPopoverLoading(false);
		});
	};

	const getOccupanciesClassification = () => {
		api.get("/dropdown/occupancyClassification").then((res) => {
			if (res.status === 200) {
				setOccupancies(res.data.message);
			}
		});
	};

	const getHazardClassification = () => {
		api.get("/dropdown/hazardClassification").then((res) => {
			if (res.status === 200) {
				setHazardClassification(res.data.message);
			}
		});
	};

	const getAllDropdowns = () => {
		api.get("/dropdown/dropdownAll").then((res) => {
			if (res.status === 200) {
				setOccupancies(res.data.message.occupancyClassification);
				setHazardClassification(res.data.message.hazardClassification);
				setLoading(false);
			}
		});
	};

	useEffect(() => {
		getAllDropdowns();
	}, []);

	const [form] = Form.useForm();

	const ahjOptions = [
		{ label: "QCDD", value: 1 },
		// { label: "UAE", value: 3 },
		{ label: "NFPA", value: 2 },
		// {
		// 	label: "KSA",
		// 	value: 4,
		// },
		// { label: "Others", value: 5 },
	];
	const options = [
		{
			label: "I - Automatic Sprinkler",
			value: { label: "Automatic Sprinkler", value: "automaticSprinkler" },
		},
		{
			label: "II - Fire Pump",
			value: { label: "Fire Pump", value: "firePump" },
		},
		{
			label: "III - Water Supply System",
			value: { label: "Water Supply System", value: "waterSupplySystem" },
		},
		{
			label: "IV - Standpipe and Hose System",
			value: {
				label: "Standpipe and Hose System",
				value: "standpipeAndHoseSystem",
			},
		},
		{
			label: "V - Fire Hydrants",
			value: { label: "Fire Hydrants", value: "fireHydrants" },
		},
		{
			label: "VI - Water Mist System",
			value: { label: "Water Mist System", value: "waterMistSystem" },
		},
		{
			label: "VII - Foam System",
			value: { label: "Foam System", value: "foamSystem" },
		},
		{
			label: "VIII - Fixed Wet Chemical Extinguishing System",
			value: {
				label: "Fixed Wet Chemical Extinguishing System",
				value: "fixedWetChemicalExtinguishingSystem",
			},
		},
		{
			label: "IX - Clean Agent Fire Extinguishing System",
			value: {
				label: "Clean Agent Fire Extinguishing System",
				value: "cleanAgentFireExtinguishingSystem",
			},
		},
		{
			label: "X - Fixed Aerosol System",
			value: { label: "Fixed Aerosol System", value: "fixedAerosoleSystem" },
		},
		{
			label: "XI - Portable Fire Extinguisher",
			value: {
				label: "Portable Fire Extinguisher",
				value: "portableFireExtinguisher",
			},
		},
		{
			label: "XII - Fire Detection And Alarm System",
			value: {
				label: "Fire Detection And Alarm System",
				value: "fireDetectionAndAlarmSystem",
			},
		},
		{
			label: "XIII - Emergency Lighting & EPSS",
			value: {
				label: "Emergency Lighting & EPSS",
				value: "emergencyLightingEPSS",
			},
		},
		{ label: "XV - Others", value: { label: "Others", value: "others" } },
	];

	const onFinish = (values) => {
		console.log("Success:", values);
		props.setBuildingDetails(values);
		props.onModalClick();
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<>
			{loading ? (
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
				<Form
					form={form}
					name="basic"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					labelCol={{ span: 24, style: { paddingTop: 3 } }}
					wrapperCol={{ span: 24 }}
					size="small"
					initialValues={{
						metrics: "feet",
						occupancy_classification: occupancies ? occupancies[0].id : "",
						hazard_classification: hazardClassification
							? hazardClassification[0].id
							: "",
						time_zone: 1,
						region: "Qatar",
						jurisdiction: 1,
					}}
					onValuesChange={(changedValues, allValues) => {
						console.log(changedValues);
						console.log(allValues);
						if (
							changedValues.building_no ||
							changedValues.street_no ||
							changedValues.zone_no
						)
							if (
								allValues.building_no &&
								allValues.zone_no &&
								allValues.street_no
							)
								console.log(true);
						axios
							.post(
								`https://services.gisqatar.org.qa/server/rest/services/Vector/QARS1/MapServer/0/query?f=json&where=ZONE_NO%20%3D${allValues.zone_no}%20and%20STREET_NO%3D${allValues.street_no}%20and%20BUILDING_NO%3D${allValues.building_no}&returnGeometry=true&spatialRel=esriSpatialRelIntersects&outFields=ZONE_NO%2CSTREET_NO%2CBUILDING_NO%2CQARS%2CELECTRICITY_NO%2CWATER_NO%2CQTEL_ID`
							)
							.then((res) => {
								let x = res.data.features[0].geometry.x;
								let y = res.data.features[0].geometry.y;
								console.log(x, y);
								setLoadingMap(true);
								api
									.post(`/coordinates`, { coordinates: { x, y } })
									.then((res) => {
										// console.log(res);
										setLoadingMap(false);
										console.log("lat :", res.data.message.y);
										let lat = res.data.message.y;
										let long = res.data.message.x;
										console.log("Long : ", res.data.message.x);
										setCoordinates({ lat, long });
										setDisplayMap(true);
									})
									.catch((res) => {
										setDisplayMap(false);
										setLoadingMap(false);
									});
							})
							.catch((res) => {
								setDisplayMap(false);
								setLoadingMap(false);
							});
					}}
				>
					<Row>
						<Col md={12} xs={24}>
							<Row>
								<Col md={24} xs={24} style={{ paddingLeft: "10px" }}>
									<Form.Item
										label="Building Name"
										name="building_name"
										rules={[
											{
												required: true,
												message: "Please enter the building name",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col
									md={12}
									xs={24}
									style={{ paddingLeft: "10px", paddingRight: "10px" }}
								>
									<Form.Item
										label="Region"
										name="region"
										rules={[
											{
												required: true,
												message: "Please select a region",
											},
										]}
									>
										<Select defaultValue="Qatar">
											<Option value="Qatar">Qatar</Option>
											<Option value="India">India</Option>
										</Select>
									</Form.Item>{" "}
								</Col>
								<Col md={12} xs={24}>
									<Form.Item
										label="Time Zone"
										name="time_zone"
										rules={[
											{
												required: true,
												message: "Please select a time zone",
											},
										]}
									>
										<Select defaultValue="AST">
											<Option value={1}>AST</Option>
											<Option value={2}>IST</Option>
											<Option value={3}>GMT</Option>
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Form.Item
								name="jurisdiction"
								label="Jurisdiction"
								rules={[
									{
										required: true,
										message: "Please select the jurisdiction",
									},
								]}
								style={{ paddingLeft: "10px" }}
							>
								<Radio.Group style={{ width: "100%" }} defaultValue={1}>
									<Row>
										{ahjOptions.map((option) => (
											<Col key={option.value} md={12} xs={24}>
												<Radio value={option.value}>{option.label}</Radio>
											</Col>
										))}
									</Row>
								</Radio.Group>
							</Form.Item>
							<Row>
								<Col md={6} xs={6} style={{ paddingLeft: "10px" }}>
									<Form.Item
										label="Bldg. No."
										name="building_no"
										rules={[
											{
												required: true,
												message: "Please enter the building No. ",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col md={6} xs={6} style={{ paddingLeft: "10px" }}>
									<Form.Item
										label="Street No."
										name="street_no"
										rules={[
											{
												required: true,
												message: "Please enter the street No.",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col md={6} xs={6} style={{ paddingLeft: "10px" }}>
									<Form.Item
										label="Zone No."
										name="zone_no"
										rules={[
											{
												required: true,
												message: "Please enter the zone No.",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col md={6} xs={6} style={{ paddingLeft: "10px" }}>
									<Form.Item
										label="Unit No."
										name="unit_no"
										rules={[
											{
												required: false,
												message: "",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col span={24} style={{ paddingLeft: "10px" }}>
									<Form.Item
										label="Building Area"
										name="building_area"
										rules={[
											{
												required: true,
												message: "Please enter the building area",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
							</Row>
						</Col>

						<Col md={12} xs={24}>
							<div
								style={{
									width: "100%",
									height: "90%",
									paddingLeft: "10px",
								}}
							>
								{displayMap ? (
									<MapContainer
										style={{
											height: "100%",
											borderRadius: "10px",
										}}
										center={[coordinates.lat, coordinates.long]}
										zoom={14}
									>
										<TileLayer
											attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
											url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
										/>
										<Marker position={[coordinates.lat, coordinates.long]}>
											<Popup>
												A pretty CSS3 popup. <br /> Easily customizable.
											</Popup>
										</Marker>
									</MapContainer>
								) : (
									<div
										style={{
											width: "100%",
											height: "100%",
											backgroundColor: "#F7F7F7",
											borderRadius: "10px",
											fontSize: "25px",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}
									>
										{" "}
										{isLoadingMap && <LoadingOutlined />}{" "}
									</div>
								)}
							</div>
						</Col>
					</Row>

					<Row>
						<Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
							<Row>
								<Col md={22} xs={22}>
									<Form.Item
										label="Occupancy Classification"
										name="occupancy_classification"
										rules={[
											{
												required: true,
												message: "Please enter the occupancy classification",
											},
										]}
									>
										<Select>
											{occupancies.map((item) => (
												<Option value={item.id}>{item.value}</Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								<Col span={2}>
									<Popover
										content={
											<>
												<Input
													value={newOccupancyClassification}
													onChange={(e) =>
														setNewOccupancyClassification(e.target.value)
													}
												/>
												<br />
												{popoverLoading ? (
													<div
														className="popover-button"
														style={{
															color: "gray",
															cursor: "unset",
															alignItems: "baseline",
														}}
													>
														<LoadingOutlined /> &nbsp; Adding...
													</div>
												) : (
													<div
														onClick={() => addNewOccupancy()}
														className="popover-button"
													>
														Add
													</div>
												)}
											</>
										}
										title="Add new Classification"
										trigger="click"
										visible={visible}
										onVisibleChange={handleVisibleChange}
									>
										<Button
											type="text"
											style={{
												margin: "23px 0 0 0",
												fontSize: "17px",
												color: "green",
												padding: 1,
												paddingLeft: 4,
											}}
										>
											+
										</Button>
									</Popover>
									<Popover
										content={
											<>
												<Input
													value={newOccupancyClassification}
													onChange={(e) =>
														setNewOccupancyClassification(e.target.value)
													}
												/>
												<br />
												{popoverLoading ? (
													<div
														className="popover-button"
														style={{
															color: "gray",
															cursor: "unset",
															alignItems: "baseline",
														}}
													>
														<LoadingOutlined /> &nbsp; Adding...
													</div>
												) : (
													<div
														onClick={() => addNewOccupancy()}
														className="popover-button"
													>
														Add
													</div>
												)}
											</>
										}
										title="Add new Classification"
										trigger="click"
										visible={false}
										onVisibleChange={{}}
									>
										<Button
											type="text"
											style={{
												margin: "23px 0 0 0",
												fontSize: "17px",
												color: "red",
												padding: 1,
											}}
										>
											-
										</Button>
									</Popover>
								</Col>
							</Row>
						</Col>
						<Col md={11} xs={22} style={{ paddingLeft: "10px" }}>
							<Form.Item
								label="Hazard Classification"
								name="hazard_classification"
								rules={[
									{
										required: true,
										message: "Please enter the hazard classification",
									},
								]}
							>
								<Select>
									{hazardClassification.map((item) => (
										<Option value={item.id}>{item.value}</Option>
									))}
								</Select>
							</Form.Item>
						</Col>
						<Col md={1} xs={2}>
							<Popover
								content={
									<>
										<Input
											value={newHazardClassification}
											onChange={(e) =>
												setNewHazardClassification(e.target.value)
											}
										/>
										<br />
										{popoverLoading ? (
											<div
												className="popover-button"
												style={{
													color: "gray",
													cursor: "unset",
													alignItems: "baseline",
												}}
											>
												<LoadingOutlined /> &nbsp; Adding...
											</div>
										) : (
											<div
												onClick={() => addNewHazard()}
												className="popover-button"
											>
												Add
											</div>
										)}
									</>
								}
								title="Add new Classification"
								trigger="click"
								visible={hazardPopover}
								onVisibleChange={(value) => setHazardPopover(value)}
							>
								<Button
									type="text"
									style={{
										margin: "23px 0 0 0",
										fontSize: "17px",
										color: "green",
										padding: 1,
										paddingLeft: 4,
									}}
								>
									+
								</Button>
							</Popover>
							<Popover
								content={
									<>
										<Input
											value={newOccupancyClassification}
											onChange={(e) =>
												setNewOccupancyClassification(e.target.value)
											}
										/>
										<br />
										{popoverLoading ? (
											<div
												className="popover-button"
												style={{
													color: "gray",
													cursor: "unset",
													alignItems: "baseline",
												}}
											>
												<LoadingOutlined /> &nbsp; Adding...
											</div>
										) : (
											<div
												onClick={() => addNewOccupancy()}
												className="popover-button"
											>
												Add
											</div>
										)}
									</>
								}
								title="Add new Classification"
								trigger="click"
								visible={false}
								onVisibleChange={{}}
							>
								<Button
									type="text"
									style={{
										margin: "23px 0 0 0",
										fontSize: "17px",
										color: "red",
										padding: 1,
									}}
								>
									-
								</Button>
							</Popover>
						</Col>
					</Row>

					<Row>
						<Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
							<Form.Item
								label="AHJ Building Completion Certificate No"
								name="building_completion_certificate_number"
								rules={[
									{
										required: true,
										message:
											"Please enter the QCD Building Completion Certificate No",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
							<Form.Item
								label="Office Contact Nos"
								name="contact_number"
								rules={[
									{
										required: true,
										message: "Please enter the office contact number",
									},
								]}
							>
								<Input type="number" />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col md={12} xs={24}>
							<Row>
								<Col md={16} xs={18} style={{ paddingLeft: "10px" }}>
									<Form.Item
										label="Building Height"
										name="building_height"
										rules={[
											{
												required: true,
												message: "Please enter the building height",
											},
										]}
									>
										<Input />
									</Form.Item>
								</Col>
								<Col md={8} xs={6}>
									<Form.Item
										name="metrics"
										label="."
										rules={[{ required: false }]}
									>
										<Select defaultValue="feet">
											<Option value="feet">feet</Option>
											<Option value="meters">meters</Option>
										</Select>
									</Form.Item>
								</Col>
							</Row>
						</Col>
						<Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
							<Form.Item
								label="Type of Construction"
								name="type_of_construction"
								rules={[
									{
										required: true,
										message: "Please enter the type of construction",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>

					<Row>
						<Col style={{ paddingLeft: "10px" }}>
							<Form.Item
								name="fire_protection_systems"
								label="Fire Protection Systems"
								rules={[
									{
										required: true,
										message: "Please select the fire protection systems",
									},
								]}
							>
								<Checkbox.Group style={{ width: "100%" }}>
									<Row>
										{options.map((option) => (
											<Col key={option.value} md={12} xs={24}>
												<Checkbox value={option.value}>{option.label}</Checkbox>
											</Col>
										))}
									</Row>
								</Checkbox.Group>
							</Form.Item>
						</Col>
					</Row>
					<Divider />

					<Row>
						<Col md={6} xs={0} style={{ paddingLeft: "10px" }} />
						<Col md={6} xs={12} style={{ paddingLeft: "10px" }}>
							<Button size="middle" block type="primary" htmlType="submit">
								Next
							</Button>
						</Col>
						<Col md={6} xs={12} style={{ paddingLeft: "10px" }}>
							<Button size="middle" block htmlType="button" onClick={onReset}>
								Reset
							</Button>
						</Col>
						<Col md={6} xs={0} style={{ paddingLeft: "10px" }} />
					</Row>
				</Form>
			)}
		</>
	);
}
