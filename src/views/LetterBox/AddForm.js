import { Button, DatePicker } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useCreateLetterMutation } from "../../redux/features/letterBox/letterBoxApi";

const AddForm = ({ closeModal, appointment }) => {
  const [createLetter, { isSuccess, isError, isLoading, error }] =
    useCreateLetterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (data) => {
    // if (appointment) {
    //   updateAppointment({ id: appointment.id, data: data });
    // } else {
    //   await createAppointment(data);
    // }
    await createLetter(data);

    closeModal();
  };

  return (
    <>
      <form className="letter-box form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Add a note</h3>
        <div className="form-container">
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
            <label htmlFor="category">Type</label>
            <select
              className="form-control ant-input"
              type="text"
              {...register("category")}
              id="category"
                {...register("category", {
                required: "Select a type",
              })}
              required
            >
              <option value={""}>Select a type</option>
              <option value={"complain"}>Complain</option>
              <option value={"request"}>Request</option>
            </select>

            {errors.category && (
              <div className="error-msg">{errors.category.message}</div>
            )}
          </p>

          <p className="form-field">
            <label htmlFor="note">Note</label>
            <textarea
              className="form-control ant-input"
              type="text"
              {...register("note")}
              id="note"
              placeholder="Enter note"
              cols={50}
              rows={10}
            />
          </p>
        </div>

        <Button
          //   loading={isSubmitting || isLoading || isUpdatting}
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

export default AddForm;
