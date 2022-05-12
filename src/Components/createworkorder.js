import { Form, Input, Select, Button, Modal } from "antd";
import { Row, Col, Divider } from "antd";
import { DatePicker, Space } from "antd";
import Createworkorder2 from "./createworkorder2";

const { Option } = Select;
function onChange(date, dateString) {
  console.log(date, dateString);
}
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
      name="createworkorder"
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
            name="selectsystem"
            label="Select System"
            rules={[{ required: true }]}
          >
            <Select defaultValue="automaticsprinklersystem">
              <Option value="automaticsprinklersystem">
                Automatic Sprinkler System
              </Option>
            </Select>
          </Form.Item>
        </Col>

        <Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
          <Form.Item
            name="selectsubsystem"
            label="Select Sub-System"
            rules={[{ required: true }]}
          >
            <Select defaultValue="controlvalves">
              <Option value="controlvalves"> Control Valves</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col md={12} xs={24}>
          <Form.Item
            name="selectasset"
            label="Select Asset"
            rules={[{ required: true }]}
          >
            <Select defaultValue="asset1">
              <Option value="asset1"> Asset #12334 Actuator</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
          <Form.Item name="enddate" label="End Date">
            <Space direction="vertical" style={{ width: "100%" }}>
              <DatePicker onChange={onChange} style={{ width: "100%" }} />
            </Space>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="workDescription"
            label="Work Description"
            rules={[{ required: true }]}
          >
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
              props.onWorkOrderModalClick();
            }}
          >
            Schedule
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
