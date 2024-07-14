import { Table, Button, Popconfirm, Pagination, Modal } from "antd";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
} from "../../redux/features/appointment/appointmentApi";
import { dateFormatter } from "../../utils/format";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import AppointmentForm from "./AppointmentForm";

const AppointmentTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [editAppointment, setEditAppointment] = useState();

  const { data, error, isLoading } = useGetAppointmentsQuery({
    page: searchParams.get('p') || 1,
    limit: searchParams.get("size") || 10,
    search: searchParams.get("q") || "",
    start: searchParams.get("start") || "",
    end: searchParams.get("end") || "",
  });

  const [deleteAppointment] = useDeleteAppointmentMutation();

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
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (_, { created_at }) => `${dateFormatter(created_at)}`,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => setEditAppointment(record)}
            type="primary"
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => deleteAppointment(record?.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  
  if (error) return <p>Something went wrong</p>;

  return (
    <>
      <Table
        loading={isLoading}
        scroll={{ x: true }}
        rowKey={"id"}
        columns={columns}
        dataSource={data?.data || []}
        pagination={false}
      />

      <div className="pagination__container">
        <Pagination
          defaultCurrent={searchParams.get('p') || 1}
          current={Number(searchParams.get('p') || 1)}
          onChange={(value) => {
            searchParams.set('p', value)
            setSearchParams(searchParams)
          }}
          total={data?.count}
          pageSize={searchParams.get("size") || 10}
        />
      </div>

      {/* update appointment modal */}
      <Modal
        centered
        open={editAppointment}
        onCancel={() => setEditAppointment("")}
        footer={false}
        width={"70%"}
        title='Update Appointment'
      >
        <AppointmentForm
          appointment={editAppointment}
          closeModal={() => setEditAppointment("")}
        />
      </Modal>
    </>
  );
};

export default AppointmentTable;
