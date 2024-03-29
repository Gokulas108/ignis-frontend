import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import api from "../axiosConfig";
import { useState } from "react";
import { setUserSession } from "../Auth/Auth";
import { useNavigate } from "react-router-dom";

export default function NormalLoginForm() {
	let navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const onFinish = (values) => {
		setLoading(true);
		console.log("Received values of form: ", values);
		let { email, password } = { ...values };
		email = email.trim();
		password = password.trim();
		api
			.post("/auth/login", { userInfo: { email, password } })
			.then((res) => {
				setLoading(false);
				console.log(res);
				if (res.status === 200) {
					const user = res.data.message.user;
					const token = res.data.message.token;
					setUserSession({ user, token });

					if (user.first_login) {
						navigate("/resetpassword");
					} else {
						navigate("/");
					}
				}
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
			<div style={{ height: "25px" }}></div>
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}
			>
				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: "Please input your Email!",
						},
					]}
				>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Email"
					/>
				</Form.Item>
				<Form.Item
					name="password"
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
						placeholder="Password"
					/>
				</Form.Item>
				<Form.Item>
					<a className="login-form-forgot" href="">
						Forgot password
					</a>
					<br />
					<Form.Item name="remember" valuePropName="checked" noStyle>
						<Checkbox>Remember me</Checkbox>
					</Form.Item>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						loading={loading}
					>
						Log in
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
}
