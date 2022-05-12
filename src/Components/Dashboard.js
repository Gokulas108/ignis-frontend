import Layout from "./Layout";
import { Card } from "antd";
import Column from "antd/lib/table/Column";
import { Row, Col } from "antd";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function Dashboard() {
  return (
    <Layout>
      <Row gutter={16 + 8 * 2}>
        <Col span={6}>
          <Card
            style={{
              width: "100%",
              backgroundColor: "#081a51",
              borderRadius: "10px",
            }}
          >
            <Row
              gutter={16 + 8 * 2}
              style={{ alignItems: "center" }}
              justify="center"
            >
              <Col span={6}>
                <div style={{ alignItems: "center" }}>
                  <div className="circle_card" />
                </div>
              </Col>
              <Col span={18}>
                {" "}
                <span style={{ color: "orange", fontSize: "20px" }}>2</span>
                <br />
                <span style={{ color: "white" }}>
                  New buildings require asset tagging
                </span>
              </Col>
            </Row>

            <div></div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              width: "100%",
              backgroundColor: "#081a51",
              borderRadius: "10px",
            }}
          >
            <Row
              gutter={16 + 8 * 2}
              style={{ alignItems: "center" }}
              justify="center"
            >
              <Col span={6}>
                <div style={{ alignItems: "center" }}>
                  <div className="circle_card" />
                </div>
              </Col>
              <Col span={18}>
                {" "}
                <span style={{ color: "orange", fontSize: "20px" }}>79</span>
                <br />
                <span style={{ color: "white" }}>
                  Work orders to be completed
                </span>
              </Col>
            </Row>

            <div></div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              width: "100%",
              backgroundColor: "#081a51",
              borderRadius: "10px",
            }}
          >
            <Row
              gutter={16 + 8 * 2}
              style={{ alignItems: "center" }}
              justify="center"
            >
              <Col span={6}>
                <div style={{ alignItems: "center" }}>
                  <div className="circle_card" />
                </div>
              </Col>
              <Col span={18}>
                {" "}
                <span style={{ color: "orange", fontSize: "20px" }}>12</span>
                <br />
                <span style={{ color: "white" }}>
                  Notifications pending for approval
                </span>
              </Col>
            </Row>

            <div></div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            style={{
              width: "100%",
              backgroundColor: "#081a51",
              borderRadius: "10px",
            }}
          >
            <Row
              gutter={16 + 8 * 2}
              style={{ alignItems: "center" }}
              justify="center"
            >
              <Col span={6}>
                <div style={{ alignItems: "center" }}>
                  <div className="circle_card" />
                </div>
              </Col>
              <Col span={18}>
                {" "}
                <span style={{ color: "orange", fontSize: "20px" }}>
                  167/266
                </span>
                <br />
                <span style={{ color: "white" }}>
                  Technicians working currently
                </span>
              </Col>
            </Row>

            <div></div>
          </Card>
        </Col>
      </Row>
      <br />
      <Row gutter={16 + 8 * 1}>
        <Col span={14}>
          <Row>
            <Col span={24}>
              <div
                style={{
                  backgroundColor: "#081a51",
                  height: "30px",
                  borderRadius: "10px 10px 0 0",
                }}
              >
                <span style={{ color: "orange" }}>Work Status</span>
              </div>
            </Col>
          </Row>
          <Row style={{ height: "500px" }}>
            <Col span={24}>
              <MapContainer
                style={{ height: "70%" }}
                center={[51.505, -0.09]}
                zoom={13}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </Col>
          </Row>
        </Col>
        <Col span={10}>
          <div
            style={{
              backgroundColor: "#081a51",
              height: "30px",
              borderRadius: "10px 10px 0 0",
              width: "100%",
            }}
          >
            <span
              style={{
                color: "orange",
                padding: "10px",
                paddingBottom: "10px",
              }}
            >
              Recent Activity
            </span>
          </div>
          <div className="recentActivity">
            <Row>
              <Col span={18}>New building 'xyz' added</Col>
              <Col span={6}> </Col>
            </Row>
            <Row>
              <Col span={18}>New notification for building</Col>
              <Col span={6}> </Col>
            </Row>
            <Row>
              <Col span={18}>Work order #123 completed for building 2</Col>
              <Col span={6}> </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}
