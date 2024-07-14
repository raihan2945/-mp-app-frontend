import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { IoMdAdd } from "react-icons/io";
import AppointmentForm from "../../views/Appointments/AppointmentForm";
import { AiOutlineDownload } from "react-icons/ai";
import { useSearchParams } from "react-router-dom";
import { useGetAllAppointmentQuery } from "../../redux/features/appointment/appointmentApi";

const AppointmentHeader = () => {
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const { data, error, isLoading } = useGetAllAppointmentQuery({
    search: searchParams.get("q") || "",
    start: searchParams.get("start") || "",
    end: searchParams.get("end") || "",
  });

  let headers = [
    { label: "ID", key: "id" },
    { label: "Full Name", key: "full_name" },
    { label: "Mobile", key: "mobile" },
    { label: "Designation", key: "designation" },
    { label: "Company Name", key: "company_name" },
    { label: "Company Location", key: "company_location" },
    { label: "Company Name", key: "company_name" },
    { label: "Date", key: "created_at" },
    { label: "Note", key: "note" },
  ];

  return (
    <>
      <div className="appointment__header">
        <h2>Appointments</h2>

        <div className="buttons">
          <CSVLink
            data={data ? data.data : []}
            headers={headers}
            filename={`appointments-${searchParams.get(
              "start",
            )}-${searchParams.get("end")}`}
          >
            <Button
              type="default"
              size="middle"
              icon={<AiOutlineDownload size={16} />}
              iconPosition={"end"}
              loading={isLoading}
              disabled={isLoading || error}
            >
              CSV
            </Button>
          </CSVLink>

          <Button
            type="primary"
            size="middle"
            icon={<IoMdAdd size={16} />}
            onClick={() => {
              setOpen(true);
            }}
          >
            Add
          </Button>
        </div>
      </div>

      {/* form modal */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        footer={false}
        width={"70%"}
        title="Add Appointment"
      >
        <AppointmentForm closeModal={() => setOpen(false)} />
      </Modal>
    </>
  );
};

export default AppointmentHeader;
