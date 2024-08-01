import { Button, Modal } from "antd";
import React, { useState } from "react";
import { RiMailSendLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import AddForm from "./AddForm";


const LetterHeader = () => {

  const [open, setOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="appointment__header">
        <h2>
          <RiMailSendLine className="icon" />
          <span>Complain/Request</span>
        </h2>

        <div className="buttons">
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
        {/* <AppointmentForm closeModal={() => setOpen(false)} /> */}
        <AddForm closeModal={() => setOpen(false)} />
      </Modal>
    </>
  );
};

export default LetterHeader;
