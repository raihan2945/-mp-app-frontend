import React, { useEffect } from "react";
import { AutoComplete, Button, Checkbox, DatePicker, Form, Select } from "antd";
import { useForm } from "react-hook-form";
import { useGetInstitutesQuery } from "../../redux/features/institue/instituteApi";
import moment from "moment";
import {
  useCreateDoctorExperienceMutation,
  useUpdateDoctorExperienceMutation,
} from "../../redux/features/experience/experienceApi";
import { useCreateDoctorTrainingMutation, useUpdateDoctorTrainingMutation } from "../../redux/features/training/trainingApi";

const designations = [
  { value: "Dr.", label: "Dr." },
  { value: "Prof. Dr.", label: "Prof. Dr." },
  { value: "Assoc. Prof. Dr.", label: "Assoc. Prof. Dr." },
  { value: "Assist. Prof. Dr.", label: "Assist. Prof. Dr." },
  { value: "Senior Consultant", label: "Senior Consultant" },
  { value: "Consultant", label: "Consultant" },
  { value: "Resident Consultant", label: "Resident Consultant" },
  { value: "Surgeon", label: "Surgeon" },
];

const TrainingForm = ({ cancel, doctor, success, error, refetch, update }) => {
  const { register, setValue, watch, getValues } = useForm();

  const { data: getInstitutes, refetch: refetchIns } = useGetInstitutesQuery(
    watch("institute_name")
  );
  const [
    createTraining,
    { error: createError, status: createStatus, isSuccess: createSuccess },
  ] = useCreateDoctorTrainingMutation();

  const [
    updateTraining,
    { error: updateError, status: updateStatus, isSuccess: updateSuccess },
  ] = useUpdateDoctorTrainingMutation();

  const submitExperience = () => {
    const formValues = getValues();

    if (update) {
      delete formValues.uuid;
      delete formValues.dr_id;
      delete formValues.created_at;
      delete formValues.updated_at;
      updateTraining({ id: update?.id, data: formValues });
    } else {
      formValues.dr_id = doctor?.id;
      createTraining(formValues);
    }
  };

  useEffect(() => {
    if (createError) {
      if (createError.status == 400) {
        createError.data.error.map((er) => {
          return error(er);
        });
      }
      if (createError.status == 500) {
        error("Server Error : 500");
      }
    }
    if (createSuccess) {
      success("Training created successfully");
      cancel();
      refetch();
    }
  }, [createStatus, createSuccess, createError]);

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
      success("Training updated successfully");
      cancel();
      refetch();
    }
  }, [updateStatus, updateSuccess, updateError]);

  useEffect(() => {
    if (update) {
      Object.keys(update).forEach((key) => {
        if (update[key]) {
          setValue(key, update[key]);
        }
      });
    }
  }, [update]);

  return (
    <div>
      <Form>
        <Form.Item label="Training On" style={{ marginBottom: "5px" }}>
          <input {...register("training_on")} className="form-control" />
        </Form.Item>

        <Form.Item label="Institute" style={{ marginBottom: "5px" }}>
          <AutoComplete
            onChange={(value) => {
              setValue("institute_name", value);
              refetchIns();
            }}
            onSelect={(value, option) => {
              setValue("institute_name", option.label);
              setValue("institute_id", option.value);
            }}
            options={getInstitutes?.data?.map((d) => {
              return {
                label: d.name,
                value: d.id,
              };
            })}
            value={watch("institute_name")}
          />
        </Form.Item>

        <Form.Item
          label="Start Date "
          style={{ width: "100%", flex: 1, marginBottom: "5px" }}
        >
          <DatePicker
            onChange={(date, dateString) => setValue("start_date", dateString)}
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            value={
              watch("start_date") && moment(watch("start_date", "YYYY-MM-DD"))
            }
          />
        </Form.Item>

        <Form.Item
          label="End Date"
          style={{ width: "100%", flex: 1, marginBottom: "5px" }}
        >
          {watch("")}
          <DatePicker
            disabled={watch("is_currently_working") == 1 ? true : false}
            onChange={(date, dateString) => setValue("end_date", dateString)}
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            value={watch("end_date") && moment(watch("end_date", "YYYY-MM-DD"))}
          />
        </Form.Item>
        <Form.Item
          style={{
            marginBottom: "5px",
            marginTop: "1rem",
            display: "flex",
            gap: "1rem !important",
            justifyContent: "center",
          }}
        >
          <Button onClick={() => cancel()} style={{ marginRight: ".5rem" }}>
            Cancel
          </Button>
          <Button onClick={submitExperience} type="primary">
            {update ? "update" : "Add"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TrainingForm;
