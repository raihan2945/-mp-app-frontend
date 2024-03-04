import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Popconfirm } from "antd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import TrainingForm from "./TrainingForm";

import "./style.css";
import {
  useDeleteDoctorTrainingMutation,
  useGetDoctorTrainingsQuery,
} from "../../redux/features/training/trainingApi";
import moment from "moment";

const Trainings = ({ doctor, success, error }) => {
  const { data: getTrainings, refetch } = useGetDoctorTrainingsQuery(
    doctor?.id
  );

  const [
    deleteTraining,
    { error: deleteError, status: deleteStatus, isSuccess: deleteSucces },
  ] = useDeleteDoctorTrainingMutation();

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
      success("Degree deleted successfully");
      refetch();
    }
  }, [deleteStatus, deleteSucces, deleteError]);

  useEffect(() => {
    refetch();
  }, []);

  //   console.log("get trainings : ", getTrainings);

  return (
    <div>
      <Card
        title="Trainings"
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
        {getTrainings?.data?.map((tr) => {
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
                    <strong>{tr?.training_on}</strong>, {tr?.institute_name} [
                    {moment(tr?.start_date).format("MMMM YYYY")} -{" "}
                    {moment(tr?.end_date).format("MMMM YYYY")}]
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
                    onClick={() => setUpdate(tr)}
                  >
                    <AiFillEdit style={{ color: "green", fontSize: "1rem" }} />
                  </div>
                  <Popconfirm
                    title="Delete the degree"
                    description="Are you sure to delete this degree?"
                    onConfirm={() => deleteTraining(tr.id)}
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
        <TrainingForm
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
