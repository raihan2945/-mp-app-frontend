import { Button } from "antd";
import React from "react";
import { RiMailSendLine } from "react-icons/ri";
import { CSVLink } from "react-csv";
import { IoMdAdd } from "react-icons/io";
import { Link, useSearchParams } from "react-router-dom";

const LetterHeader = () => {

    const [searchParams, setSearchParams] = useSearchParams()

  return (
    <>
      <div className="appointment__header">
        <h2>
          <RiMailSendLine className="icon" />
          <span>Letter Box</span>
        </h2>

        <div className="buttons">
         

          <Button
            type="primary"
            size="middle"
            icon={<IoMdAdd size={16} />}
            // onClick={() => {
            //   setOpen(true);
            // }}
          >
            Add
          </Button>
        </div>
      </div>
    </>
  );
};

export default LetterHeader;
