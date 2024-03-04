import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Collapse,
  Divider,
  Tabs,
} from "antd";
import { AiOutlineCloudUpload, AiFillSave } from "react-icons/ai";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { SettingOutlined, CaretRightOutlined } from "@ant-design/icons";
import "./profile.css";
import BasicInfo from "../../views/DoctorProfile/BasicInfo";
import Chambers from "../../views/DoctorProfile/Chambers";
import ProfessionalInfo from "../../views/DoctorProfile/ProfessionalInfo";
import Degrees from "../../views/DoctorProfile/Degrees";
import Experiences from "../../views/DoctorProfile/Experiences";
import { useParams } from "react-router-dom";
import { useGetDoctorProfileQuery } from "../../redux/features/doctor/doctorApi";
import Brand from "../../views/DoctorProfile/Brand";
import Career from "../../views/DoctorProfile/Career";

const { Panel } = Collapse;
const { Option } = Select;
const { TabPane } = Tabs;

const Profile = () => {
  const params = useParams();
  const id = params.id;
  const [messageApi, contextHolder] = message.useMessage();

  const [image, setImage] = useState(null);

  const [doctor, setDoctor] = useState(null);

  const { data: getDoctor, refetch: doctorRefetch } =
    useGetDoctorProfileQuery(id);

  const onFinish = () => {};

  //* : MESSAGES
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: message || "Success",
    });
  };

  const error = (message) => {
    messageApi.open({
      type: "error",
      content: message || "Error",
    });
  };

  const warning = (message) => {
    messageApi.open({
      type: "warning",
      content: message || "Warning",
    });
  };

  useEffect(() => {
    if (getDoctor?.data) {
      setDoctor(getDoctor?.data);
    }
  }, [getDoctor]);

  useEffect(() => {
    doctorRefetch();
  }, []);

  // console.log("Doctor is ======= : ",doctor)

  return (
    <div style={{ position: "relative" }}>
      {contextHolder}
      <h5>Doctor</h5>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 12 }}
        onFinish={onFinish}
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Basic Info" key="1">
            <BasicInfo
              id={id}
              doctor={doctor}
              doctorRefetch={doctorRefetch}
              success={success}
              error={error}
              warning={warning}
            />
          </TabPane>
          {doctor && (
            <TabPane tab=" Professional Info" key="2">
              <ProfessionalInfo
                doctor={doctor}
                doctorRefetch={doctorRefetch}
                success={success}
                error={error}
                warning={warning}
              />
            </TabPane>
          )}
          {doctor && (
            <TabPane tab="Chambers" key="3">
              <Chambers
                doctor={doctor}
                success={success}
                error={error}
                warning={warning}
              />
            </TabPane>
          )}
          {doctor && (
            <TabPane tab="Brand" key="4">
              <Brand
                doctor={doctor}
                success={success}
                error={error}
                warning={warning}
              />
            </TabPane>
          )}
          {doctor && (
            <TabPane tab="Degrees" key="5">
              <Degrees doctor={doctor} success={success} error={error} />
            </TabPane>
          )}
          {doctor && (
            <TabPane tab="Experiences" key="6">
              <Experiences doctor={doctor} success={success} error={error}/>
            </TabPane>
          )}
          {doctor && (
            <TabPane tab="Career" key="7">
              <Career doctor={doctor} success={success} error={error}/>
            </TabPane>
          )}
        </Tabs>
      </Form>

      {/* <div
        onClick={() => success()}
        style={{
          position: "fixed",
          right: "20px",
          bottom: "20px",
          cursor: "pointer",
          backgroundColor: "#006BB1",
          padding: "5px 5px",
          borderRadius: "5px",
          boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
        }}
      >
        <AiFillSave style={{ fontSize: "2rem", color: "white" }} />
      </div> */}
    </div>
  );
};

export default Profile;
