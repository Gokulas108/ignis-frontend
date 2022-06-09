import Layout from "./Layout";
import { Form, Row, Col, Button, Modal, Tabs } from "antd";
import User from "./User";
import { useState } from "react";
import MasterBuildings from "./MasterBuildings";
import MasterNotifications from "./MasterNotifications";

export default function Master() {
  const { TabPane } = Tabs;
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <div style={{ height: "100%" }}>
      <Row>
        <Col span={24}>
          <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="Users" key="1">
              <User />
            </TabPane>
            <TabPane tab="Buildings" key="2">
              <MasterBuildings />
            </TabPane>
            <TabPane tab="Notifications" key="3">
              <MasterNotifications />
            </TabPane>
            <TabPane tab="Work orders" key="4">
              Work Orders
            </TabPane>
            <TabPane tab="Reports" key="5">
              Reports
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}
