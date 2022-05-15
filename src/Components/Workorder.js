import Layout from "./Layout";
import { useEffect, useState } from "react";
import {
	Button,
	Row,
	Col,
	Input,
	Tabs,
	Card,
	Checkbox,
	Form,
	Select,
	Modal,
} from "antd";
import { DatePicker, Space } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const { TabPane } = Tabs;
const { Search } = Input;

const ids = [123, 234, 456];

const cardInfo = [
	{
		id: 123,
		type: "Asset Tagging",
		description: "Annual inspection, testing and maintenance.",
		buildingName: "Building ABX",
		BuildingType: "Commercial",
		map: { Lat: 564745, long: 6764764 },
	},
	{
		id: 234,
		type: "ITM",
		description: "Annual maintenance.",
		buildingName: "Building 234",
		BuildingType: "residence",
		map: { Lat: 564745, long: 6764764 },
	},
	{
		id: 456,
		type: "Asset Tagging",
		description: "Annual inspection, testing and maintenance.",
		buildingName: "Office ABX",
		BuildingType: "Commercial",
		map: { Lat: 564745, long: 6764764 },
	},
];

function onChange(date, dateString) {
	console.log(date, dateString);
}

export default function Workorder() {
	function callback(key) {
		console.log(key);
	}

	const getWorkOrderDetails = (id) => {
		let selectedworkorder = cardInfo.findIndex((x) => x.id === id);
		setSelectedworkorder(cardInfo[selectedworkorder]);
	};

	const [selectedworkorder, setSelectedworkorder] = useState(null);

	const onSelectworkorder = (id) => {
		getWorkOrderDetails(id);
	};

	const [filter, setfilter] = useState([]);
	const renderTabBar = (props, DefaultTabBar) => (
		<Sticky bottomOffset={80}>
			{({ style }) => (
				<DefaultTabBar
					{...props}
					className="site-custom-tab-bar"
					style={{ ...style }}
				/>
			)}
		</Sticky>
	);
	const onSearch = (value) => console.log(value);

	const options = [
		{ label: "ITM", value: "itm" },
		{ label: "Asset Tagging", value: "assettagging" },
	];
	return (
		<>
			<Row>
				<Col span={18}>
					<Row style={{ height: "100%" }}>
						<Col span={8} style={{ height: "100%" }}>
							<StickyContainer style={{ height: "100%" }}>
								<Tabs
									defaultActiveKey="1"
									onChange={callback}
									renderTabBar={renderTabBar}
								>
									<TabPane
										tab="Pending"
										key="1"
										styles={{ backgroundColor: "white" }}
									>
										<Search
											placeholder="Search by Workorder No., Type. etc..."
											onSearch={onSearch}
										/>
										{ids.map((workOrderid) => (
											<Card
												hoverable
												bordered={false}
												style={{
													cursor: "pointer",
													margin: "5px",
													backgroundColor: "#FAFAFA",
												}}
												onClick={() => onSelectworkorder(workOrderid)}
											>
												<p>{workOrderid}</p>
											</Card>
										))}
									</TabPane>
									<TabPane tab="Completed" key="2">
										Content of Tab Pane 2
									</TabPane>
								</Tabs>
							</StickyContainer>
						</Col>

						<Col span={16}>
							<Card
								title={selectedworkorder ? selectedworkorder.id : ""}
								bordered={false}
								style={{ marginLeft: "3px", height: "100%" }}
							>
								{selectedworkorder ? (
									<Row>
										<Col span={10}>
											<h4>Description</h4>
											<p>{selectedworkorder.description}</p>
											<p>
												Building Name: {selectedworkorder.buildingName}
												<br />
												Building Type: {selectedworkorder.BuildingType}
											</p>

											<MapContainer
												style={{ height: "150px" }}
												center={[51.505, -0.09]}
												zoom={13}
											>
												<TileLayer
													attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
													url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
												/>
												<Marker position={[51.505, -0.09]}>
													<Popup>
														A pretty CSS3 popup. <br /> Easily customizable.
													</Popup>
												</Marker>
											</MapContainer>

											<Button
												style={{ float: "centre" }}
												//icon={<PlusOutlined />}
												type="primary"
												//onClick={() => setWorkOrderModel(true)}
											>
												View Assets
											</Button>
										</Col>
										<Col span={14}></Col>
									</Row>
								) : (
									"Please Select a work order"
								)}
								{/* <p>{selectedworkorder}</p> */}
							</Card>
						</Col>
					</Row>
				</Col>
				<Col span={6} style={{ paddingLeft: "10px" }}>
					<Card title="Filters" bordered={false} style={{ marginLeft: "3px" }}>
						<Form
							labelCol={{ span: 6 }}
							wrapperCol={{ span: 18 }}
							layout="vertical"
						>
							<Form.Item>
								<Checkbox.Group style={{ width: "100%" }}>
									<Row>
										{options.map((option) => (
											<Col key={option.value} md={24} xs={24}>
												<Checkbox value={option.value}>{option.label}</Checkbox>
											</Col>
										))}
									</Row>
								</Checkbox.Group>
							</Form.Item>
							<Form.Item name="startdate" label="Start Date">
								<Space direction="vertical" style={{ width: "100%" }}>
									<DatePicker onChange={onChange} style={{ width: "100%" }} />
								</Space>
							</Form.Item>
							<Form.Item name="enddate" label="End Date">
								<Space direction="vertical" style={{ width: "100%" }}>
									<DatePicker onChange={onChange} style={{ width: "100%" }} />
								</Space>
							</Form.Item>
						</Form>
					</Card>
				</Col>
			</Row>
		</>
	);
}
