import React, { useState } from "react";
import { Button, DatePicker, Input, Modal } from "antd";
import "./Appointment.css";
import { IoMdAdd } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import AppointmentTable from "../../views/Appointments/AppointmentTable";
import AppointmentForm from "../../views/Appointments/AppointmentForm";

const { RangePicker } = DatePicker;
const { Search } = Input;

const Appointments = () => {

  const [open, setOpen] = useState(false)

  return (
    <>
      {/* header */}
      <div className="appointment__header">
        <h2>Appointments</h2>
        <Button type="primary" size="medium" icon={<IoMdAdd />} onClick={() => {setOpen(true)}}>
          Add
        </Button>
      </div>

      <div className="data-table__container">
        {/* data table filters and sorting */}
        <div className="appointment__table-filter">
          <RangePicker />

          <Input
            placeholder="Search by name"
            style={{ width: "200px", padding: '0 1rem' }}
            prefix={<FiSearch />}
          />
        </div>

        {/* data table */}
        <div className="appointment__table">
          <AppointmentTable />
        </div>
      </div>

      {/* form modal */}
      <Modal open={open} onCancel={() => setOpen(false)} centered footer={false} >
        <AppointmentForm />
      </Modal>
    </>
  );
};

export default Appointments;
