import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Card,
  Select,
  message,
  Collapse,
  Modal,
  Popconfirm,
} from "antd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import "../../pages/Doctor/profile.css";
import DegreeForm from "../Degree/DegreeForm";
import {
  useDeleteDoctorDegreeMutation,
  useGetDoctorDegreesQuery,
} from "../../redux/features/degree/degreeApi";

const Degrees = ({ doctor, success, error }) => {
  const { data: getDegrees, refetch } = useGetDoctorDegreesQuery(doctor?.id);

  const [
    deleteDoctorDegree,
    { error: deleteError, status: deleteStatus, isSuccess: deleteSucces },
  ] = useDeleteDoctorDegreeMutation();

  const [isAddDegree, setAddDegree] = useState(false);
  const [updateDegree, setUpdateDegree] = useState();

  useEffect(() => {
    refetch();
  }, []);

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

  const deleteDegree = (id) => {
    deleteDoctorDegree(id);
  };

  return (
    <>
      <div>
        {Array.isArray(getDegrees?.data) &&
          getDegrees?.data?.map((d) => {
            return (
              <Card style={{ padding: "0", marginBottom: "5px" }}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <div>
                    <p style={{ margin: 0 }}>
                      {d.degree_name}
                      {d.sector_name && " in "} {d.sector_name}
                    </p>
                    <p style={{ margin: 0, fontSize: ".7rem", color: "gray" }}>
                      {d.institute_name}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid green",
                        padding: "3px 5px",
                        borderRadius: "3px",
                      }}
                      onClick={() => setUpdateDegree(d)}
                    >
                      <AiFillEdit
                        style={{ color: "green", fontSize: "1rem" }}
                      />
                    </div>
                    <Popconfirm
                      title="Delete the degree"
                      description="Are you sure to delete this degree?"
                      onConfirm={() => deleteDegree(d.id)}
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
        <div style={{ width: "100%", textAlign: "center" }}>
          <Button
            onClick={() => setAddDegree(true)}
            type="primary"
            style={{ textAlign: "center", width: "100%" }}
          >
            Add New Degree
          </Button>
        </div>
      </div>
      <Modal
        title={updateDegree ? "Update Degree" : "Add new Degree"}
        centered
        open={isAddDegree || updateDegree}
        onOk={() => setAddDegree(false)}
        onCancel={() => {
          setAddDegree(false);
          setUpdateDegree(null);
        }}
        okText="Add"
        footer={null}
      >
        <DegreeForm
          cancel={() => {
            setAddDegree(false);
            setUpdateDegree(null);
          }}
          doctor={doctor}
          success={success}
          error={error}
          refetch={refetch}
          updateDegree={updateDegree}
        />
      </Modal>
    </>
  );
};

export default Degrees;
