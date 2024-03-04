import React from "react";
import { Card, Table, Tag, Space, Button } from "antd";

const CampaignDetails = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>#{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <p style={{ margin: "0", fontWeight: "700" }}>Dr. {text}</p>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
  ];

  const data = [
    {
      id: 1,
      territory_code: 123,
      name: "John Doe",
      address: "123 Main St",
      mobile: "555-555-5555",
      designation: "Manager",
    },
    {
      id: 2,
      territory_code: 456,
      name: "Jane Smith",
      address: "456 Elm St",
      mobile: "555-555-5556",
      designation: "Salesperson",
    },
    {
      id: 3,
      territory_code: 789,
      name: "Robert Johnson",
      address: "789 Oak St",
      mobile: "555-555-5557",
      designation: "Supervisor",
    },
    {
      id: 4,
      territory_code: 1011,
      name: "Sarah Davis",
      address: "101 Pine St",
      mobile: "555-555-5558",
      designation: "Assistant Manager",
    },
    {
      id: 5,
      territory_code: 1213,
      name: "Michael Brown",
      address: "222 Cedar St",
      mobile: "555-555-5559",
      designation: "Clerk",
    },
    {
      id: 6,
      territory_code: 1415,
      name: "Lisa Wilson",
      address: "333 Birch St",
      mobile: "555-555-5560",
      designation: "Associate",
    },
    {
      id: 7,
      territory_code: 1617,
      name: "David Lee",
      address: "444 Redwood St",
      mobile: "555-555-5561",
      designation: "Technician",
    },
    {
      id: 8,
      territory_code: 1819,
      name: "Emily Miller",
      address: "555 Maple St",
      mobile: "555-555-5562",
      designation: "Coordinator",
    },
    {
      id: 9,
      territory_code: 2021,
      name: "William Harris",
      address: "666 Spruce St",
      mobile: "555-555-5563",
      designation: "Engineer",
    },
    {
      id: 10,
      territory_code: 2223,
      name: "Jennifer Jones",
      address: "777 Walnut St",
      mobile: "555-555-5564",
      designation: "Analyst",
    },
  ];

  return (
    <div>
      <h5>Campaign Details : </h5>

      <Card>
        <p style={{ margin: 0, fontSize: "1rem", fontWeight: "500" }}>
          Name : New Campaign
        </p>
        <p style={{ margin: 0 }}>Type : Single</p>
        <p style={{ margin: 0 }}>Date : 2023/10/12 </p>
        <p style={{ margin: 0 }}>Medium : SMS</p>
        <p style={{ margin: 0 }}>Status : Active </p>
        <p style={{ margin: 0 }}>User Type : Doctor</p>
      </Card>
      <Card title="Users" style={{ marginTop: ".5rem" }}>
        <div className="table-responsive">
          <Table
            columns={columns}
            dataSource={data}
            pagination={true}
            className="ant-border-space"
          />
        </div>
      </Card>
    </div>
  );
};

export default CampaignDetails;
