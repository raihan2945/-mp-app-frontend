import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, Form, message } from "antd";
import { useDoctorCreateOrUpdateMutation } from "../../redux/features/doctor/doctorApi";

const MajorInfo = ({ id, doctor, doctorRefetch, success, error, warning }) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const [
    updateDoctor,
    { status: updateStatus, error: updateError, isSuccess: updateSuccess },
  ] = useDoctorCreateOrUpdateMutation();



  const onSubmit = () => {
    const formValues = getValues();

    const updateData = {};
    Object.keys(formValues).forEach((key) => {
      if (formValues[key]) {
        updateData[key] = formValues[key];
      }
    });

    updateDoctor({ id: Number(id), data: updateData });
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
    doctor &&
      Object.keys(doctor).forEach((key) => {
        setValue(key, doctor[key]);
      });
  }, [doctor]);

  return (
    <div>
      <Card
        style={{
          padding: "0px 10px",
          boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
        }}
      >
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
              Save
            </Button>
          </Form.Item>
        </form>
      </Card>
    </div>
  );
};

export default MajorInfo;
