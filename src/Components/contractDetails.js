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
	message,
} from "antd";
import {
	MinusCircleOutlined,
	PlusOutlined,
	InboxOutlined,
	LoadingOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { useState, useEffect, useLayoutEffect } from "react";
import api from "../axiosConfig";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import S3 from "react-aws-s3";
window.Buffer = window.Buffer || require("buffer").Buffer;

const { Option } = Select;

export default function ContractDetails(props) {
	const [form] = Form.useForm();
	const [systemData, setSystemData] = useState([]);
	const [systemTableLoading, setSystemTableLoading] = useState(true);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [fileUploading, setFileUploading] = useState(false);
	const [contractType, setContractType] = useState([]);
	const s3Url = "https://ignis-building-docs.s3.amazonaws.com";

	const systemColumns = [
		{
			title: "System",
			dataIndex: "label",
			key: "label",
		},
		{
			title: "Frequency",
			dataIndex: "frequency",
			key: "frequency",
			render: (text, record, index) => (
				<Select
					disabled={props.selectedBuilding}
					defaultValue={text}
					onSelect={(e) => setFrequency(e, index)}
				>
					<Option value="weekly">Weekly</Option>
					<Option value="monthly">Monthly</Option>
					<Option value="semiAnnually">Semi Annually</Option>
					<Option value="annually">Annually</Option>
				</Select>
			),
		},
	];

	const setFrequency = (value, index) => {
		let data = systemData;
		data[index].frequency = value;
		setSystemData(data);
	};

	const normFile = (e) => {
		console.log("Upload event:", e);

		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	const dummyRequest = ({ file, onSuccess }) => {
		setTimeout(() => {
			onSuccess("ok");
		}, 0);
	};

	useLayoutEffect(() => {
		console.log("hello, useeffect");
		console.log(props.contractType);
		console.log("selected:", props.selectedBuilding);
		console.log(props.requiredFields);
		props.setContractDetails({ form });
		let data = [];
		props.buildingDetails.fire_protection_systems?.map((system) => {
			data.push({
				label: system.label,
				frequency: "weekly",
				value: system.value,
			});
		});
		if (props.selectedBuilding)
			setSystemData(props.selectedBuilding.fire_protection_systems);
		else {
			setSystemData(data);
		}
		setSystemTableLoading(false);
		return () => {
			console.log("bye, useeffect");
		};
	}, [props.selectedBuilding]);

	const onFinish = (values) => {
		console.log("Success:", values);
		let data = { ...props.buildingDetails, ...values };
		data = { ...data, fire_protection_systems: systemData };
		let files_to_be_uploaded = data["dragger"];
		let files = [];
		files_to_be_uploaded?.map((file) => {
			files.push({ name: file.name });
		});
		data["files"] = files;
		delete data["unit_no"];
		delete data["dragger"];
		console.log("Final data", data);
		console.log("Final Files", files);
		setSubmitLoading(true);
		api.post("/buildings", { building: data }).then((res) => {
			console.log(res);
			setFileUploading(true);
			// generatePDF(data);
			let dirName = data.building_name.replace(/\s+/g, "-").toLowerCase();
			const config = {
				bucketName: process.env.REACT_APP_BUCKET_NAME,
				region: process.env.REACT_APP_REGION,
				accessKeyId: process.env.REACT_APP_ACCESS_ID,
				secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
				s3Url,
				dirName,
			};
			let fail = false;
			if (files_to_be_uploaded) {
				files_to_be_uploaded.map(async (fileItem, index, { length }) => {
					let file = fileItem.originFileObj;
					let filename = fileItem.name;
					const ReactS3Client = new S3(config);
					try {
						let data = await ReactS3Client.uploadFile(file, filename);
						console.log(data);
						if (data.status === 204) {
							console.log("success");
						} else {
							console.log("fail");
							fail = true;
						}
					} catch (err) {
						console.log(err);
						fail = true;
					}
					if (length - 1 === index) {
						props.getBuildingDetails();
						props.success();
						props.setSubModel(false);
						setSubmitLoading(false);
						setFileUploading(false);
						if (fail) props.errorMessage("Uploading files failed");
					}
				});
			} else {
				props.getBuildingDetails();
				props.success();
				props.setSubModel(false);
				setSubmitLoading(false);
				setFileUploading(false);
			}
		});
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const onReset = () => {
		form.resetFields();
	};

	const padTo2Digits = (num) => {
		return num.toString().padStart(2, "0");
	};

	const formatDate = (date) => {
		return [
			padTo2Digits(date.getDate()),
			padTo2Digits(date.getMonth() + 1),
			date.getFullYear(),
		].join("/");
	};

	const generatePDF = async (data) => {
		console.log(data);

		const existingPdfBytes = await fetch("/Template3.pdf").then((res) =>
			res.arrayBuffer()
		);

		const pdfDoc = await PDFDocument.load(existingPdfBytes);
		const form = pdfDoc.getForm();
		let textField = form.getTextField("apple");
		textField.setText("123423");
		textField = form.getTextField("date");
		textField.setText(formatDate(new Date()));
		textField = form.getTextField("name");
		textField.setText(data.building_name.toString());
		textField = form.getTextField("certno");
		textField.setText(data.building_completion_certificate_number.toString());
		textField = form.getTextField("building");
		textField.setText(data.building_no.toString());
		textField = form.getTextField("street");
		textField.setText(data.street_no.toString());
		textField = form.getTextField("zone");
		textField.setText(data.zone_no.toString());
		textField = form.getTextField("contact");
		textField.setText(data.contact_number.toString());
		textField = form.getTextField("occupancy");
		textField.setText("classification1");
		textField = form.getTextField("height");
		textField.setText(data.building_height.toString());
		textField = form.getTextField("area");
		textField.setText(data.building_area.toString());
		textField = form.getTextField("type");
		textField.setText(data.type_of_construction.toString());
		textField = form.getTextField("hazard");
		textField.setText("test");
		let checkBox;
		data.fire_protection_systems.map((item) => {
			if (item.value === "automaticSprinkler") {
				checkBox = form.getCheckBox("o1");
				checkBox.check();
			} else if (item.value === "firePump") {
				checkBox = form.getCheckBox("o2");
				checkBox.check();
			} else if (item.value === "waterSupplySystem") {
				checkBox = form.getCheckBox("o3");
				checkBox.check();
			} else if (item.value === "standpipeAndHoseSystem") {
				checkBox = form.getCheckBox("o4");
				checkBox.check();
			} else if (item.value === "fireHydrants") {
				checkBox = form.getCheckBox("o5");
				checkBox.check();
			} else if (item.value === "waterMistSystem") {
				checkBox = form.getCheckBox("o6");
				checkBox.check();
			} else if (item.value === "foamSystem") {
				checkBox = form.getCheckBox("o7");
				checkBox.check();
			} else if (item.value === "fixedWetChemicalExtinguishingSystem") {
				checkBox = form.getCheckBox("o8");
				checkBox.check();
			} else if (item.value === "cleanAgentFireExtinguishingSystem") {
				checkBox = form.getCheckBox("o9");
				checkBox.check();
			} else if (item.value === "fixedAerosoleSystem") {
				checkBox = form.getCheckBox("o10");
				checkBox.check();
			} else if (item.value === "portableFireExtinguisher") {
				checkBox = form.getCheckBox("o11");
				checkBox.check();
			} else if (item.value === "fireDetectionAndAlarmSystem") {
				checkBox = form.getCheckBox("o12");
				checkBox.check();
			} else if (item.value === "emergencyLightingEPSS") {
				checkBox = form.getCheckBox("o13");
				checkBox.check();
			} else if (item.value === "others") {
				checkBox = form.getCheckBox("o15");
				checkBox.check();
			}
		});
		form.flatten();
		const pdfBytes = await pdfDoc.save({});
		const bytes = new Uint8Array(pdfBytes);
		const blob = new Blob([bytes], { type: "application/pdf" });
		const docUrl = URL.createObjectURL(blob);
		const tempLink = document.createElement("a");
		tempLink.href = docUrl;
		tempLink.setAttribute("download", `${data.building_name.toString()}.pdf`);
		tempLink.click();
	};

	return (
		<>
			<fieldset disabled={props.selectedBuilding ? true : false}>
				<Form
					form={form}
					name="contractDetails"
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
					labelCol={{ span: 24, style: { paddingTop: 3 } }}
					wrapperCol={{ span: 24 }}
					size="small"
					initialValues={
						props.selectedBuilding
							? props.selectedBuilding
							: {
									currency: 1,
									contract_type: props.contractType
										? props.contractType[0].id
										: "",
							  }
					}
				>
					<Row>
						<Col span={12} style={{ paddingRight: "10px" }}>
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
													rules={[
														{ required: true, message: "Missing Phone No." },
													]}
												>
													<Input placeholder="Phone No." />
												</Form.Item>
												<Form.Item
													{...restField}
													name={[name, "email"]}
													rules={[
														{ required: true, message: "Missing Email Id" },
													]}
												>
													<Input placeholder="Email Id" />
												</Form.Item>
												{!props.selectedBuilding && (
													<MinusCircleOutlined onClick={() => remove(name)} />
												)}
											</Space>
										))}
										<Form.Item>
											{!props.selectedBuilding && (
												<Button
													type="dashed"
													onClick={() => add()}
													block
													icon={<PlusOutlined />}
												>
													Add Owner
												</Button>
											)}
										</Form.Item>
									</>
								)}
							</Form.List>
							<Row>
								<Col md={12} xs={24} style={{}}>
									<Form.Item
										label="Contract Number"
										name="contract_number"
										rules={[
											{
												required: props.requiredFields.contract_number,
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
										name="contract_type"
										rules={[
											{
												required: props.requiredFields.contract_type,
												message: "Please enter the contract type",
											},
										]}
									>
										<Select disabled={props.selectedBuilding}>
											{props.contractType.map((item) => (
												<Option value={item.id}>{item.value}</Option>
											))}
										</Select>
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col md={16} xs={18} style={{ paddingRight: "10px" }}>
									<Form.Item
										label="Total Contract Value"
										name="total_contract_value"
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
										<Select
											disabled={props.selectedBuilding}
											defaultValue="QAR"
										>
											<Option value={0}>INR</Option>
											<Option value={1}>QAR</Option>
										</Select>
									</Form.Item>
								</Col>
							</Row>
						</Col>
						<Col span={24}>
							{props.selectedBuilding ? (
								<>
									<br />
									<br />
									<h3 style={{ marginLeft: "10px" }}>Uploaded Attachments</h3>
									<ul>
										{props.selectedBuilding.files?.map((file) => (
											<li>
												<a
													href={`${s3Url}/${props.selectedBuilding.building_name
														.replace(/\s+/g, "-")
														.toLowerCase()}/${file.name}`}
													target="_blank"
												>
													{file.name}
												</a>
											</li>
										))}
									</ul>
								</>
							) : (
								<Form.Item label="Upload Attachments">
									<Form.Item
										name="dragger"
										valuePropName="fileList"
										getValueFromEvent={normFile}
										noStyle
									>
										<Upload.Dragger name="files" customRequest={dummyRequest}>
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
							)}
							{/* <Form.Item label="Upload Contract">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Upload Attachments">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Upload Attachments">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Upload Attachments">
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item> */}
						</Col>
					</Row>

					<Divider />

					{props.selectedBuilding === null && (
						<Row>
							<Col md={6} xs={0} style={{ paddingLeft: "10px" }} />
							<Col md={6} xs={12} style={{ paddingLeft: "10px" }}>
								<Button
									size="middle"
									block
									type="primary"
									htmlType="submit"
									disabled={submitLoading}
								>
									{submitLoading ? (
										<>
											<LoadingOutlined />{" "}
											{fileUploading
												? "Uploading attachments..."
												: "Saving details..."}
										</>
									) : (
										"Submit"
									)}
								</Button>
							</Col>
							<Col md={6} xs={12} style={{ paddingLeft: "10px" }}>
								<Button size="middle" block htmlType="button" onClick={onReset}>
									Reset
								</Button>
							</Col>
							<Col md={6} xs={0} style={{ paddingLeft: "10px" }} />
						</Row>
					)}
				</Form>
			</fieldset>
		</>
	);
}
