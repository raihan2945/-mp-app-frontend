import React, { useEffect, useState } from "react";
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
import {
  useCreateContactMutation,
  useGetAllTagsQuery,
  useUpdateContactMutation,
} from "../../redux/features/contacts/contactsApi";

import divisions from "./division.json";
import districts from "./district.json";
import upazilas from "./upazila.json";

const { Option } = Select;
const { Search } = Input;

const CreateContactForm = ({
  cancel,
  success,
  error,
  refetch,
  editContact,
  createContact,
}) => {
  const { register, setValue, watch, getValues, reset } = useForm();

  const [allDistrcits, setAllDistricts] = useState([]);
  const [allUpazilas, setAllUpazilas] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const { data: getTags } = useGetAllTagsQuery();

  const [
    CreateContact,
    { error: createError, status: createStatus, isSuccess: createSuccess },
  ] = useCreateContactMutation();

  const [
    UpdateContact,
    { error: updateError, status: updateStatus, isSuccess: updateSuccess },
  ] = useUpdateContactMutation();

  const submitExperience = () => {
    const formValues = getValues();

    let submitData = {};

    Object.keys(formValues).map((key) => {
      if (formValues[key]) {
        submitData[key] = formValues[key];
      }
    });

    // console.log("submit data is : ", submitData);
    if (editContact) {
      // console.log("edit contact is : ", editContact);
      delete submitData.id;
      delete submitData.uuid;
      delete submitData.updated_at;
      delete submitData.created_at;

      UpdateContact({ id: editContact?.id, data: submitData });
    } else {
      // formValues.dr_id = doctor?.id;
      CreateContact(submitData);
    }
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
      success("Contact created successfully");
      cancel();
      // refetch();
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
      success("Contact updated successfully");
      cancel();
      // refetch();
    }
  }, [updateStatus, updateSuccess, updateError]);

  useEffect(() => {
    if (watch("division")) {
      const div = divisions.find((d) => d.bn_name == watch("division"));
      const dis = districts.filter((dis) => dis.division_id === div.id);
      setAllDistricts(dis);
      setValue("district", null);
      setValue("upazila", null);
    }
  }, [watch("division")]);

  useEffect(() => {
    if (watch("district")) {
      const dis = districts.find((d) => d.bn_name == watch("district"));
      const upaz = upazilas.filter((up) => up.district_id === dis.id);
      setAllUpazilas(upaz);
    }
  }, [watch("district")]);

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

  // console.log("form value is : ", getValues());

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Name" style={{ marginBottom: "5px" }}>
          <input
            value={watch("first_name")}
            {...register("first_name")}
            type="text"
            class="form-control"
          />
        </Form.Item>
        <Form.Item label="Designation" style={{ marginBottom: "5px" }}>
          <input
            value={watch("last_name")}
            {...register("last_name")}
            type="text"
            class="form-control"
          />
        </Form.Item>
        <Form.Item label="Mobile" style={{ marginBottom: "5px" }}>
          <input
            value={watch("mobile")}
            {...register("mobile")}
            type="text"
            class="form-control"
          />
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
            onChange={(value) => setValue("division", value)}
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
              <Option value={d?.bn_name}>{d?.bn_name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="District" style={{ marginBottom: "5px" }}>
          <Select
            style={{ minWidth: "100%" }}
            defaultValue={null}
            onChange={(value) => setValue("district", value)}
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
            {watch("division")
              ? allDistrcits?.map((d) => (
                  <Option value={d?.bn_name}>{d?.bn_name}</Option>
                ))
              : districts?.map((d) => (
                  <Option value={d?.bn_name}>{d?.bn_name}</Option>
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
            onChange={(value) => setValue("upazila", value)}
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
            {watch("district")
              ? allUpazilas?.map((d) => (
                  <Option value={d?.bn_name}>{d?.bn_name}</Option>
                ))
              : upazilas?.map((d) => (
                  <Option value={d?.bn_name}>{d?.bn_name}</Option>
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

export default CreateContactForm;
