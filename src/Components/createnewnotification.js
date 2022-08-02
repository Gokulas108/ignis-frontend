import { Form, Input, Select, Button, message } from "antd";
import { Row, Col, Divider, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import api from "../axiosConfig";

const { Option } = Select;

const options = [
	{
		id: 1,
		label: "Select All",
		value: { label: "Select All", value: "selectall" },
	},
	{
		id: 2,
		label: "II - Fire Pump",
		value: { label: "Fire Pump", value: "firePump" },
	},
	{
		id: 3,
		label: "III - Water Supply System",
		value: { label: "Water Supply System", value: "waterSupplySystem" },
	},
	{
		id: 4,
		label: "IV - Standpipe and Hose System",
		value: {
			label: "Standpipe and Hose System",
			value: "standpipeAndHoseSystem",
		},
	},
	{
		id: 5,
		label: "V - Fire Hydrants",
		value: { label: "Fire Hydrants", value: "fireHydrants" },
	},
];

export default function CreatenewNotification(props) {
	const [form] = Form.useForm();
	const [addLoading, setLoading] = useState(false);
	const [selectedNotification, setSelectedNotification] = useState(null);
	const [formLoading, setFormLoading] = useState(false);

	const onFinish = (values) => {
		setLoading(true);
		let fps = [];
		for (let i in values.fire_protection_systems) {
			fps.push(
				buildingSelected.fire_protection_systems.find(
					(x) => x.value === values.fire_protection_systems[i]
				)
			);
		}
		values["fire_protection_systems"] = fps;
		console.log("Success:", values);
		api
			.post("/notifications", { notification: values })
			.then((res) => {
				console.log(res);
				form.resetFields();
				setBuildingSelected({});
				props.onModalClick(true);
			})
			.catch((err) => message.error("Error adding Notification"))
			.finally(() => {
				setLoading(false);
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const onReset = () => {
		form.resetFields();
	};

	useEffect(() => {
		console.log(buildingSelected);
		props.setMainModalForm(form);
		setBuildingSelected({});
	}, []);

	useEffect(() => {
		form.resetFields();
		console.log(props.selectedNotification);
		if (!props.selectedNotification) {
			setSelectedNotification(null);
		} else {
			setSelectedNotification(props.selectedNotification);
		}
		setBuildingSelected({});
		setFormLoading(true);
		setTimeout(() => {
			setFormLoading(false);
		}, 1000);
	}, [props.selectedNotification]);

	const [buildingSelected, setBuildingSelected] = useState({});

	const { TextArea } = Input;
	return formLoading ? (
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
			name="createnewnotification"
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			initialValues={
				selectedNotification
					? selectedNotification
					: {
							notification_type: "Corrective",
					  }
			}
			autoComplete="off"
			onValuesChange={(changedValues, allValues) => {
				if (changedValues.building_id) {
					setBuildingSelected(
						props.buildingDetails.find(
							(x) => x.id === changedValues.building_id
						)
					);
				}
			}}
			labelCol={{ span: 24, style: { paddingTop: 3 } }}
			wrapperCol={{ span: 24 }}
			size="small"
		>
			<Row>
				<Col md={12} xs={24}>
					<Form.Item
						name="building_id"
						label="Select a building"
						rules={[{ required: true }]}
					>
						<Select disabled={selectedNotification}>
							{props.buildingDetails.map((building) => (
								<Option value={building.id}>{building.building_name}</Option>
							))}
						</Select>
					</Form.Item>
				</Col>

				<Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
					<Form.Item
						name="notification_type"
						label="Notification Type"
						rules={[{ required: true, message: "Notifcation Type required" }]}
					>
						<Select disabled={selectedNotification}>
							{/* <Option value="Preventive"> Preventive</Option> */}
							<Option value="Corrective">Corrective</Option>
							<Option value="Preventive">Preventive</Option>
							<Option value="Asset Tagging">Asset Tagging</Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			{buildingSelected?.fire_protection_systems ? (
				<Form.Item
					name="fire_protection_systems"
					label="Select the systems : "
					rules={[{ required: true, message: "Select atleast one system" }]}
				>
					<Checkbox.Group
						disabled={selectedNotification}
						style={{ width: "100%" }}
					>
						<Row>
							{buildingSelected.fire_protection_systems?.map(
								(option, index) => (
									<Col key={index} md={12} xs={24}>
										<Checkbox value={option.value}>{option.label}</Checkbox>
									</Col>
								)
							)}
						</Row>
					</Checkbox.Group>
				</Form.Item>
			) : selectedNotification?.fire_protection_systems ? (
				<>
					<h4>Systems : </h4>
					<ul>
						{selectedNotification.fire_protection_systems.map((sys) => (
							<li>{sys.label}</li>
						))}
					</ul>
				</>
			) : null}
			<Row>
				<Col span={24}>
					<Form.Item
						name="reason"
						label="Reason"
						rules={[{ required: false, message: "Select atleast one system" }]}
					>
						<TextArea
							disabled={selectedNotification}
							autoSize={{ minRows: 3 }}
						/>
					</Form.Item>
				</Col>
			</Row>
			<Divider />
			{!selectedNotification ? (
				<Row>
					<Col md={6} xs={0} style={{ paddingLeft: "10px" }} />
					<Col md={6} xs={12} style={{ paddingLeft: "10px" }}>
						<Button
							size="middle"
							block
							type="primary"
							htmlType="submit"
							loading={addLoading}
						>
							Add
						</Button>
					</Col>
					<Col md={6} xs={12} style={{ paddingLeft: "10px" }}>
						<Button size="middle" block htmlType="button" onClick={onReset}>
							Reset
						</Button>
					</Col>
					<Col md={6} xs={0} style={{ paddingLeft: "10px" }} />
				</Row>
			) : null}
		</Form>
	);
}
