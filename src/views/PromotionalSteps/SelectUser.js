import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Space, Table, Tag, Card, Radio } from "antd";
import FilterSection from "../../views/Filter/FilterSection";
import { AiFillPlusCircle } from "react-icons/ai";

const SelectUser = () => {

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>#{text}</a>,
    },
    {
      title: "Territory",
      dataIndex: "territory_code",
      key: "territory_code",
      render: (text) => (
        <p style={{ margin: "0", fontWeight: "700", color: "green" }}>
          #{text}
        </p>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <p style={{ margin: "0", fontWeight: "700" }}>{text}</p>
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
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (designation) => (
        <>
          <Tag color={"green"}>{designation}</Tag>
        </>
      ),
    },
    // {
    //   title: "Status",
    //   key: "status",
    //   dataIndex: "status",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">Profile</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key:1,
      id: 1,
      territory_code: 123,
      name: "John Doe",
      address: "123 Main St",
      mobile: "555-555-5555",
      designation: "Manager",
    },
    {
      key:2,
      id: 2,
      territory_code: 456,
      name: "Jane Smith",
      address: "456 Elm St",
      mobile: "555-555-5556",
      designation: "Salesperson",
    },
    {
      key:3,
      id: 3,
      territory_code: 789,
      name: "Robert Johnson",
      address: "789 Oak St",
      mobile: "555-555-5557",
      designation: "Supervisor",
    },
    {
      key:4,
      id: 4,
      territory_code: 1011,
      name: "Sarah Davis",
      address: "101 Pine St",
      mobile: "555-555-5558",
      designation: "Assistant Manager",
    }
  ];

  return (
    <div>
      <FilterSection selectUser />
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title="Campaigns"
        extra={<></>}
      >
        <div className="table-responsive">
          <Table
           rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
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

export default SelectUser;
