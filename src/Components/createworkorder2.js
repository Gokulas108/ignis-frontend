import { Form, Input, Select, Button, Table } from "antd";
import { Row, Col, Divider } from "antd";
import { DatePicker, Space } from "antd";
import { useEffect, useState } from "react";
function onChange(date, dateString) {
  console.log(date, dateString);
}
const { Option } = Select;
export default function Createworkorder2(props) {
  const [form] = Form.useForm();
  //const [data, setData] = useState([]);

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

  const columns = [
    {
      title: "Assigned Technician(s)",
      dataIndex: "technicians",
      key: "technicians",
    },
  ];
  const data = [
    {
      key: "1",
      technicians: "Technician 1",
    },
    {
      key: "2",
      technicians: "Technician 2",
    },
  ];
  return (
    <Form
      form={form}
      name="createworkorder2"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelCol={{ span: 24, style: { paddingTop: 3 } }}
      wrapperCol={{ span: 24 }}
      size="small"
    >
      <Row>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Form.Item name="startdate" label="Start Date">
                <Space direction="vertical" style={{ width: "90%" }}>
                  <DatePicker onChange={onChange} style={{ width: "90%" }} />
                </Space>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item name="enddate" label="End Date">
                <Space direction="vertical" style={{ width: "90%" }}>
                  <DatePicker onChange={onChange} style={{ width: "90%" }} />
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Table dataSource={data} columns={columns} pagination={false} />
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
              props.setWorkOrderModel2(false);
            }}
          >
            Confirm
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
