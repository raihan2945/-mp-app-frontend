import React, { useEffect, useState } from "react";
import { DatePicker, Input, Select } from "antd";
import "./Appointment.css";

import { FiSearch } from "react-icons/fi";
import AppointmentTable from "../../views/Appointments/AppointmentTable";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import { dateFormatter } from "../../utils/format";
import AppointmentHeader from "../../views/Appointments/AppointmentHeader";

const { RangePicker } = DatePicker;

const Appointments = () => {
  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (debounceValue.length != 0) {
      searchParams.set("p", 1);
      searchParams.set("q", debounceValue);
    } else {
      searchParams.delete("q");
    }
    setSearchParams(searchParams);
  }, [debounceValue]);

 

  return (
    <>
      {/* header */}
      <AppointmentHeader />

      <div className="data-table__container">
        {/* data table filters and sorting */}
        <div className="appointment__table-filter">
          <RangePicker
            onCalendarChange={(value) => {
              if (value != null && value[0] != null && value[1] != null) {
                searchParams.set("p", 1);
                searchParams.delete("q");
                searchParams.set("start", dateFormatter(value[0].$d));
                searchParams.set("end", dateFormatter(value[1].$d));
              } else {
                searchParams.delete("start");
                searchParams.delete("end");
              }

              setSearchParams(searchParams);
            }}
          />

          <div className="data-table-inputs">
            {/* page size */}
            <Select
              style={{ width: "100px" }}
              value={searchParams.get("size")}
              onChange={(value) => {
                searchParams.set("p", 1);
                searchParams.set("size", value);
                setSearchParams(searchParams);
              }}
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

      
    </>
  );
};

export default Appointments;
