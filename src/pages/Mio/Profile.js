import React, { useEffect, useRef, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Form, Input, Button, Divider, message, Card, DatePicker } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  useGetProfileQuery,
  useUpdateUserMutation,
} from "../../redux/features/user/userApi";
// import dayjs from "dayjs";

import "../Doctor/profile.css";
import baseUrl from "../../utils/baseUrl";
import moment from "moment";

const Profile = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [profile, setProfile] = useState();

  const { data: getProfile, refetch } = useGetProfileQuery();
  const [updateProfile, { status: updateStatus, error: updateError, isSuccess:updateSuccess }] =
    useUpdateUserMutation();

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const fileInputRef = useRef();

  const dateFormat = 'YYYY/MM/DD';

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

  const handleFileSelected = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const onFinish = async (values) => {
    const data = { ...values };

    delete data.birthday;
    delete data.sap_user_code;

    data.dob = profile.dob;

    const form = new FormData()
    Object.keys(data).forEach(item=>{
      if(data[item]){
        form.append(item, data[item])
      }
    })
    if(file){
      form.append('image', file)
    }

    updateProfile({ id: profile?.work_area_t, data:form}).unwrap()
  };

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
    if(updateSuccess){
      refetch()
      success("Profile updated successfully")
    }
  }, [updateStatus]);

  useEffect(() => {
    if (getProfile?.data) {
      setProfile(getProfile?.data);
    }
  }, [getProfile]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(()=>{
    refetch()
  },[])

  return (
    <Card style={{ padding: "0px 10px" }}>
      {contextHolder}
      {profile && (
        <Form
          // form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          initialValues={{birthday:moment(profile?.dob, dateFormat),...profile}}
          onFinish={onFinish}
          layout="vertical"
        >

          <div
            style={{
              margin: ".5rem 0rem",
              display: "flex",
              alignItems: "end",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: "9rem",
                height:"9rem",
                padding: ".2rem",
                borderRadius: "5px",
                border: "1px solid gray",
              }}
            >
              <img
                src={
                  previewImage
                    ? previewImage
                    : profile.profile_photo
                    ? `${baseUrl}/uploads/${profile?.profile_photo}`
                    : "/icons/profile.png"
                }
                style={{ width: "100%",height:"100%", objectFit: "cover" }}
                alt="Profile"
              />
            </div>
            <input
              onChange={handleFileSelected}
              ref={fileInputRef}
              style={{ display: "none" }}
              type="file"
              accept="/*image/"
            />
            <Button
              size="small"
              onClick={() => fileInputRef.current.click()}
              style={{ marginTop: ".5rem" }}
            >
              <UploadOutlined />
              Upload
            </Button>
          </div>

          <Form.Item
            style={{ marginBottom: "10px", marginTop: "15px" }}
            label="SAP Id"
            name="sap_user_code"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              disabled={true}
              placeholder="SAP Id"
              style={{ fontWeight: "400" }}
            />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px" }}
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input
              value={profile.name}
              placeholder="Full Name"
              style={{ fontWeight: "400" }}
            />
          </Form.Item>
          <Form.Item
            label="Mobile"
            style={{ marginBottom: "10px" }}
            name="mobile_number"
            rules={[{ required: true, message: "Please enter mobile number!" }]}
          >
            <Input placeholder="Mobile No." style={{ fontWeight: "400" }} />
          </Form.Item>

          <Form.Item
            // label="Email"
            style={{ marginBottom: "10px" }}
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Email" style={{ fontWeight: "400" }} />
          </Form.Item>

          <Form.Item
            label="Date of birth"
            style={{ marginBottom: "10px" }}
            name="birthday"
         
          >
            <DatePicker
              onChange={(date, dateString) => {
                const pr = { ...profile };
                pr.dob = dateString;
                setProfile(pr);
              }}
              // value={moment('2015/01/01', dateFormat)}
              format={dateFormat}
              style={{ width: "100%" }}
              allowClear={false}
            />
          </Form.Item>

          <Divider
            style={{ margin: "7px 0px", fontSize: "12px", color: "gray" }}
            orientation="left"
          >
            Others
          </Divider>

          <Form.Item
            label="Whatsapp"
            style={{ marginBottom: "10px" }}
            name="whatsapp"
            // rules={[
            //   { required: true, message: "Please enter your email!" },
            //   { type: "email", message: "Please enter a valid email address!" },
            // ]}
          >
            <Input
              placeholder="Whatsapp Number"
              style={{ fontWeight: "400" }}
            />
          </Form.Item>
          <Form.Item
            label="Other Mobile"
            style={{ marginBottom: "10px" }}
            name="other_mobile"
            // rules={[
            //   { required: true, message: "Please enter your email!" },
            //   { type: "email", message: "Please enter a valid email address!" },
            // ]}
          >
            <Input
              placeholder="Other Mobile Number"
              style={{ fontWeight: "400" }}
            />
          </Form.Item>
          <Form.Item
            label="Other Email"
            style={{ marginBottom: "10px" }}
            name="other_email"
            // rules={[
            //   { required: true, message: "Please enter your email!" },
            //   { type: "email", message: "Please enter a valid email address!" },
            // ]}
          >
            <Input
              placeholder="Other Email Address"
              style={{ fontWeight: "400" }}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginTop: "1rem" }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      )}
    </Card>
  );
};

export default Profile;
