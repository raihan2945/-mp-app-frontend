import { Button, Select } from "antd";
import React from "react";
import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const CalenderHeader = () => {

    const [searchParams, setSearchParams] = useSearchParams()

  return (
    <>
      <div className="calender-header">
        <div className="left-content">
          <div className="icons">
            <button className="btn--icon">
              <FaChevronLeft />
            </button>
            <button className="btn--icon">
              <FaChevronRight />
            </button>
          </div>

          {/* caleder month */}
          <div className="calender-header__month">
            <h2>July 2024</h2>
          </div>
        </div>

        <div className="right-content">
          {/* today button */}
          <Button>Today</Button>

          <Select
            style={{ width: "100px", fontSize: '14px' }}
            value={searchParams.get("v")}
            onChange={(value) => {
              searchParams.set("v", value);
              setSearchParams(searchParams);
            }}
            defaultValue={"m"}
            size="large"
            placeholder="View"
            suffixIcon={<FaChevronDown />}
          >
            <Select.Option value="m">Month</Select.Option>
            <Select.Option value="d">Day</Select.Option>
          </Select>
        </div>
      </div>
    </>
  );
};

export default CalenderHeader;
