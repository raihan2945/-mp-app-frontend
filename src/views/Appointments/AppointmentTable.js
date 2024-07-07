import { Table } from "antd";
import React, { useEffect } from "react";
import { useGetAppointmentsQuery } from "../../redux/features/appointment/appointmentApi";

const AppointmentTable = () => {

  const {data, error, isLoading} = useGetAppointmentsQuery()

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Company Name",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Company Location",
      dataIndex: "company_location",
      key: "company_location",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },
  ];

  if(error) return <p>Something went wrong</p>

  return (
    <>
      <Table
        loading={isLoading}
        scroll={{ x: true }}
        rowKey={"id"}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default AppointmentTable;
