import { Button, Modal } from "antd";
import React, { useState } from "react";
import { RiMailSendLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import AddForm from "./AddForm";
import { CSVLink } from "react-csv";
import { useGetAllLetterQuery } from "../../redux/features/letterBox/letterBoxApi";
import { AiOutlineDownload } from "react-icons/ai";

const LetterHeader = () => {
  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, error, isLoading } = useGetAllLetterQuery({
    start: searchParams.get("start") || "",
    end: searchParams.get("end") || "",
  });

  let headers = [
    { label: "ID", key: "id" },
    { label: "Full Name", key: "full_name" },
    { label: "Mobile", key: "mobile" },
    { label: "Designation", key: "designation" },
    { label: "Company Name", key: "company_name" },
    { label: "Type", key: "category" },
    { label: "Date", key: "created_at" },
    { label: "Note", key: "note" },
  ];

  return (
    <>
      <div className="appointment__header">
        <h2>
          <RiMailSendLine className="icon" />
          <span>Complain/Request</span>
        </h2>

        <div className="buttons">
          <CSVLink
            data={data ? data.data : []}
            headers={headers}
            filename={`notes-${
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
      >
        <AddForm closeModal={() => setOpen(false)} />
      </Modal>
    </>
  );
};

export default LetterHeader;
