import React from "react";
import {
  Button,
  Space,
  Table,
  Tag,
  Card,
  Divider,
  Skeleton,
  Modal,
} from "antd";
import FilterSection from "../../views/Filter/FilterSection";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetDoctorsQuery } from "../../redux/features/doctor/doctorApi";
import { useState } from "react";
import { useEffect } from "react";
import CreateDoctor from "../../views/DoctorProfile/CreateDoctor";

const Doctors = () => {
  const user = useSelector((state) => state?.user?.data);

  console.log("User is : ", user)

  const [doctors, setDoctors] = useState(null);
  const [createNew, setCreateNew] = useState(false);

  const { data: getDoctors, refetch} = useGetDoctorsQuery(user?.work_area_t);

  console.log("Get doctors are : ", getDoctors);

  useEffect(() => {
    if (getDoctors?.data) {
      setDoctors(getDoctors?.data);
    }
  }, [getDoctors]);

  useEffect(()=>{
    refetch()
  },[])

  return (
    <>
      <div>
        {/* <FilterSection userType="doctor" /> */}
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            padding: ".5rem 0",
          }}
        >
          <h5 style={{ color: "#3F51B5" }}>Doctors </h5>
          <Button onClick={() => setCreateNew(true)} type="primary">
            Create New Doctor
          </Button>
        </div>
        <div className="table-responsive">
          {/* <Table
        columns={columns}
        dataSource={data}
        pagination={true}
        className="ant-border-space"
      /> */}
          {doctors ? (
            doctors?.map((d) => {
              return (
                <NavLink to={`/doctors/${d?.dr_master_id || d?.id}`}>
                  <Card
                    style={{
                      padding: "0",
                      marginBottom: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: "15px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <img
                          style={{ height: "45px", width: "45px" }}
                          src="/icons/doctor.png"
                        />
                      </div>
                      <div style={{ flex: 5 }}>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: "500",
                            color: "#7F7F7F",
                          }}
                        >
                          id : #{d.dr_master_id || d.id}
                        </p>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: "600",
                            color: "#3F51B5",
                          }}
                        >
                          {d?.title}
                          {" "}{d?.doctor_name1}
                          {" "}{d?.full_name}
                        </p>
                        {/* <Divider style={{ margin: "2px 0px" }} /> */}
                        {/* <p style={{ margin: 0 }}>Shop Owner : Mr. Owner </p> */}

                        <p
                          style={{
                            margin: 0,
                            fontSize: ".8rem",
                            color: "#383838",
                          }}
                        >
                          <strong style={{fontWeight:"500"}}>Address</strong> : {" "}{d?.address}
                        </p>
                      </div>
                    </div>
                  </Card>
                </NavLink>
              );
            })
          ) : (
            <Skeleton
              avatar
              paragraph={{
                rows: 4,
              }}
            />
          )}
        </div>
      <Modal
        title="Vertically centered modal dialog"
        centered
        open={createNew}
        onOk={() => setCreateNew(false)}
        onCancel={() => setCreateNew(false)}
        footer={null}
      >
        <CreateDoctor refetch={refetch}/>
      </Modal>
      </div>
    </>
  );
};

export default Doctors;
