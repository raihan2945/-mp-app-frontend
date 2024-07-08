import { Table, Button, Popconfirm, Pagination, Modal } from "antd";
import {
  useDeleteAppointmentMutation,
  useGetAppointmentsQuery,
} from "../../redux/features/appointment/appointmentApi";
import { dateFormatter } from "../../utils/format";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AppointmentForm from "./AppointmentForm";


const AppointmentTable = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("p")) || 1,
  );

  const [editAppointment, setEditAppointment] = useState();

  const { data, error, isLoading } = useGetAppointmentsQuery({
    page: currentPage || 1,
    limit: searchParams.get("size") || 10,
    search: searchParams.get("q") || "",
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

  useEffect(() => {
   if( currentPage != 1 ){
      setSearchParams({
        p: currentPage,
        size: searchParams.get("size") || 10,
      });
    } else {
      setSearchParams(searchParams.delete('p'))
    }
    
  }, [currentPage]);

  useEffect(() => {
    if( currentPage != 1 ){
       setSearchParams({
         p: currentPage,
         size: searchParams.get("size") || 10,
       });
     } else {
       setSearchParams(searchParams.delete('p'))
     }
     
   }, [currentPage]);

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
          defaultCurrent={currentPage}
          current={currentPage}
          onChange={setCurrentPage}
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
