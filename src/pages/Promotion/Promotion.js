import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Space, Table, Tag, Card, Radio, Select } from "antd";
import FilterSection from "../../views/Filter/FilterSection2";
import { AiFillPlusCircle } from "react-icons/ai";

const { Option } = Select;

const Promotion = () => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>#{text}</a>,
    },
    {
      title: "Campaign name",
      dataIndex: "campaign_name",
      key: "territory_code",
      render: (text) => (
        <p style={{ margin: "0"}}>{text}</p>
      ),
    },

    {
      title: "Type",
      dataIndex: "campaign_type",
      key: "campaign_type",
      render: (text) => (
        <p style={{ margin: "0", fontWeight: "700" }}>{text}</p>
      ),
    },
    {
      title: "Time",
      dataIndex: "campaign_time",
      key: "campaign_time",
      render: (designation) => (
        <>
          <Tag color={"green"}>{designation}</Tag>
        </>
      ),
    },
    {
      title: "Medium",
      dataIndex: "medium",
      key: "medium",
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      key: "user_type",
    },
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
      render: (stage) => (
        <>
        <Tag color={stage == "running" ? "blue" : stage == "draft" ? "yellow" : "red"}>{stage}</Tag>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          <Select style={{color: status== "active" ? "green" : "red"}} defaultValue="active" width={200}>
            <Option value="active" style={{ color: "green" }}>
              active
            </Option>
            <Option value="deactive" style={{ color: "red" }}>
              Deactive
            </Option>
          </Select>
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
          <NavLink to="/campaign">
            <Button>Edit</Button>
          </NavLink>
          <Button>Delete</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      campaign_name: "Campaign 1",
      campaign_type: "single",
      campaign_time: "2023-04-15",
      medium: "whatsapp",
      user_type: "mio",
      status: "active",
      stage: "running",
    },
    {
      id: 2,
      campaign_name: "Campaign 2",
      campaign_type: "daily",
      campaign_time: "2023-07-21",
      medium: "sms",
      user_type: "doctor",
      status: "inactive",
      stage: "draft",
    },
    {
      id: 3,
      campaign_name: "Campaign 3",
      campaign_type: "monthly",
      campaign_time: "2023-11-02",
      medium: "email",
      user_type: "chemist",
      status: "active",
      stage: "expired",
    },
    {
      id: 4,
      campaign_name: "Campaign 4",
      campaign_type: "yearly",
      campaign_time: "2023-08-17",
      medium: "whatsapp",
      user_type: "mio",
      status: "inactive",
      stage: "running",
    },
    {
      id: 5,
      campaign_name: "Campaign 5",
      campaign_type: "single",
      campaign_time: "2023-05-29",
      medium: "sms",
      user_type: "doctor",
      status: "active",
      stage: "draft",
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <NavLink to="/drafts">
          <Button
            type="primary"
            size="large"
            style={{
              marginBottom: "1rem",
              textTransform: "uppercase",
              backgroundColor: "#EFA717",
              border: "none",
            }}
          >
            Drafts
          </Button>
        </NavLink>
        <NavLink to="/campaign">
          <Button
            type="primary"
            icon={<AiFillPlusCircle />}
            size="large"
            style={{
              marginBottom: "1rem",
              textTransform: "uppercase",
              backgroundColor: "#004B96",
              border: "none",
            }}
          >
            Create a new Campaign
          </Button>
        </NavLink>
      </div>
      <FilterSection />
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title="Campaigns"
        extra={<></>}
      >
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
export default Promotion;

// {id, campaign_name, campaign_type, campaign_time,medium,user_type, status,stage }
