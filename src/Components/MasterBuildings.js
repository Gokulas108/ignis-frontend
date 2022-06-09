import {
  Form,
  Button,
  Row,
  Col,
  Table,
  Modal,
  Select,
  Input,
  Divider,
  List,
  Skeleton,
} from "antd";
import { useState } from "react";

export default function MasterBuildings() {
  return (
    <div style={{ marginTop: "10px" }}>
      <Row>
        <Col span={6}>
          <select
            name="Region"
            size="5"
            style={{ width: "90%", borderColor: "lightgrey" }}
          >
            <option value="Qatar" disabled>
              {" "}
              Qatar{" "}
            </option>
            <option value="India" disabled>
              {" "}
              India{" "}
            </option>
          </select>
          <Input.Group compact>
            <Input
              style={{
                width: "69%",
              }}
              placeholder="Enter Region"
            />
            <Button type="primary">Submit</Button>
          </Input.Group>
        </Col>

        <Col span={6}>
          <select
            name="Time Zone"
            size="5"
            style={{ width: "90%", borderColor: "lightgrey" }}
          >
            <option value="AST" disabled>
              {" "}
              AST{" "}
            </option>
            <option value="IST" disabled>
              {" "}
              IST{" "}
            </option>
            <option value="GMT" disabled>
              {" "}
              GMT{" "}
            </option>
          </select>
          <Input.Group compact>
            <Input
              style={{
                width: "69%",
              }}
              placeholder="Enter Time Zone"
            />
            <Button type="primary">Submit</Button>
          </Input.Group>
        </Col>
        <Col span={6}>
          <select
            name="Jurisdiction"
            size="5"
            style={{ width: "90%", borderColor: "lightgrey" }}
          >
            <option value="QCDD" disabled>
              {" "}
              QCDD{" "}
            </option>
            <option value="NFPA" disabled>
              {" "}
              NFPA{" "}
            </option>
          </select>
          <Input.Group compact>
            <Input
              style={{
                width: "69%",
              }}
              placeholder="Enter Jurisdiction"
            />
            <Button type="primary">Submit</Button>
          </Input.Group>
        </Col>
        <Col span={6}>
          <select
            name="Occupancy Classification"
            size="5"
            style={{ width: "90%", borderColor: "lightgrey" }}
          >
            <option value="Classification_1" disabled>
              {" "}
              Classification 1{" "}
            </option>
            <option value="Classification_2" disabled>
              {" "}
              Classification 2{" "}
            </option>
          </select>
          <Input.Group compact>
            <Input
              style={{
                width: "69%",
              }}
              placeholder="Enter Occupancy Classification"
            />
            <Button type="primary">Submit</Button>
          </Input.Group>
        </Col>
        <Col span={6} style={{ marginTop: "20px" }}>
          <select
            name="Hazard Classification"
            size="5"
            style={{ width: "90%", borderColor: "lightgrey" }}
          >
            <option value="Hazard 1" disabled>
              {" "}
              Hazard 1{" "}
            </option>
            <option value="Hazard 2" disabled>
              {" "}
              Hazard 2{" "}
            </option>
          </select>
          <Input.Group compact>
            <Input
              style={{
                width: "69%",
              }}
              placeholder="Enter Hazard Classification"
            />
            <Button type="primary">Submit</Button>
          </Input.Group>
        </Col>
      </Row>
    </div>
  );
}
