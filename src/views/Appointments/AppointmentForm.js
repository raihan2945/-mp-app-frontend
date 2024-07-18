import { Button, DatePicker, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
} from "../../redux/features/appointment/appointmentApi";
import dayjs from "dayjs";

const format = "DD-MMM-YY hh:mm a";

const AppointmentForm = ({ closeModal, appointment }) => {
  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();
  const [createAppointment, { isSuccess, isError, isLoading, error }] =
    useCreateAppointmentMutation();
  const [
    updateAppointment,
    {
      isLoading: isUpdatting,
      isSuccess: isSuccessUpdating,
      isError: isErrorUpdating,
      error: errorUpdating,
    },
  ] = useUpdateAppointmentMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    data.start = startDateTime?.$d || null
    data.end = endDateTime?.$d || null

    if (appointment) {
      updateAppointment({ id: appointment.id, data: data });
    } else {
      await createAppointment(data);
    }

    closeModal();
  };


  useEffect(() => {
    if (appointment) {
      setValue("full_name", appointment.full_name);
      setValue("mobile", appointment.mobile);
      setValue("address", appointment.address);
      setValue("company_name", appointment.company_name);
      setValue("company_location", appointment.company_location);
      setValue("degination", appointment.degination);
      setValue("note", appointment.note);
      setValue("start", appointment.start);
      setValue("end", appointment.end);
      setStartDateTime(dayjs(appointment.start))
      setEndDateTime(dayjs(appointment.end))
    }
  }, [appointment]);

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <h3>Person Information</h3>
          <div className="form-section">
            <p className="form-field">
              <label htmlFor="full_name">Full Name</label>
              <input
                className="ant-input form-control"
                type="text"
                {...register("full_name", {
                  required: "Full name is required",
                })}
                id="full_name"
                placeholder="Enter full name"
              />
              {errors.full_name && (
                <div className="error-msg">{errors.full_name.message}</div>
              )}
            </p>

            <p className="form-field">
              <label htmlFor="designation">Designation </label>
              <input
                className="form-control ant-input"
                type="text"
                {...register("designation")}
                id="designation"
                placeholder="Enter designation"
              />
            </p>

            <p className="form-field">
              <label htmlFor="mobile">Mobile</label>
              <input
                className="form-control ant-input "
                type="number"
                {...register("mobile", {
                  required: "Mobile number is required",
                  minLength: {
                    value: 11,
                    message: "Mobile number must have 11 digits",
                  },
                })}
                id="mobile"
                placeholder="Enter contact number"
              />
              {errors.mobile && (
                <div className="error-msg">{errors.mobile.message}</div>
              )}
            </p>

            <p className="form-field">
              <label htmlFor="address">Address </label>
              <input
                className="form-control ant-input"
                type="text"
                {...register("address")}
                id="address"
                placeholder="Enter address"
              />
            </p>
          </div>

          <h3>Company Information</h3>
          <div className="form-section">
            <p className="form-field">
              <label htmlFor="company_name">Company Name</label>
              <input
                className="form-control ant-input"
                type="text"
                {...register("company_name")}
                id="company_name"
                placeholder="Enter company name"
              />
            </p>

            <p className="form-field">
              <label htmlFor="company_location">Company Location</label>
              <input
                className="form-control ant-input"
                type="text"
                {...register("company_location")}
                id="company_location"
                placeholder="Enter company location"
              />
            </p>
          </div>

          <h3>Appointment Schedule</h3>
          <div className="form-section">
            <p className="flex-col">
              <label>From </label>
              <DatePicker
                showTime
                format={format}
                value={startDateTime}
                minDate={dayjs(new Date())}
                minuteStep={5}
                onChange={(value) => {
                  if (value != null) {
                    setStartDateTime(dayjs(value.$d))
                  } else {
                    setStartDateTime(null)
                  }
                }}
              />
            </p>
            <p className="flex-col">
              <label>To </label>
              <DatePicker
                showTime
                value={endDateTime}
                format={format}
                minDate={startDateTime != null ? startDateTime : dayjs(new Date())}
                minuteStep={5}
                onChange={(value) => {
                  console.log(value);
                  if (value != null) {
                    setEndDateTime(dayjs(value.$d))
                  } else {
                    setEndDateTime(null)
                  }
                }}
              />
            </p>
          </div>

          <h3>Additional Information</h3>
          <div className="form-section">
            <p className="form-field">
              <label htmlFor="reference">Reference </label>
              <input
                className="form-control ant-input"
                type="text"
                {...register("reference")}
                id="reference"
                placeholder="Enter reference"
              />
            </p>

            <p className="form-field">
              <label htmlFor="note">Note</label>
              <input
                className="form-control ant-input"
                type="text"
                {...register("note")}
                id="note"
                placeholder="Enter note"
              />
            </p>
          </div>
        </div>

        <Button
          loading={isSubmitting || isLoading || isUpdatting}
          htmlType="submit"
          className="form-btn"
          type="primary"
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default AppointmentForm;
