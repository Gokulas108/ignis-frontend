import { Form, Button, Row, Col, Table, Modal, Select, Input } from "antd";
import { useState } from "react";

const { Option } = Select;

export default function User() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
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

  const data = [
    {
      id: "1",
      name: "Mike",
      email: 32,
      active: "10 Downing Street",
    },
    {
      id: "2",
      name: "John",
      email: 42,
      active: "10 Downing Street",
    },
  ];

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
              >
                <Row>
                  <Col span={24}>
                    <Form.Item label="Add User"></Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      name="User Type"
                      label="User Type"
                      rules={[{ required: true }]}
                    >
                      <Select defaultValue="Admin">
                        <Option value="Admin"> Admin</Option>
                        <Option value="Engineer">Engineer</Option>
                        <Option value="Technician">Technician</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="Name"
                      label="Name"
                      rules={[{ required: true }]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="E-mail"
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
