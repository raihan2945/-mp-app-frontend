import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  Button,
  Select,
  message,
  Collapse,
  Divider,
  Tabs,
  Modal,
  Popconfirm,
} from "antd";

import "../../pages/Doctor/profile.css";
import {
  useCreateChamberMutation,
  useDeleteChamberMutation,
  useGetChambersQuery,
  useUpdateChamberMutation,
} from "../../redux/features/chamber/chamberApi";
import HospitalForm from "../Hospital/HospitalForm";
import ChamberForm from "../Chamber/ChamberForm";

const { Panel } = Collapse;

const Chambers = ({ doctor, success, error, warning }) => {
  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const [chambers, setChambers] = useState([]);

  console.log("chambers : ", chambers)

  const { data: getChambers, refetch: refetchChambers } = useGetChambersQuery(
    doctor?.id
  );
  const [
    createChamber,
    { error: createError, status: createStatus, isSuccess: createSuccess },
  ] = useCreateChamberMutation();
  const [
    updateChamber,
    { error: updateError, status: updateStatus, isSuccess: updateSuccess },
  ] = useUpdateChamberMutation();
  const [
    deleteChamber,
    { error: deleteError, status: deleteStatus, isSuccess: deleteSucces },
  ] = useDeleteChamberMutation();

  const [isAddChmaber, setAddChamber] = useState(false);
  const [editChamber, setEditChamber] = useState();
  const [isHospital, setIsHospital] = useState(false);

  const [selectdHospital, setSelectedHospital] = useState(null);

  const resetAndClose = (chamber) => {
    if (chamber) {
      Object.keys(chamber).forEach((key) => {
        setValue(key, undefined);
      });
    }

    if (selectdHospital) {
      setSelectedHospital(null);
    }

    setAddChamber(false);
    setEditChamber(null);
  };

  useEffect(() => {
    if (getChambers) {
      const newDatas = getChambers.data.map((row) => {
        let parsedHospital;
        try {
          parsedHospital = JSON.parse(row.hospital);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          parsedHospital = null; // Handle the error, e.g., set to null or provide a default value
        }

        return {
          ...row,
          hospital: parsedHospital,
        };
      });

      setChambers(newDatas);
    }
  }, [getChambers]);

  const onEdit = (chamber) => {
    Object.keys(chamber).forEach((key) => {
      if (key == "available_days") {
        const days = JSON.parse(chamber[key]);
        setValue(key, days);
      } else if (key == "hospital") {
        setSelectedHospital(chamber[key]);
      } else if (key == "speciality") {
        setValue(key, { value: chamber[key], label: chamber?.speciality_name });
      } else {
        setValue(key, chamber[key]);
      }
    });
    setEditChamber(chamber);
  };

  const submit = () => {
    if (!selectdHospital) {
      error("Hospital is required");
      return;
    }

    const formValues = getValues();

    const submitData = {};
    Object.keys(formValues).forEach((key) => {
      if (formValues[key]) {
        if (key == "speciality") {
          submitData[key] = watch("speciality")?.value;
        } else {
          submitData[key] = formValues[key];
        }
      }
    });
    submitData.dr_id = doctor?.id;
    submitData.hospital_id = selectdHospital?.id;

    if (editChamber) {
      delete submitData.updated_at;
      delete submitData.created_at;
      delete submitData.uuid;
      delete submitData.hosptial;
      delete submitData.speciality_name;

      updateChamber({ id: editChamber?.id, data: submitData });
    } else {
      createChamber(submitData);
    }
  };

  useEffect(() => {
    refetchChambers();
  }, []);

  useEffect(() => {
    if (updateError) {
      if (updateError.status == 400) {
        updateError.data.error.map((er) => {
          return error(er);
        });
      }
      if (updateError.status == 500) {
        error("Server Error : 500");
      }
    }
    if (updateSuccess) {
      resetAndClose(editChamber);
      refetchChambers();
      refetchChambers();
      success("Chamber updated successfully");
    }
  }, [updateStatus, updateSuccess, updateError]);

  useEffect(() => {
    if (createError) {
      if (createError.status == 400) {
        createError.data.error.map((er) => {
          return error(er);
        });
      }
      if (createError.status == 500) {
        error("Server Error : 500");
      }
    }
    if (createSuccess) {
      resetAndClose(editChamber);
      refetchChambers();
      success("Chamber updated successfully");
    }
  }, [createStatus]);

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
      refetchChambers();
      success("Chamber deleted successfully");
    }
  }, [deleteStatus]);

  return (
    <>
      <div style={{ marginTop: "5px" }}>
        <div
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 0, color: "#006BB1" }}>Chambers</p>{" "}
              <Button
                type="primary"
                style={{ fontSize: ".7rem", backgroundColor: "#006BB1" }}
                size="small"
              >
                Add Chamber
              </Button>
            </div>
          }
          style={{ padding: "0px 0px" }}
        >
          <Collapse
            style={{ backgroundColor: "white" }}
            bordered={false}
            accordion
          >
            {chambers?.map((chamber, index) => {
              return (
                <Panel
                  header={
                    <div>
                      <p style={{ margin: 0, fontWeight: "500" }}>
                        {chamber?.hospital?.name}
                      </p>
                      <p style={{ margin: 0 }}>
                        {" "}
                        {chamber?.hospital?.upazila}{" "}
                        {chamber?.hospital?.upazila && ","}{" "}
                        {chamber?.hospital?.district}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: ".8rem",
                          fontWeight: "500",
                          color: "#616161",
                        }}
                      >
                        {chamber?.add_address}
                      </p>
                    </div>
                  }
                  key={index}
                >
                  <div>
                    <div>
                      <p style={{ margin: 0, fontSize: ".7rem" }}>Address</p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: ".8rem",
                          fontWeight: "500",
                          color: "#616161",
                        }}
                      >
                        {chamber?.hospital?.upazila}{" "}
                        {chamber?.hospital?.upazila && ","}{" "}
                        {chamber?.hospital?.full_address}
                      </p>
                      <Divider style={{ margin: "5px 0px" }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: ".7rem" }}>Addtional Address</p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: ".8rem",
                          fontWeight: "500",
                          color: "#616161",
                        }}
                      >
                        {chamber?.add_address}
                      </p>
                      <Divider style={{ margin: "5px 0px" }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: ".7rem" }}>
                        Appointment Booking Number
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: ".8rem",
                          fontWeight: "500",
                          color: "#616161",
                        }}
                      >
                        0{chamber?.assistant_no}
                      </p>
                      <Divider style={{ margin: "5px 0px" }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: ".7rem" }}>
                        Available Days
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: ".8rem",
                          fontWeight: "500",
                          color: "#616161",
                        }}
                      >
                        {chamber?.available_days &&
                          JSON.parse(chamber?.available_days).map(
                            (c, index) => `${index == 0 ? "" : ","} ${c}`
                          )}
                      </p>
                      <Divider style={{ margin: "5px 0px" }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: ".7rem" }}>
                        Available Time
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: ".8rem",
                          fontWeight: "500",
                          color: "#616161",
                        }}
                      >
                        {chamber?.start_time} - {chamber?.end_time}
                      </p>
                      <Divider style={{ margin: "5px 0px" }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: ".7rem" }}>
                        Consultaion Duration
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: ".8rem",
                          fontWeight: "500",
                          color: "#616161",
                        }}
                      >
                        {chamber?.consultation_duration}
                      </p>
                      <Divider style={{ margin: "5px 0px" }} />
                    </div>
                    <div style={{ display: "flex", gap: "15px" }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: ".7rem" }}>
                          In-clinic consultation fee
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "#2ECD71",
                          }}
                        >
                          ৳ {chamber?.fee_regular}
                        </p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: ".7rem" }}>
                          Follow-up fee
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "1.2rem",
                            fontWeight: "500",
                            color: "#2ECD71",
                          }}
                        >
                          ৳ {chamber?.follow_up_fee}
                        </p>
                      </div>
                    </div>
                    {/* <Divider style={{ margin: "5px 0px" }} /> */}
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        justifyContent: "center",
                        marginTop: "5px",
                      }}
                    >
                      <Button
                        size="small"
                        style={{
                          fontSize: ".6rem",
                          color: "red",
                          borderColor: "red",
                          fontWeight: 400,
                        }}
                      >
                        <Popconfirm
                          title="Are you sure to delete this chamber?"
                          onConfirm={() => deleteChamber(chamber?.id)}
                          // onCancel={cancel}
                          okText="Yes"
                          cancelText="No"
                        >
                          Delete
                        </Popconfirm>
                      </Button>
                      <Button
                        size="small"
                        style={{
                          fontSize: ".6rem",
                          color: "#006BB1",
                          borderColor: "#006BB1",
                          fontWeight: 400,
                        }}
                        onClick={() => onEdit(chamber)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Panel>
              );
            })}
          </Collapse>
        </div>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Button
            onClick={() => setAddChamber(true)}
            type="primary"
            style={{ textAlign: "center", width: "100%" }}
          >
            Add New Chamber
          </Button>
        </div>
      </div>

      <Modal
        title="Add New Chamber"
        centered
        open={isAddChmaber || editChamber}
        onOk={() => submit()}
        onCancel={() => {
          resetAndClose(editChamber);
        }}
        okText={editChamber ? "Update" : "Add"}
      >
        <ChamberForm
          chamber={editChamber}
          register={register}
          setValue={setValue}
          watch={watch}
          setIsHospital={setIsHospital}
          selectdHospital={selectdHospital}
        />
      </Modal>

      <Modal
        title="Hospital"
        centered
        open={isHospital}
        // onOk={() => submit()}
        onCancel={() => {
          setIsHospital(false);
        }}
        okText="Add"
        footer={null}
      >
        <HospitalForm
          setIsHospital={setIsHospital}
          setSelectedHospital={setSelectedHospital}
          success={success}
          warning={warning}
          error={error}
        />
      </Modal>
    </>
  );
};

export default Chambers;
