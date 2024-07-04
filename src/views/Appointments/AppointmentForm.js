import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";

const AppointmentForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h5>Add Appointment</h5>

        <div className="form__container">
          <p className="form-field">
            <label htmlFor="full_name">Full Name</label>
            <input
              className="form-control"
              type="text"
              {...register("first_name")}
              id="full_name"
              placeholder="Enter full name"
            />
          </p>

          <p className="form-field">
            <label htmlFor="mobile">Mobile</label>
            <input
              className="form-control"
              type="text"
              {...register("mobile")}
              id="mobile"
              placeholder="Enter contact number"
            />
          </p>

          <p className="form-field">
            <label htmlFor="company_name">Company Name</label>
            <input
              className="form-control"
              type="text"
              {...register("company_name")}
              id="company_name"
              placeholder="Enter company name"
            />
          </p>

          <p className="form-field">
            <label htmlFor="company_location">Company Location</label>
            <input
              className="form-control"
              type="text"
              {...register("company_location")}
              id="company_location"
              placeholder="Enter company location"
            />
          </p>

          <p className="form-field">
            <label htmlFor="designation">Designation </label>
            <input
              className="form-control"
              type="text"
              {...register("designation")}
              id="designation"
              placeholder="Enter designation"
            />
          </p>

          <p className="form-field">
            <label htmlFor="address">Address </label>
            <input
              className="form-control"
              type="text"
              {...register("address")}
              id="address"
              placeholder="Enter address"
            />
          </p>

          <p className="form-field">
            <label htmlFor="reference">Reference </label>
            <input
              className="form-control"
              type="text"
              {...register("reference")}
              id="reference"
              placeholder="Enter reference"
            />
          </p>

          <p className="form-field">
            <label htmlFor="note">Note</label>
            <input
              className="form-control"
              type="text"
              {...register("note")}
              id="note"
              placeholder="Enter note"
            />
          </p>
        </div>

        <Button htmlType="submit" className="form-btn" type="primary">
          Submit
        </Button>
      </form>
    </>
  );
};

export default AppointmentForm;
