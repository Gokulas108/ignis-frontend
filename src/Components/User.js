import {
	Form,
	Button,
	Row,
	Col,
	Table,
	Modal,
	Select,
	Input,
	message,
} from "antd";
import { useState } from "react";
import api from "../axiosConfig";
const { Option } = Select;

export default function User() {
	const [form] = Form.useForm();
	const [userLoading, setUserLoading] = useState(false);
	const onFinish = (values) => {
		setUserLoading(true);
		values["password"] = "123456";
		console.log("Success:", values);
		api
			.post("auth/register", { userInfo: values })
			.then((res) => {
				console.log(res);
				if (res.status === 200) {
					message.success(res.data.message);
					onReset();
				}
			})
			.catch((err) => {
				message.error(err.response?.data?.message || "Network Error");
			})
			.finally(() => {
				setUserLoading(false);
			});
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const onReset = () => {
		form.resetFields();
	};

	const onModalClick = () => {
		setUserModel(false);
	};

	const [isUserModel, setUserModel] = useState(false);

	const columns = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "E-mail",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Active",
			dataIndex: "active",
			key: "active",
		},
	];

	const data = [];

	return (
		<div style={{ marginTop: "10px" }}>
			<Row>
				<Col span={12}>
					<Table dataSource={data} columns={columns} pagination={false} />
				</Col>
				<Col
					span={11}
					style={{
						height: "100%",
						backgroundColor: "#F7F6F6",
						marginLeft: "20px",
					}}
				>
					<Row>
						<Col span={22} style={{ marginLeft: "10px" }}>
							<Form
								form={form}
								name="createnewnotification"
								onFinish={onFinish}
								onFinishFailed={onFinishFailed}
								autoComplete="off"
								labelCol={{ span: 24, style: { paddingTop: 3 } }}
								wrapperCol={{ span: 24 }}
								size="small"
								initialValues={{ role: "admin" }}
							>
								<Row>
									<Col span={24}>
										<Form.Item label="Add User"></Form.Item>
									</Col>
								</Row>
								<Row>
									<Col span={24}>
										<Form.Item
											name="role"
											label="User Type"
											rules={[{ required: true }]}
										>
											<Select>
												<Option value="admin"> Admin</Option>
												<Option value="engineer">Engineer</Option>
												<Option value="technician">Technician</Option>
											</Select>
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item
											name="name"
											label="Name"
											rules={[{ required: true }]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col span={24}>
										<Form.Item
											name="email"
											label="E-mail"
											rules={[{ required: true }]}
										>
											<Input />
										</Form.Item>
									</Col>
									<Col md={6} xs={0} style={{ paddingLeft: "10px" }} />
									<Col md={6} xs={12} style={{ paddingLeft: "10px" }}>
										<Button
											size="middle"
											block
											type="primary"
											htmlType="submit"
											loading={userLoading}
										>
											Submit
										</Button>
									</Col>
									<Col md={6} xs={12} style={{ paddingLeft: "10px" }}>
										<Button
											size="middle"
											block
											htmlType="button"
											onClick={onReset}
										>
											Reset
										</Button>
									</Col>
									<Col md={6} xs={0} style={{ paddingLeft: "10px" }} />
								</Row>
							</Form>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
}
