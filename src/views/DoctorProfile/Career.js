import React from "react";
import { Button, Card, Popconfirm } from "antd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Trainings from "../Training/Trainings";
import Researchs from "../Research/Researchs";

const Career = ({ doctor, success, error }) => {
  return (
    <div>
      <Trainings doctor={doctor} success={success} error={error} />
      <div style={{ marginTop: "1rem" }}>
        <Researchs doctor={doctor} success={success} error={error} />
      </div>
    </div>
  );
};

export default Career;
