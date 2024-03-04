import React, { useEffect } from "react";
import { AutoComplete, Button, Checkbox, DatePicker, Form, Select } from "antd";
import { useForm } from "react-hook-form";
import { useGetInstitutesQuery } from "../../redux/features/institue/instituteApi";
import moment from "moment";
import {
  useCreateDoctorExperienceMutation,
  useUpdateDoctorExperienceMutation,
} from "../../redux/features/experience/experienceApi";
import { useCreateDoctorResearchMutation, useUpdateDoctorResearchMutation } from "../../redux/features/research/researchApi";

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

const ResearchForm = ({ cancel, doctor, success, error, refetch, update }) => {
  const { register, setValue, watch, getValues } = useForm();

  const { data: getInstitutes, refetch: refetchIns } = useGetInstitutesQuery(
    watch("institute_name")
  );
  const [
    createResearch,
    { error: createError, status: createStatus, isSuccess: createSuccess },
  ] = useCreateDoctorResearchMutation();

  const [
    updateResearch,
    { error: updateError, status: updateStatus, isSuccess: updateSuccess },
  ] = useUpdateDoctorResearchMutation();

  const submitExperience = () => {
    const formValues = getValues();
    // console.log("form Values is : ", formValues);
    // return
    if (update) {
      delete formValues.uuid;
      delete formValues.dr_id;
      delete formValues.created_at;
      delete formValues.updated_at;
      updateResearch({ id: update?.id, data: formValues });
    } else {
      formValues.dr_id = doctor?.id;
      createResearch(formValues);
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
      success("Research created successfully");
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
      success("Research updated successfully");
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
        <Form.Item label="Journal Name" style={{ marginBottom: "5px" }}>
          <input className="form-control" {...register("journal_name")} />
        </Form.Item>

        <Form.Item label="Type" style={{ marginBottom: "5px" }}>
          <Select
            defaultValue={watch("type")}
            options={[
              { value: "National", label: "National" },
              { value: "International", label: "International" },
            ]}
            onChange={(value) => setValue("type", value)}
          />
        </Form.Item>

        <Form.Item
          label="Position : "
          style={{ width: "100%", flex: 1, marginBottom: "5px" }}
        >
          <input className="form-control" {...register("position")} />
        </Form.Item>

        <Form.Item
          label="Publication Date : "
          style={{ width: "100%", flex: 1, marginBottom: "5px" }}
        >
          <DatePicker
            onChange={(date, dateString) =>
              setValue("publication_date", dateString)
            }
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
            value={
              watch("publication_date") &&
              moment(watch("publication_date", "YYYY-MM-DD"))
            }
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

export default ResearchForm;
