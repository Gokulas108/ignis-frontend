import { Form, Input, Button, Checkbox, Row, Col, Divider, Select } from "antd";

const { Option } = Select;

function onChange(checkedValues) {
  console.log("checked = ", checkedValues);
}

export default function ContractDetails(props) {
  const [form] = Form.useForm();

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

  const onFinish = (values) => {
    console.log("Success:", values);
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
    >
      <Row>
        <Col span={12} style={{ paddingLeft: "10px" }}>
          <Form.Item
            name="Jurisdiction"
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
        </Col>

        <Col span={12}>
          <div
            style={{
              backgroundColor: "#081a51",
              height: "30px",
              borderRadius: "10px 10px 0 0",
              width: "100%",
            }}
          >
            <Row>
              <Col
                span={12}
                style={{
                  fontWeight: 600,
                  color: "orange",
                  paddingLeft: "10px",
                }}
              >
                Owner
              </Col>
              <Col
                span={12}
                style={{
                  fontWeight: 600,
                  color: "orange",
                  paddingLeft: "10px",
                }}
              >
                Phone Number
              </Col>
            </Row>
          </div>
          <div
            style={{
              height: "75px",
              backgroundColor: "lightgrey",
              borderRadius: "0 0 10px 10px",
            }}
          >
            <Row>
              <Col
                span={24}
                style={{
                  height: "75px",
                  display: "flex",
                  alignItems: "center",
                  verticalAlign: "center",
                  justifyContent: "center",
                }}
              >
                Click + icon to to add owner details
                <button
                  style={
                    {
                      // position: "absolute",
                      // bottom: 0,
                      // left: "50px",
                      // transform: `translate(${326}px, ${0}px)`,
                      // display: "flex",
                      // verticalAlign: "bottom",
                    }
                  }
                >
                  +
                </button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div
            style={{
              backgroundColor: "#081a51",
              height: "30px",
              borderRadius: "10px 10px 0 0",
              width: "100%",
            }}
          >
            <Row>
              <Col
                span={14}
                style={{
                  fontWeight: 600,
                  color: "orange",
                  paddingLeft: "10px",
                }}
              >
                Systems
              </Col>
              <Col
                span={10}
                style={{
                  fontWeight: 600,
                  color: "orange",
                  paddingLeft: "10px",
                }}
              >
                Frequency
              </Col>
            </Row>
          </div>
          <div
            style={{
              height: "75px",
              backgroundColor: "lightgrey",
              borderRadius: "0 0 10px 10px",
            }}
          >
            {/* <Row>
              <Col
                span={14}
                style={{
                  height: "75px",
                  // display: "flex",
                  // alignItems: "center",
                  // verticalAlign: "center",
                  // justifyContent: "center",
                }}
              ></Col>
              <Col span={10}></Col>
            </Row> */}
          </div>
        </Col>

        <Col span={12}>
          <Row>
            <Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
              <Form.Item
                label="Contract Number"
                name="contractnumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter the building name",
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
                    message: "Please enter the building name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col md={24} xs={24} style={{ paddingLeft: "10px" }}></Col>
          </Row>
          <Row>
            <Col md={16} xs={18} style={{ paddingLeft: "10px" }}>
              <Form.Item
                label="Total Contract Value"
                name="totalcontractvalue"
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
              <Form.Item name="metrics" label="." rules={[{ required: false }]}>
                <Select defaultValue="QAR">
                  <Option value="INR">INR</Option>
                  <Option value="QAR">QAR</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <Col span={12}>
          {/* <Form.Item name="attachfiles" label="Attach Files" /> */}
          <label>Attach Files</label>
          <div
            style={{
              backgroundColor: "#081a51",
              height: "30px",
              borderRadius: "10px 10px 0 0",
              width: "100%",
            }}
          >
            <Row>
              <Col
                span={12}
                style={{
                  fontWeight: 600,
                  color: "orange",
                  paddingLeft: "10px",
                }}
              >
                File Name
              </Col>
              <Col
                span={12}
                style={{
                  fontWeight: 600,
                  color: "orange",
                  paddingLeft: "10px",
                }}
              >
                File Type
              </Col>
            </Row>
          </div>
          <div
            style={{
              height: "75px",
              backgroundColor: "lightgrey",
              borderRadius: "0 0 10px 10px",
            }}
          >
            <Row>
              <Col
                span={24}
                style={{
                  height: "75px",
                  display: "flex",
                  alignItems: "center",
                  verticalAlign: "center",
                  justifyContent: "center",
                }}
              >
                Click + icon to to add files
                <button
                  style={
                    {
                      //position: "absolute",
                      //bottom: 0,
                      //left: "50px",
                      //transform: `translate(${326}px, ${0}px)`,
                      // display: "flex",
                      // verticalAlign: "bottom",
                    }
                  }
                >
                  +
                </button>
              </Col>
            </Row>
          </div>
        </Col>

        <Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
          <Row>
            <Col md={12} xs={24}>
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
