import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Popconfirm } from "antd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import "./style.css";
import {
  useDeleteDoctorTrainingMutation,
  useGetDoctorTrainingsQuery,
} from "../../redux/features/training/trainingApi";
import moment from "moment";
import ResearchForm from "./ResearchForm";
import { useDeleteDoctorResearchMutation, useGetDoctorResearchsQuery } from "../../redux/features/research/researchApi";

const Trainings = ({ doctor, success, error }) => {
  const { data: getResearchs, refetch } = useGetDoctorResearchsQuery(
    doctor?.id
  );

  const [
    deleteResearch,
    { error: deleteError, status: deleteStatus, isSuccess: deleteSucces },
  ] = useDeleteDoctorResearchMutation();

  const [isCreate, setIsCreate] = useState(false);

  const [update, setUpdate] = useState(false);

  const cancelModal = () => {
    setIsCreate(false);
    setUpdate(null);
  };

  useEffect(() => {
    if (deleteError) {
      if (deleteError.status == 400) {
        deleteError.data.error.map((er) => {
          return error(er);
        });
      }
      if (deleteError.status == 500) {
        error("Server Error : 500");
      }
    }
    if (deleteSucces) {
      success("Research deleted successfully");
      refetch();
    }
  }, [deleteStatus, deleteSucces, deleteError]);

  useEffect(() => {
    refetch();
  }, []);

  // console.log("research is  : ", getResearchs);

  return (
    <div>
      <Card
        title="Research"
        extra={
          <Button
            type="primary"
            // style={{ backgroundColor: "#1a7ab9" }}
            size="small"
            onClick={() => setIsCreate(true)}
          >
            Add
          </Button>
        }
      >
        {getResearchs?.data?.map((jr) => {
          return (
            <Card
              style={{ padding: "0", marginBottom: "5px", boxShadow: "none" }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <div style={{ flex: 4 }}>
                  <p style={{ margin: 0 }}>
                    {/* {d.degree_name}
                {d.sector_name && " in "} {d.sector_name} */}
                    <strong>{jr?.journal_name}</strong>, {jr?.position} [
                    {jr?.type}] -{" "}
                    {moment(jr?.publication_date).format("MMMM, YYYY")}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    flex: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      border: "1px solid green",
                      padding: "3px 5px",
                      borderRadius: "3px",
                    }}
                    onClick={() => setUpdate(jr)}
                  >
                    <AiFillEdit style={{ color: "green", fontSize: "1rem" }} />
                  </div>
                  <Popconfirm
                    title="Delete the degree"
                    description="Are you sure to delete this degree?"
                    onConfirm={() => deleteResearch(jr?.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <div
                      style={{
                        border: "1px solid red",
                        padding: "3px 5px",
                        borderRadius: "3px",
                      }}
                    >
                      <AiFillDelete
                        style={{ color: "red", fontSize: "1rem" }}
                      />
                    </div>
                  </Popconfirm>
                </div>
              </div>
            </Card>
          );
        })}
      </Card>

      {/* -----Input form */}
      <Modal open={isCreate || update} onCancel={cancelModal} footer={null}>
        <ResearchForm
          doctor={doctor}
          cancel={cancelModal}
          update={update}
          refetch={refetch}
          success={success}
          error={error}
        />
      </Modal>
    </div>
  );
};

export default Trainings;
