import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, Modal } from "antd";
import "./Appointment.css";
import { IoMdAdd } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import AppointmentTable from "../../views/Appointments/AppointmentTable";
import AppointmentForm from "../../views/Appointments/AppointmentForm";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

const { RangePicker } = DatePicker;

const Appointments = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (debounceValue.length === 0) {
      setSearchParams(searchParams.delete("q"));
    } else {
      setSearchParams({ ...searchParams, q: debounceValue });
    }
  }, [debounceValue]);

  return (
    <>
      {/* header */}
      <div className="appointment__header">
        <h2>Appointments</h2>
        <Button
          type="primary"
          size="medium"
          icon={<IoMdAdd />}
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
      </div>

      <div className="data-table__container">
        {/* data table filters and sorting */}
        <div className="appointment__table-filter">
          <RangePicker />

          <Input
            placeholder="Search by name"
            style={{ width: "200px", padding: "0 1rem" }}
            prefix={<FiSearch />}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        {/* data table */}
        <div className="appointment__table">
          <AppointmentTable />
        </div>
      </div>

      {/* form modal */}
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        footer={false}
      >
        <AppointmentForm />
      </Modal>
    </>
  );
};

export default Appointments;
