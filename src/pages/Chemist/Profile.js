import React, { useEffect, useRef, useState } from "react";
import ImgCrop from "antd-img-crop";
import { Form, Input, Button, Divider, message, Card, Select } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { AiOutlineCloudUpload } from "react-icons/ai";
import {
  useGetChemistProfileQuery,
  useUpdateChemistMutation,
} from "../../redux/features/chemist/chemistApi";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  useGetDistrictsQuery,
  useGetDivisonsQuery,
  useGetUpazilasQuery,
} from "../../redux/features/locations/locationApi";
import { useGetProfileQuery } from "../../redux/features/user/userApi";
import baseUrl from "../../utils/baseUrl";
const { Option } = Select;

const Profile = () => {
  const params = useParams();
  const id = params.id;

  const { data: user } = useGetProfileQuery();

  const [profile, setProfile] = useState();

  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState();
  const fileInputRef = useRef();

  const [shopPhoto, setShopPhoto] = useState(null);
  const [shopPreview, setShopPreview] = useState(null);
  const shopPhotoRef = useRef();
  const [messageApi, contextHolder] = message.useMessage();

  const [divisions, setDivisons] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // console.log("Selected divison is :", selectedDistrict);

  const { register, handleSubmit, watch, setValue } = useForm();

  const {
    data: getProfile,
    refetch,
    isLoading,
  } = useGetChemistProfileQuery(id);
  const [
    updateChemist,
    { error: updateError, isSuccess: updateSuccess, status: updateStatus },
  ] = useUpdateChemistMutation();

  const { data: getDivisions, refetch: divisionRefetch } =
    useGetDivisonsQuery();
  const { data: getDistricts, refetch: districtRefetch } = useGetDistrictsQuery(
    selectedDivision?.value || profile?.division
  );
  const { data: getUpazilas, refetch: upazilaRefectch } = useGetUpazilasQuery(
    selectedDistrict?.value || profile?.district
  );

  const handleFileSelected = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

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
      refetch();
      success("Profile updated successfully");
    }
  }, [updateStatus]);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(() => {
    if (shopPhoto) {
      const reader = new FileReader();
      reader.onload = () => {
        setShopPreview(reader.result);
      };
      reader.readAsDataURL(shopPhoto);
    }
  }, [shopPhoto]);

  useEffect(() => {
    if (getProfile) {
      setProfile(getProfile?.data);
    }
  }, [getProfile]);

  useEffect(() => {
    if (profile) {
      Object.keys(profile).forEach((key) => {
        if (key !== "uuid" || key !== "created_at") {
          setValue(key, profile[key]);
        }
      });
    }
  }, [profile]);

  useEffect(() => {
    if (getDivisions) {
      setDivisons(getDivisions?.data);
    }
  }, [getDivisions]);

  useEffect(() => {
    // districtRefetch(),
    //  upazilaRefectch();
  }, [selectedDivision, selectedDistrict]);

  useEffect(() => {
    refetch();
    divisionRefetch();
  }, []);

  const onSubmit = ({
    name1,
    mobile,
    email,
    contact_person,
    street1,
    other_mobile,
    upazila,
    whatsapp
  }) => {
    const form = new FormData();

    const payload = {
      name1,
      mobile,
      email,
      contact_person,
      street1,
      contact_person,
      other_mobile,
      upazila,
      whatsapp
    };

    Object.keys(payload).forEach((key) => {
      if (watch(key)) {
        form.append(key, watch(key));
      }
    });

    if (selectedDivision) {
      form.append("division", selectedDivision?.children);
    }
    if (selectedDistrict) {
      form.append("district", selectedDistrict?.children);
    }
    form.append("mio_code", user?.data?.work_area_t);
    if (id || profile) {
      form.append("id", id || profile?.id);
    }
    if (file) {
      form.append("profile_photo", file);
    }
    if (shopPhoto) {
      form.append("shop_photo", shopPhoto);
    }

    updateChemist({ data: form });
  };

  // console.log("error is : ", updateError);
  console.log("profile is : ", profile);

  return (
    <Card style={{ padding: "0px 10px" }}>
      {contextHolder}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p style={{ margin: 0, color: "gray" }}>Shop Owner Photo : </p>
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
                    : profile?.profile_photo
                    ? `${baseUrl}/uploads/${profile?.profile_photo}`
                    : "/icons/profile.png"
                }
                style={{ width: "100%", height: "6rem", objectFit: "cover" }}
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
        </div>
        <div>
          <p style={{ margin: 0, color: "gray" }}>Shop Photo : </p>
          <div
            style={{
              margin: ".5rem 0rem",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "100%",
                padding: ".2rem",
                height: "8rem",
                borderRadius: "5px",
                border: "1px solid gray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {shopPreview ? (
                <img
                  src={shopPreview}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt="Profile"
                />
              ) : profile?.shop_photo ? (
                <img
                  src={`${baseUrl}/uploads/${profile?.shop_photo}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt="Profile"
                />
              ) : (
                <img
                  src={"/icons/gallery.png"}
                  style={{
                    width: "100%",
                    height: "5rem",
                    objectFit: "contain",
                  }}
                  alt="Profile"
                />
              )}
            </div>
            <input
              onChange={(e) => setShopPhoto(e.target.files[0])}
              ref={shopPhotoRef}
              style={{ display: "none" }}
              type="file"
              accept="/*image/"
            />
            <Button
              size="small"
              onClick={() => shopPhotoRef.current.click()}
              style={{
                marginTop: ".5rem",
                position: "absolute",
                bottom: "10px",
                right: "10px",
              }}
            >
              <AiOutlineCloudUpload style={{ margin: 0 }} />
            </Button>
          </div>
        </div>

        <div class="mb-2">
          <label for="exampleFormControlInput1" class="form-label mb-0">
            Shop name
          </label>
          <input {...register("name1")} type="text" class="form-control" />
        </div>
        <div class="mb-2">
          <label for="exampleFormControlInput1" class="form-label mb-0">
            Mobile
          </label>
          <input {...register("mobile")} type="number" class="form-control" />
        </div>
        <div class="mb-2">
          <label for="exampleFormControlInput1" class="form-label mb-0">
            Email :
          </label>
          <input {...register("email")} type="email" class="form-control" />
        </div>
        <div class="mb-2">
          <p for="" class=" mb-0">
            Divison :
          </p>
          <Select
            style={{ width: "100%" }}
            onChange={(value, option) => {
              setSelectedDivision(option);
            }}
            value={`${
              selectedDivision?.children ||
              profile?.division ||
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
        </div>
        <div class="mb-2">
          <p for="" class=" mb-0">
            District :
          </p>
          <Select
            style={{ width: "100%" }}
            onChange={(value, option) => {
              setSelectedDistrict(option);
            }}
            value={`${
              selectedDistrict?.children ||
              profile?.district ||
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
        </div>
        <div class="mb-2">
          <p for="" class=" mb-0">
            Upazila :
          </p>
          <Select
            style={{ width: "100%" }}
            onChange={(value, option) => {
              setValue("upazila", option.children);
            }}
            value={`${watch('upazila') || profile?.upazila || "Select Upazila"}`}
          >
            {Array.isArray(getUpazilas?.data) &&
              getUpazilas?.data.map((d) => {
                return (
                  <Option key={d.id} value={d.id}>
                    {d.name}
                  </Option>
                );
              })}
          </Select>
        </div>

        <div class="mb-2">
          <label for="exampleFormControlInput1" class="form-label mb-0">
            Address
          </label>
          <textarea {...register("street1")} type="text" class="form-control" />
        </div>

        {/* <Form.Item
            style={{ marginBottom: "10px", marginTop: "15px" }}
            // label="Name"
            name="lattitude"
            // rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Lattitude" style={{ fontWeight: "400" }} />
          </Form.Item>
          <Form.Item
            style={{ marginBottom: "10px", marginTop: "15px" }}
            // label="Name"
            name="longitude"
            // rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Longitude" style={{ fontWeight: "400" }} />
          </Form.Item> */}

        <Divider
          style={{ margin: "7px 0px", fontSize: "12px", color: "gray" }}
          orientation="left"
        >
          Others
        </Divider>
        <div class="mb-2">
          <label for="exampleFormControlInput1" class="form-label mb-0">
            Shop Owner Name
          </label>
          <input
            {...register("contact_person")}
            type="text"
            class="form-control"
          />
        </div>

        <div class="mb-2">
          <label for="exampleFormControlInput1" class="form-label mb-0">
            Whatsapp
          </label>
          <input {...register("whatsapp")} type="text" class="form-control" />
        </div>

        <div class="mb-2">
          <label for="exampleFormControlInput1" class="form-label mb-0">
            Other mobile
          </label>
          <input
            {...register("other_mobile")}
            type="text"
            class="form-control"
          />
        </div>

        <Form.Item style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </form>
    </Card>
  );
};

export default Profile;
