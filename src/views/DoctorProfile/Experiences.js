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
import ExperienceForm from "../Experience/ExperienceForm";
import {
  useGetDoctorExperiencesQuery,
  useDeleteDoctorExperienceMutation,
} from "../../redux/features/experience/experienceApi";
import moment from "moment";

const Experiences = ({ doctor, success, error }) => {
  const { data: getDatas, refetch } = useGetDoctorExperiencesQuery(doctor?.id);

  const [
    deleteDoctorExperience,
    { error: deleteError, status: deleteStatus, isSuccess: deleteSucces },
  ] = useDeleteDoctorExperienceMutation();

  const [isAddItem, setAddItem] = useState(false);
  const [updateItem, setUpdateitem] = useState();

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

  const deleteExperience = (id) => {
    deleteDoctorExperience(id);
  };

  // console.log("exp is  : ", getDatas)

  return (
    <>
      <div>
        {Array.isArray(getDatas?.data) &&
          getDatas?.data?.map((d) => {
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
                    <p style={{ margin: 0 }}>{d?.designation}</p>
                    <p style={{ margin: 0, fontSize: ".7rem", color: "gray" }}>
                      {d?.institute_name}
                    </p>
                    <p style={{ margin: 0, fontSize: ".7rem", color: "gray" }}>
                      {moment(d?.start_date).format("d MMM YYYY")}{" "}
                      {d?.is_currently_working == 1
                        ? "- Current"
                        : d?.end_date &&
                          ` - ${moment(d?.end_date).format("d MMM YYYY")}`}
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
                      onClick={() => setUpdateitem(d)}
                    >
                      <AiFillEdit
                        style={{ color: "green", fontSize: "1rem" }}
                      />
                    </div>
                    <Popconfirm
                      title="Delete the degree"
                      description="Are you sure to delete this degree?"
                      onConfirm={() => deleteDoctorExperience(d.id)}
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
            onClick={() => setAddItem(true)}
            type="primary"
            style={{ textAlign: "center", width: "100%" }}
          >
            Add New Degree
          </Button>
        </div>
      </div>
      <Modal
        title={updateItem ? "Update Experience" : "Add New Experience"}
        centered
        open={isAddItem || updateItem}
        onOk={() => setAddItem(false)}
        onCancel={() => {
          setAddItem(false);
          setUpdateitem(null);
        }}
        okText="Add"
        footer={null}
      >
        <ExperienceForm
          cancel={() => {
            setAddItem(false);
            setUpdateitem(null);
          }}
          doctor={doctor}
          success={success}
          error={error}
          refetch={refetch}
          update={updateItem}
        />
      </Modal>
    </>
  );
};

export default Experiences;
