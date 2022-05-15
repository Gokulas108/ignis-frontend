import {
	Form,
	Input,
	Button,
	Checkbox,
	Row,
	Col,
	Divider,
	Select,
	Table,
	Space,
	Upload,
} from "antd";
import {
	MinusCircleOutlined,
	PlusOutlined,
	InboxOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";

const { Option } = Select;

const systemColumns = [
	{
		title: "System",
		dataIndex: "system",
		key: "system",
	},
	{
		title: "Frequency",
		dataIndex: "frequency",
		key: "frequency",
		render: (text) => (
			<Select defaultValue={text}>
				<Option value="weekly">Weekly</Option>
				<Option value="monthly">Monthly</Option>
				<Option value="semiAnnually">Semi Annually</Option>
				<Option value="annually">Annually</Option>
			</Select>
		),
	},
];

function onChange(checkedValues) {
	console.log("checked = ", checkedValues);
}

const options = [
	{ label: "QCDD", value: "QCDD" },
	{ label: "UAE", value: "UAE" },
	{ label: "NFPA", value: "NFPA" },
	{
		label: "KSA",
		value: "KSA",
	},
	{ label: "Others", value: "Others" },
];

export default function ContractDetails(props) {
	const [form] = Form.useForm();
	const [systemData, setSystemData] = useState([]);
	const [systemTableLoading, setSystemTableLoading] = useState(true);

	const normFile = (e) => {
		console.log("Upload event:", e);

		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	useEffect(() => {
		let data = [];
		props.buildingDetails.fireProtectionSystems.map((system) => {
			data.push({ system: system.label, frequency: "weekly" });
		});
		setSystemData(data);
		setSystemTableLoading(false);
	}, [props.buildingDetails.fireProtectionSystems]);

	const onFinish = (values) => {
		console.log("Success:", values);
		let data = { ...props.buildingDetails, ...values };
		console.log("Final data", data);
		props.success();
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<Form
			form={form}
			name="contractDetails"
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete="off"
			labelCol={{ span: 24, style: { paddingTop: 3 } }}
			wrapperCol={{ span: 24 }}
			size="small"
			initialValues={{ currency: "QAR", timezone: "AST", region: "Qatar" }}
		>
			<Row>
				<Col span={12} style={{ paddingRight: "10px" }}>
					<Row>
						<Col md={12} xs={24} style={{ paddingRight: "10px" }}>
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
								name="timezone"
								rules={[
									{
										required: true,
										message: "Please select a time zone",
									},
								]}
							>
								<Select defaultValue="AST">
									<Option value="AST">AST</Option>
									<Option value="IST">IST</Option>
									<Option value="GMT">GMT</Option>
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
					<Row>
						<Col span={24} style={{ paddingRight: "20px" }}>
							<Table
								columns={systemColumns}
								dataSource={systemData}
								loading={systemTableLoading}
								pagination={false}
							/>
						</Col>

						<Col span={12}></Col>
					</Row>
				</Col>

				<Col span={12} style={{ paddingTop: "6px" }}>
					<label style={{ paddingLeft: "10px" }}>Owners: </label>
					<Form.List name="owners">
						{(fields, { add, remove }) => (
							<>
								{fields.map(({ key, name, ...restField }) => (
									<Space
										key={key}
										style={{
											display: "flex",
											marginBottom: 8,
										}}
										align="baseline"
									>
										<Form.Item
											{...restField}
											name={[name, "name"]}
											rules={[{ required: true, message: "Missing Name" }]}
										>
											<Input placeholder="Name" />
										</Form.Item>
										<Form.Item
											{...restField}
											name={[name, "phone"]}
											rules={[{ required: true, message: "Missing Phone No." }]}
										>
											<Input placeholder="Phone No." />
										</Form.Item>
										<Form.Item
											{...restField}
											name={[name, "email"]}
											rules={[{ required: true, message: "Missing Email Id" }]}
										>
											<Input placeholder="Email Id" />
										</Form.Item>
										<MinusCircleOutlined onClick={() => remove(name)} />
									</Space>
								))}
								<Form.Item>
									<Button
										type="dashed"
										onClick={() => add()}
										block
										icon={<PlusOutlined />}
									>
										Add Owner
									</Button>
								</Form.Item>
							</>
						)}
					</Form.List>
					<Row>
						<Col md={12} xs={24} style={{}}>
							<Form.Item
								label="Contract Number"
								name="contractNumber"
								rules={[
									{
										required: true,
										message: "Please enter the Contract No.",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
							<Form.Item
								label="Contract Type"
								name="contracttype"
								rules={[
									{
										required: true,
										message: "Please enter the contract type",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col md={16} xs={18} style={{ paddingRight: "10px" }}>
							<Form.Item
								label="Total Contract Value"
								name="totalContractValue"
								rules={[
									{
										required: true,
										message: "Please enter the Total Contract Value",
									},
								]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col md={8} xs={6}>
							<Form.Item
								name="currency"
								label="."
								rules={[{ required: false }]}
							>
								<Select defaultValue="QAR">
									<Option value="INR">INR</Option>
									<Option value="QAR">QAR</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col span={24}>
							<Form.Item label="Upload Attachments">
								<Form.Item
									name="dragger"
									valuePropName="fileList"
									getValueFromEvent={normFile}
									noStyle
								>
									<Upload.Dragger name="files" action="/upload.do">
										<p className="ant-upload-drag-icon">
											<InboxOutlined />
										</p>
										<p className="ant-upload-text">
											Click or drag file to this area to upload
										</p>
										<p className="ant-upload-hint">
											Support for a single or bulk upload.
										</p>
									</Upload.Dragger>
								</Form.Item>
							</Form.Item>
						</Col>
					</Row>
				</Col>
			</Row>

			<Divider />

			<Row>
				<Col md={6} xs={0} style={{ paddingLeft: "10px" }} />
				<Col md={6} xs={12} style={{ paddingLeft: "10px" }}>
					<Button
						size="middle"
						block
						type="primary"
						htmlType="submit"
						onClick={() => {
							props.setSubModel(false);
						}}
					>
						Submit
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
	);
}
