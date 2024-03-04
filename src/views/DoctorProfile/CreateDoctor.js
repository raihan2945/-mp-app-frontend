import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Form, message } from "antd";
import {
  useDoctorCreateOrUpdateMutation,
  useVerifyDoctorMutation,
} from "../../redux/features/doctor/doctorApi";
import { useNavigate } from "react-router-dom";

const CreateDoctor = ({ id, doctor, refetch }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();

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

  const [
    updateDoctor,
    {
      status: updateStatus,
      error: updateError,
      isSuccess: updateSuccess,
      response,
    },
  ] = useVerifyDoctorMutation();

  const onSubmit = async () => {
    const formValues = getValues();

    const updateData = {};
    Object.keys(formValues).forEach((key) => {
      if (formValues[key]) {
        updateData[key] = formValues[key];
      }
    });

    const response = await updateDoctor({ data: updateData });
    if (response?.data?.data) {
      navigate(`/doctors/${response?.data?.data?.id}`);
    }
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
    doctor &&
      Object.keys(doctor).forEach((key) => {
        setValue(key, doctor[key]);
      });
  }, [doctor]);

  return (
    <div>
      {contextHolder}
      <form>
        <div class="mb-2">
          <label for="exampleFormControlInput1" class="form-label mb-0">
            BMDC No.
          </label>
          <input {...register("bmdc_no")} type="text" class="form-control" />
        </div>

        <div class="mb-2">
          <label for="exampleFormControlInput1" class="form-label mb-0">
            Mobile
          </label>
          <input {...register("mobile")} type="number" class="form-control" />
        </div>
        <div class="">
          <label for="exampleFormControlInput1" class="form-label mb-0">
            Email
          </label>
          <input {...register("email")} type="email" class="form-control" />
        </div>

        <Form.Item style={{ textAlign: "center", marginTop: "1rem" }}>
          <Button type="primary" onClick={() => onSubmit()}>
            Verify & Create
          </Button>
        </Form.Item>
      </form>
    </div>
  );
};

export default CreateDoctor;
