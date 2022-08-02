import { Form, Input, Button, Checkbox, message, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import api from "../axiosConfig";
import { useState } from "react";
import { getUser } from "../Auth/Auth";
import { useNavigate } from "react-router-dom";

export default function NormalLoginForm() {
	let navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onFinish = (values) => {
		setLoading(true);
		console.log("Received values of form: ", values);
		let { new_password, confirm_password } = { ...values };
		new_password = new_password.trim();
		confirm_password = confirm_password.trim();
		let user = getUser();
		api
			.post("/auth/reset", { user, new_password, confirm_password })
			.then((res) => {
				setLoading(false);
				console.log(res);
				message.success(
					"Password changed successfully, Login with new credentials"
				);
				navigate("/login");
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
				if (err.response && err.response.data && err.response.data.message)
					message.error(err.response.data.message, 10);
				else message.error("Server Error", 10);
			});
	};

	return (
		<div className="loginform">
			<img style={{ paddingLeft: "30px" }} src="logo.png" height={100}></img>
			<div style={{ height: "70px", marginTop: "10px" }}>
				<Alert
					message={
						<>
							This is your first login, please set
							<br />
							your new password.
						</>
					}
					type="warning"
				/>
			</div>
			<Form
				name="normal_login"
				className="login-form"
				autoComplete="off"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
			>
				<Form.Item
					name="new_password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
				>
					<Input
						type="password"
						prefix={<LockOutlined className="site-form-item-icon" />}
						placeholder="New Password"
					/>
				</Form.Item>
				<Form.Item
					name="confirm_password"
					rules={[
						{
							required: true,
							message: "Please input your Password!",
						},
					]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Confirm Password"
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						loading={loading}
					>
						Change Password
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
