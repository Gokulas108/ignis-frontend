import { Form, Input, Select, Button } from "antd";
import { Row, Col, Divider } from "antd";

const { Option } = Select;

export default function CreatenewNotification(props) {
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
  const { TextArea } = Input;
  return (
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
        <Col md={12} xs={24}>
          <Form.Item
            name="selectabuilding"
            label="Select a building"
            rules={[{ required: true }]}
          >
            <Select defaultValue="Building 1">
              <Option value="feet">Building 1</Option>
              <Option value="meters">Building 2</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
          <Form.Item
            name="notificationtype"
            label="Notification Type"
            rules={[{ required: true }]}
          >
            <Select defaultValue="Preventive">
              <Option value="Preventive"> Preventive</Option>
              <Option value="Corrective">Corrective</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item name="Reason" label="Reason" rules={[{ required: true }]}>
            <TextArea />
          </Form.Item>
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
              props.onModalClick();
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
