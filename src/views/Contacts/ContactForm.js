import React, { useEffect } from "react";
import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Select,
  Input,
} from "antd";
import { useForm } from "react-hook-form";
import { useGetInstitutesQuery } from "../../redux/features/institue/instituteApi";
import moment from "moment";
import {
  useCreateDoctorExperienceMutation,
  useUpdateDoctorExperienceMutation,
} from "../../redux/features/experience/experienceApi";
import { useGetAllTagsQuery } from "../../redux/features/contacts/contactsApi";

import divisions from "./division.json";
import districts from "./district.json";
import upazilas from "./upazila.json";

const { Option } = Select;
const { Search } = Input;

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

const ContactForm = ({
  cancel,
  doctor,
  success,
  error,
  refetch,
  editContact,
  createContact,
}) => {
  const { register, setValue, watch, getValues, reset } = useForm();

  const { data: getTags } = useGetAllTagsQuery();

  const { data: getInstitutes, refetch: refetchIns } = useGetInstitutesQuery(
    watch("institute_name")
  );
  const [
    createDoctorExperience,
    { error: createError, status: createStatus, isSuccess: createSuccess },
  ] = useCreateDoctorExperienceMutation();

  const [
    updateDoctorExperience,
    { error: updateError, status: updateStatus, isSuccess: updateSuccess },
  ] = useUpdateDoctorExperienceMutation();

  const submitExperience = () => {
    const formValues = getValues();
    // console.log("form Values is : ", formValues);
    if (editContact) {
      delete formValues.uuid;
      delete formValues.dr_id;
      delete formValues.created_at;
      delete formValues.updated_at;
      updateDoctorExperience({ id: editContact?.id, data: formValues });
    } else {
      formValues.dr_id = doctor?.id;
      createDoctorExperience(formValues);
    }
  };

  const getIndex = (array, name) => {
    return array?.findIndex((v) => {
      return Object.keys(v)[0] === name;
    });
  };

  const handleChange = (name, value) => {};

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
      success("Experience created successfully");
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
      success("Experience updated successfully");
      cancel();
      refetch();
    }
  }, [updateStatus, updateSuccess, updateError]);

  useEffect(() => {
    if (editContact) {
      Object.keys(editContact).forEach((key) => {
        if (editContact[key]) {
          setValue(key, editContact[key]);
        }
      });
    } else {
      reset();
    }

    return () => {
      reset();
    };
  }, [editContact, createContact]);

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Name" style={{ marginBottom: "5px" }}>
          <input {...register("name")} type="text" class="form-control" />
        </Form.Item>
        <Form.Item label="Designation" style={{ marginBottom: "5px" }}>
          <input
            {...register("designtaion")}
            type="text"
            class="form-control"
          />
        </Form.Item>
        <Form.Item label="Mobile" style={{ marginBottom: "5px" }}>
          <input {...register("mobile")} type="text" class="form-control" />
        </Form.Item>

        <Form.Item label="Tag" style={{ marginBottom: "5px" }}>
          <Select
            style={{ minWidth: 300 }}
            defaultValue={null}
            onChange={(value) => handleChange("tag", value)}
            //   size="small"
            showSearch
            filterOption={(input, option) =>
              (option?.value?.toLocaleLowerCase() ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
          >
            <Option value={null}>Select Tag</Option>
            {getTags?.data?.map((d) => (
              <Option value={d?.tag}>{d?.tag}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Address" style={{ marginBottom: "5px" }}>
          <input {...register("address")} type="text" class="form-control" />
        </Form.Item>

        <Form.Item label="Email" style={{ marginBottom: "5px" }}>
          <input {...register("email")} type="text" class="form-control" />
        </Form.Item>

        <Form.Item label="Company" style={{ marginBottom: "5px" }}>
          <input {...register("email")} type="text" class="form-control" />
        </Form.Item>

        <Form.Item label="Union" style={{ marginBottom: "5px" }}>
          <input {...register("union")} type="text" class="form-control" />
        </Form.Item>

        <Form.Item label="Division" style={{ marginBottom: "5px" }}>
          <Select
            style={{ minWidth: "100%" }}
            defaultValue={null}
            onChange={(value) => handleChange("division", value)}
            size="large"
            showSearch
            filterOption={(input, option) =>
              (option?.value?.toLocaleLowerCase() ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
          >
            <Option value={null}>Select Division</Option>
            {divisions?.map((d) => (
              <Option value={d?.name}>{d?.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="District" style={{ marginBottom: "5px" }}>
          <Select
            style={{ minWidth: "100%" }}
            defaultValue={null}
            onChange={(value) => handleChange("district", value)}
            size="large"
            showSearch
            filterOption={(input, option) =>
              (option?.value?.toLocaleLowerCase() ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
          >
            <Option value={null}>Select District</Option>
            {districts?.map((d) => (
              <Option value={d?.name}>{d?.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Upazila"
          style={{ marginTop: ".5rem", marginBottom: "5px" }}
        >
          <Select
              style={{ minWidth: "100%" }}
              defaultValue={null}
              onChange={(value) => handleChange("upazila", value)}
              size="large"
              showSearch
              filterOption={(input, option) =>
                (option?.value?.toLocaleLowerCase() ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
            >
              <Option value={null}>Select Upazila</Option>
              {upazilas?.map((d) => (
                <Option value={d?.name}>{d?.name}</Option>
              ))}
            </Select>
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
            {editContact ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContactForm;
