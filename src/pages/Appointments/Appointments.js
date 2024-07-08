import React, { useEffect, useRef, useState } from "react";
import { Button, DatePicker, Input, Modal, Select } from "antd";
import "./Appointment.css";
import { IoMdAdd } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import AppointmentTable from "../../views/Appointments/AppointmentTable";
import AppointmentForm from "../../views/Appointments/AppointmentForm";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { dateFormatter } from "../../utils/format";

const { RangePicker } = DatePicker;

const Appointments = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const debounceValue = useDebounce(search);
  const [searchParams, setSearchParams] = useSearchParams();

  const [size, setSize] = useState(searchParams.get("size") || 10);

  useEffect(() => {
    if (debounceValue.length != 0) {
      setSearchParams({ q: debounceValue, p: 1, size: size });
    } else {
      setSearchParams(searchParams.delete("q"));
    }
  }, [debounceValue]);

  useEffect(() => {
    if (size != 10) {
      setSearchParams({ p: 1, size: size });
    } else {
      setSearchParams(searchParams.delete("size"));
    }
  }, [size]);

  useEffect(() => {
    if (dateRange != null && dateRange[0] != null) {
      setSearchParams({
        p: 1,
        size: 10,
        start: dateFormatter(dateRange[0]._d),
        end: dateFormatter(dateRange[1] ? dateRange[1]._d : dateRange[0]._d ),
      });
    } else {
      setSearchParams(searchParams.delete('start'))
    }
  }, [dateRange]);

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
          <RangePicker
            onCalendarChange={(value) => {
              setDateRange(value);
            }}
          />

          <div className="data-table-inputs">
            {/* page size */}
            <Select
              style={{ width: "100px" }}
              value={size}
              onChange={setSize}
              size="large"
              placeholder="Select page size"
              suffixIcon={<FaChevronDown />}
            >
              <Select.Option value="10">10</Select.Option>
              <Select.Option value="20">20</Select.Option>
              <Select.Option value="50">50</Select.Option>
            </Select>

            {/* search entities */}
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
        <AppointmentForm closeModal={() => setOpen(false)} />
      </Modal>
    </>
  );
};

export default Appointments;
