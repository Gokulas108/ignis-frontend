import { Form, Input, Button, Checkbox, Select } from "antd";
import { Row, Col, Divider } from "antd";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const { Option } = Select;

export default function AddProperty(props) {
  const [form] = Form.useForm();
  const [displayMap, setDisplayMap] = useState(true);
  const options = [
    { label: "I - Automatic Sprinkler", value: "automaticSprinkler" },
    { label: "II - Fire Pump", value: "firePump" },
    { label: "III - Water Supply System", value: "waterSupplySystem" },
    {
      label: "IV - Standpipe and Hose System",
      value: "standpipeAndHoseSystem",
    },
    { label: "V - Fire Hydrants", value: "fireHydrants" },
    { label: "VI - Water Mist System", value: "waterMistSystem" },
    { label: "VII - Foam System", value: "foamSystem" },
    {
      label: "VIII - Fixed Wet Chemical Extinguishing System",
      value: "fixedWetChemicalExtinguishingSystem",
    },
    {
      label: "IX - Clean Agent Fire Extinguishing System",
      value: "cleanAgentFireExtinguishingSystem",
    },
    { label: "X - Fixed Aerosol System", value: "fixedAerosoleSystem" },
    {
      label: "XI - Portable Fire Extinguisher",
      value: "portableFireExtinguisher",
    },
    {
      label: "XII - Fire Detection And Alarm System",
      value: "fireDetectionAndAlarmSystem",
    },
    {
      label: "XIII - Emergency Lighting & EPSS",
      value: "emergencyLightingEPSS",
    },
    { label: "XV - Others", value: "others" },
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
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelCol={{ span: 24, style: { paddingTop: 3 } }}
      wrapperCol={{ span: 24 }}
      size="small"
      onValuesChange={(changedValues, allValues) => {
        console.log(changedValues);
        console.log(allValues);
        if (
          changedValues.buildingNo ||
          changedValues.streetNo ||
          changedValues.zoneNo
        )
          if (allValues.buildingNo && allValues.zoneNo && allValues.streetNo)
            console.log(true);
      }}
    >
      <Row>
        <Col md={12} xs={24}>
          <Row>
            <Col md={24} xs={24} style={{ paddingLeft: "10px" }}>
              <Form.Item
                label="Building Name"
                name="buildingName"
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
            <Col md={6} xs={6} style={{ paddingLeft: "10px" }}>
              <Form.Item
                label="Bldg. No."
                name="buildingNo"
                rules={[
                  {
                    required: true,
                    message: "Please enter the building No. ",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={6} xs={6} style={{ paddingLeft: "10px" }}>
              <Form.Item
                label="Street No."
                name="streetNo"
                rules={[
                  {
                    required: true,
                    message: "Please enter the street No.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={6} xs={6} style={{ paddingLeft: "10px" }}>
              <Form.Item
                label="Zone No."
                name="zoneNo"
                rules={[
                  {
                    required: true,
                    message: "Please enter the zone No.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={6} xs={6} style={{ paddingLeft: "10px" }}>
              <Form.Item
                label="Unit No."
                name="unitNo"
                rules={[
                  {
                    required: false,
                    message: "",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col md={24} xs={24} style={{ paddingLeft: "10px" }}>
              <Form.Item
                label="Occupancy Classification"
                name="occupancyClassification"
                rules={[
                  {
                    required: true,
                    message: "Please enter the occupancy classification",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Col>

        <Col md={12} xs={24}>
          <div
            style={{
              width: "100%",
              height: "90%",
              paddingLeft: "10px",
            }}
          >
            {displayMap ? (
              <MapContainer
                style={{
                  height: "100%",
                  borderRadius: "10px",
                }}
                center={[51.505, -0.09]}
                zoom={13}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[25.2116243, 51.577754875532335]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "gray",
                  borderRadius: "10px",
                }}
              ></div>
            )}
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
          <Form.Item
            label="Building Area"
            name="buildingArea"
            rules={[
              {
                required: true,
                message: "Please enter the building area",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
          <Form.Item
            label="AHJ Building Completion Certificate No"
            name="buildingCompletionCertificateNumber"
            rules={[
              {
                required: true,
                message:
                  "Please enter the QCD Building Completion Certificate No",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
          <Form.Item
            label="Hazard Classification"
            name="hazardClassification"
            rules={[
              {
                required: true,
                message: "Please enter the hazard classification",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
          <Form.Item
            label="Office Contact Nos"
            name="contactNumber"
            rules={[
              {
                required: true,
                message: "Please enter the office contact number",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col md={12} xs={24}>
          <Row>
            <Col md={16} xs={18} style={{ paddingLeft: "10px" }}>
              <Form.Item
                label="Building Height"
                name="buildingHeight"
                rules={[
                  {
                    required: true,
                    message: "Please enter the building height",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col md={8} xs={6}>
              <Form.Item name="metrics" label="." rules={[{ required: false }]}>
                <Select defaultValue="feet">
                  <Option value="feet">feet</Option>
                  <Option value="meters">meters</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col md={12} xs={24} style={{ paddingLeft: "10px" }}>
          <Form.Item
            label="Type of Construction"
            name="typeOfConstruction"
            rules={[
              {
                required: true,
                message: "Please enter the type of construction",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col style={{ paddingLeft: "10px" }}>
          <Form.Item
            name="fireProtectionSystems"
            label="Fire Protection Systems"
            rules={[
              {
                required: true,
                message: "Please select the fire protection systems",
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
            Next
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
