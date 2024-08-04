import { Button, Modal } from "antd";
import React, { useState } from "react";
import { CSVLink } from "react-csv";
import { IoMdAdd } from "react-icons/io";
import { FiCalendar, FiTable } from "react-icons/fi";
import AppointmentForm from "../../views/Appointments/AppointmentForm";
import { AiOutlineDownload } from "react-icons/ai";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useGetAllAppointmentQuery } from "../../redux/features/appointment/appointmentApi";
import { AiOutlineSchedule } from "react-icons/ai";

const AppointmentHeader = () => {
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

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
    { label: "Reference", key: "reference" },
    { label: "Date", key: "created_at" },
    { label: "Note", key: "note" },
  ];

  return (
    <>
      <div className="appointment__header">
        <h2>
          <AiOutlineSchedule className="icon" />
          <span>Appointments</span>
        </h2>

        <div className="buttons">
          <Link
            to={
              pathname === "/appointments"
                ? "/appointments/calender"
                : "/appointments"
            }
          >
            <Button
              type="default"
              size="middle"
              icon={
                pathname === "/appointments" ? (
                  <FiCalendar size={16} />
                ) : (
                  <FiTable size={16} />
                )
              }
              iconPosition={"end"}
              loading={isLoading}
              disabled={isLoading || error}
            >
              {pathname === "/appointments" ? "Calender" : "Table"}
            </Button>
          </Link>

          <CSVLink
            data={data ? data.data : []}
            headers={headers}
            filename={`appointments-${
              searchParams.has("start")
                ? `${searchParams.get("start")}-${searchParams.get("end")}`
                : `all`
            }`}
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
