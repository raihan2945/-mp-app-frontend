import { Table, Button, Popconfirm } from "antd";
import { useGetAppointmentsQuery } from "../../redux/features/appointment/appointmentApi";
import { dateFormatter } from "../../utils/format";

const AppointmentTable = () => {
  const { data, error, isLoading } = useGetAppointmentsQuery();

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
      render: (_, {created_at}) => `${dateFormatter(created_at)}`
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
            // onClick={() => setEditContact(record)}
            type="primary"
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            // onConfirm={() => deleteAContact(record?.id)}
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
        dataSource={data}
      />
    </>
  );
};

export default AppointmentTable;
