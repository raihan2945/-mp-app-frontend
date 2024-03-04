import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { BsFacebook, BsYoutube, BsTwitter, BsLinkedin } from "react-icons/bs";
import "../../pages/Doctor/profile.css";
import Footer from "./Footer";
import MajorInfo from "./MajorInfo";
import {
  useGetDistrictsQuery,
  useGetDivisonsQuery,
  useGetUpazilasQuery,
} from "../../redux/features/locations/locationApi";
import { useDoctorUpdatePutMutation } from "../../redux/features/doctor/doctorApi";
import dayjs from "dayjs";
import moment from "moment";
import baseUrl from "../../utils/baseUrl";

import allCountry from "./country.json";

console.log("All Country is : ", allCountry);

const { Option } = Select;

const BasicInfo = ({ id, doctor, doctorRefetch, success, error, warning }) => {
  const [messageApi, contextHolder] = message.useMessage();

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState();
  const fileInputRef = useRef();

  const dateFormat = "YYYY-MM-DD";

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [divisions, setDivisons] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [
    updateDoctor,
    { status: updateStatus, error: updateError, isSuccess: updateSuccess },
  ] = useDoctorUpdatePutMutation();

  const { data: getDivisions, refetch: divisionRefetch } =
    useGetDivisonsQuery();
  const { data: getDistricts, refetch: districtRefetch } = useGetDistrictsQuery(
    selectedDivision?.value || doctor?.division
  );
  const { data: getUpazilas, refetch: upazilaRefectch } = useGetUpazilasQuery(
    selectedDistrict?.value || doctor?.district
  );

  const handleImageSelected = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
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
    if (updateSuccess) {
      doctorRefetch();
      success("Profile updated successfully");
    }
  }, [updateStatus]);

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  useEffect(() => {
    if (getDivisions) {
      setDivisons(getDivisions?.data);
    }
  }, [getDivisions]);

  useEffect(() => {
    doctor &&
      Object.keys(doctor).forEach((key) => {
        setValue(key, doctor[key]);
      });
  }, [doctor]);

  const onSubmit = () => {
    const formValues = getValues();

    const {
      full_name,
      gender,
      address,
      bio,
      dob,
      life_family,
      title,
      website_url,
      whatsapp,
      upazila,
      facebook,
      youtube,
      linkedin,
      twitter,
      nid,
      passport_no,
      passport_validity,
      rank_profile,
      religion,
      nationality,
      marital_status,
      marage_date,
      govt_service_holder,
      hobby,
      spouse_name,
      spouse_date_of_birth,
      spouse_occupation,
      sopuse_doctor_id,
      child_information,
    } = formValues;

    const payload = {
      full_name,
      gender,
      address,
      bio,
      dob,
      life_family,
      title,
      website_url,
      whatsapp,
      upazila,
      facebook,
      youtube,
      linkedin,
      twitter,
      nid,
      passport_no,
      passport_validity,
      rank_profile,
      religion,
      nationality,
      marital_status,
      marage_date,
      govt_service_holder,
      hobby,
      spouse_name,
      spouse_date_of_birth,
      spouse_occupation,
      sopuse_doctor_id,
      child_information,
    };

    const form = new FormData();
    const submitData = {};

    Object.keys(payload).forEach((key) => {
      if (formValues[key]) {
        form.append(key, formValues[key]);
        submitData[key] = formValues[key];
      }
    });

    if (selectedDivision) {
      form.append("division", selectedDivision?.children);
    }
    if (selectedDistrict) {
      form.append("district", selectedDistrict?.children);
    }
    if (id || doctor) {
      form.append("id", id || doctor?.id);
    }
    if (image) {
      form.append("profile_photo", image);
    }

    updateDoctor({ id: doctor?.id, data: form });
  };

  // console.log("doctor is ; ", doctor);

  return (
    <div>
      <MajorInfo
        id={id}
        doctor={doctor}
        doctorRefetch={doctorRefetch}
        success={success}
        error={error}
        warning={warning}
      />

      {(doctor?.bmdc_no || doctor?.mobile || doctor?.email) && (
        <Form layout="vertical" style={{ marginTop: "1rem" }}>
          <div title="Basic Information" style={{ padding: "0px 10px" }}>
            <div>
              <p style={{ margin: 0, color: "gray" }}>Profile Photo : </p>
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
                    width: "6rem",
                    padding: ".2rem",
                    borderRadius: "5px",
                    border: "1px solid gray",
                  }}
                >
                  <img
                    src={
                      previewImage
                        ? previewImage
                        : doctor?.profile_photo
                        ? `${baseUrl}/uploads/${doctor?.profile_photo}`
                        : "/icons/profile.png"
                    }
                    style={{
                      width: "100%",
                      height: "6rem",
                      objectFit: "cover",
                    }}
                    alt="Profile"
                  />
                </div>
                <input
                  onChange={handleImageSelected}
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
                  <AiOutlineCloudUpload />
                  Upload
                </Button>
              </div>
            </div>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Title: </p>}
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input {...register("title")} type="text" class="form-control" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Full Name : </p>}
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("full_name")}
                type="text"
                class="form-control"
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Whatsapp : </p>}
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("whatsapp")}
                type="number"
                class="form-control"
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Gender : </p>}
              // name="gender"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              value={doctor?.gender}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Select
                onChange={(value) => setValue("gender", value)}
                defaultValue={doctor?.gender}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Date of Birth : </p>}
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <DatePicker
                value={watch("dob") && moment(watch("dob"), dateFormat)}
                format={dateFormat}
                placeholder="Date of birth"
                style={{ width: "100%" }}
                allowClear={false}
                onChange={(date, dateString) => {
                  // console.log("date is : ", date);
                  setValue("dob", dateString);
                }}
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Bio : </p>}
              // name="bio"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <textarea {...register("bio")} class="form-control" />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Address : </p>}
              // name="address"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                type="text"
                {...register("address")}
                class="form-control"
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Family Life : </p>}
              // name="life_family"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <textarea
                {...register("life_family")}
                class="form-control"
                style={{ fontWeight: "400" }}
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Website : </p>}
              // name="website_url"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                type="text"
                class="form-control"
                style={{ fontWeight: "400" }}
                {...register("website_url")}
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Divison : </p>}
              // name="division"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
            >
              <Select
                style={{ width: "100%" }}
                onChange={(value, option) => {
                  setSelectedDivision(option);
                }}
                value={`${
                  selectedDivision?.children ||
                  doctor?.division ||
                  "Select division"
                }`}
              >
                {divisions.map((d) => {
                  return (
                    <Option key={d.name} value={d.name}>
                      {d.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>District : </p>}
              // name="website_url"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Select
                style={{ width: "100%" }}
                onChange={(value, option) => {
                  setSelectedDistrict(option);
                }}
                value={`${
                  selectedDistrict?.children ||
                  doctor?.district ||
                  "Select district"
                }`}
              >
                {Array.isArray(getDistricts?.data) &&
                  getDistricts?.data.map((d) => {
                    return (
                      <Option key={d.id} value={d.name}>
                        {d.name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Upazila : </p>}
              // name="website_url"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Select
                style={{ width: "100%" }}
                onChange={(value, option) => {
                  setValue("upazila", value);
                }}
                value={`${
                  watch("upazila") || doctor?.upazila || "Select Upazila"
                }`}
              >
                {Array.isArray(getUpazilas?.data) &&
                  getUpazilas?.data.map((d) => {
                    return (
                      <Option key={d.id} value={d.name}>
                        {d.name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>

            <Divider
              orientation="center"
              orientationMargin={0}
              style={{ marginBottom: "0", fontSize: ".8rem" }}
            >
              Social Media
            </Divider>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={
                <div
                  style={{
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <BsFacebook style={{ color: "#0866FF" }} /> Facebook :{" "}
                </div>
              }
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("facebook")}
                type="text"
                class="form-control"
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={
                <div
                  style={{
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <BsLinkedin style={{ color: "#0A66C2" }} /> LinkedIn :{" "}
                </div>
              }
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("linkedin")}
                type="text"
                class="form-control"
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={
                <div
                  style={{
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <BsYoutube style={{ color: "red" }} /> Youtube :{" "}
                </div>
              }
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("youtube")}
                type="text"
                class="form-control"
              />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              label={
                <div
                  style={{
                    margin: 0,
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: ".5rem",
                  }}
                >
                  <BsTwitter style={{ color: "#0866FF" }} /> Twitter :{" "}
                </div>
              }
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("twitter")}
                type="text"
                class="form-control"
              />
            </Form.Item>

            <Divider
              orientation="center"
              orientationMargin={0}
              style={{ marginBottom: "0", fontSize: ".8rem" }}
            >
              Others
            </Divider>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>NID : </p>}
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input {...register("nid")} type="text" class="form-control" />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Passport No : </p>}
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("passport_no")}
                type="text"
                class="form-control"
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={
                <p style={{ margin: 0, padding: 0 }}>Passport Validity : </p>
              }
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("passport_validity")}
                type="text"
                class="form-control"
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Rank Profile : </p>}
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("rank_profile")}
                type="text"
                class="form-control"
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Religion : </p>}
              // name="gender"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              value={doctor?.religion}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Select
                onChange={(value) => setValue("religion", value)}
                defaultValue={doctor?.religion}
              >
                <Option value="1">Islam</Option>
                <Option value="2">Hindu</Option>
                <Option value="3">Christian</Option>
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Nationality : </p>}
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Select
                onChange={(value) => setValue("nationality", value)}
                defaultValue={doctor?.nationality}
              >
                {allCountry?.map((country) => (
                  <Option value={`${country?.ID}`}>
                    {country.CountryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Marital Status : </p>}
              // name="gender"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              value={doctor?.marital_status}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Select
                onChange={(value) => setValue("marital_status", value)}
                defaultValue={doctor?.marital_status}
              >
                <Option value="1">Married</Option>
                <Option value="2">Single</Option>
                {/* <Option value="3">Christian</Option> */}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Marrage Date : </p>}
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <DatePicker
                value={
                  watch("marage_date") &&
                  moment(watch("marage_date"), dateFormat)
                }
                format={dateFormat}
                placeholder="Marrage Date"
                style={{ width: "100%" }}
                allowClear={false}
                onChange={(date, dateString) => {
                  // console.log("date is : ", date);
                  setValue("marage_date", dateString);
                }}
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={
                <p style={{ margin: 0, padding: 0 }}>Govt service holder : </p>
              }
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <Select
                onChange={(value) => setValue("govt_service_holder", value)}
                defaultValue={`${doctor?.govt_service_holder}`}
              >
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
                {/* <Option value="3">Christian</Option> */}
              </Select>
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Hobby : </p>}
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input {...register("hobby")} type="text" class="form-control" />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={<p style={{ margin: 0, padding: 0 }}>Spouse Name : </p>}
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("spouse_name")}
                type="text"
                class="form-control"
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={
                <p style={{ margin: 0, padding: 0 }}>Spouse Date Of Birth : </p>
              }
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <DatePicker
                value={
                  watch("spouse_date_of_birth") &&
                  moment(watch("Spouse Date Of Birth"), dateFormat)
                }
                format={dateFormat}
                placeholder="Marrage Date"
                style={{ width: "100%" }}
                allowClear={false}
                onChange={(date, dateString) => {
                  // console.log("date is : ", date);
                  setValue("spouse_date_of_birth", dateString);
                }}
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={
                <p style={{ margin: 0, padding: 0 }}>Spouse Occupation : </p>
              }
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("spouse_occupation")}
                type="text"
                class="form-control"
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={
                <p style={{ margin: 0, padding: 0 }}>Spouse doctor id : </p>
              }
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("sopuse_doctor_id")}
                type="text"
                class="form-control"
              />
            </Form.Item>

            <Form.Item
              style={{ marginBottom: "10px" }}
              label={
                <p style={{ margin: 0, padding: 0 }}>Cild Information : </p>
              }
              // name="dob"
              labelCol={{ span: 1 }}
              wrapperCol={{ span: 6 }}
              // rules={[{ required: true, message: "Please enter your name!" }]}
            >
              <input
                {...register("child_information")}
                type="text"
                class="form-control"
              />
            </Form.Item>

            <Form.Item style={{ textAlign: "center", marginTop: "1rem" }}>
              <Button onClick={() => onSubmit()} type="primary">
                Save
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </div>
  );
};

export default BasicInfo;
