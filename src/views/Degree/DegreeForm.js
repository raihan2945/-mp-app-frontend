import React, { useEffect, useState } from "react";
import { Form, AutoComplete, Select, Button } from "antd";
import { useForm } from "react-hook-form";
import {
  useCreateDoctorDegreeMutation,
  useGetDegreesQuery,
  useUpdateDoctorDegreeMutation,
} from "../../redux/features/degree/degreeApi";
import { useGetInstitutesQuery } from "../../redux/features/institue/instituteApi";
import { useGetCountriesQuery } from "../../redux/features/locations/locationApi";
import { useGetAllSpecialtyQuery } from "../../redux/features/speciality/specialityApi";

const { Option } = Select;

const DegreeForm = ({
  doctor,
  updateDegree,
  cancel,
  success,
  error,
  refetch,
}) => {
  const [degree, setDegree] = useState();
  const [speciality, setSpeciality] = useState();
  const [institute, setInstitute] = useState();
  const [country, setCountry] = useState();
  const [year, setYear] = useState();

  const { data: getDegrees, refetch: refetchDegrees } = useGetDegreesQuery(
    degree?.label
  );

  const { data: getSpecailties, refetch: refetchSpeciality } =
    useGetAllSpecialtyQuery(speciality?.label);

  const { data: getInstitutes, refetch: refetchIns } = useGetInstitutesQuery(
    institute?.label
  );

  const { data: getCountries, refetch: refetchCountry } = useGetCountriesQuery(
    country?.label
  );

  const [
    createDoctorDegree,
    { error: createError, status: createStatus, isSuccess: createSuccess },
  ] = useCreateDoctorDegreeMutation();
  const [
    updateDoctorDegree,
    { error: updateError, status: updateStatus, isSuccess: updateSuccess },
  ] = useUpdateDoctorDegreeMutation();

  const years = [];
  for (let year = 1980; year <= 2023; year++) {
    years.push({ label: year, value: year });
  }

  const sumbitDegree = () => {
    if (!doctor?.id) {
      error("Doctor is required");
    }
    if (!degree?.value) {
      error("Degree is required");
    }
    if (!institute?.label) {
      error("Institute is required");
    }
    if (!country?.value) {
      error("Country is required");
    }

    const data = {
      dr_id: doctor?.id,
      degree_id: degree?.value,
      country: country?.value,
      institute_name: institute?.label,
      year: year,
    };
    if (institute?.value) {
      data.institute_id = institute?.value;
    }
    if (institute?.value) {
      data.sector_id = speciality?.value;
    }
    if (updateDegree) {
      updateDoctorDegree({id: updateDegree.id, data: data });
    } else {
      createDoctorDegree(data);
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
      success("Degree created successfully");
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
      success("Degree updated successfully");
      cancel();
      refetch();
    }
  }, [updateStatus, updateSuccess, updateError]);

  useEffect(() => {
    setDegree({
      value: updateDegree?.degree_id,
      label: updateDegree?.degree_name,
    });
    setSpeciality({
      value: updateDegree?.sector_id,
      label: updateDegree?.sector_name,
    });
    setInstitute({
      value: updateDegree?.institute_id,
      label: updateDegree?.institute_name,
    });
    setCountry({
      value: updateDegree?.country,
      label: updateDegree?.country_name,
    });
    setYear(updateDegree?.year);
  }, [updateDegree]);

  return (
    <div>
      <Form layout="vertical">
        <Form.Item style={{ marginBottom: "5px" }} label="Degree">
          <AutoComplete
            onChange={(value, option) => {
              setDegree({ label: value });
              refetchDegrees();
            }}
            onSelect={(value, option) => {
              setDegree({ value: option.value, label: option.label });
            }}
            options={getDegrees?.data?.map((d) => {
              return {
                label: d.name,
                value: d.id,
              };
            })}
            value={degree?.label}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "5px" }} label="Sector">
          <AutoComplete
            onChange={(value, option) => {
              setSpeciality({ label: value });
              refetchDegrees();
            }}
            onSelect={(value, option) => {
              setSpeciality({ value: option.value, label: option.label });
            }}
            options={getSpecailties?.data?.map((d) => {
              return {
                label: d.name,
                value: d.id,
              };
            })}
            value={speciality?.label}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: "5px" }} label="Institute">
          <AutoComplete
            onChange={(value, option) => {
              setInstitute({ label: value });
              refetchIns();
            }}
            onSelect={(value, option) => {
              setInstitute({ value: option.value, label: option.label });
            }}
            options={getInstitutes?.data?.map((d) => {
              return {
                label: d.name,
                value: d.id,
              };
            })}
            value={institute?.label}
          />
        </Form.Item>
        <Form.Item label="Country" style={{ marginBottom: "5px" }}>
          <AutoComplete
            onChange={(value, option) => {
              setCountry({ label: value });
              refetchCountry();
            }}
            onSelect={(value, option) => {
              setCountry({ value: option.value, label: option.label });
            }}
            options={getCountries?.data?.map((d) => {
              return {
                label: d.name,
                value: d.id,
              };
            })}
            value={country?.label}
          />
        </Form.Item>
        <Form.Item label="Year" style={{ marginBottom: "5px" }}>
          <Select
            placeholder="Select passing year"
            onSelect={(value) => setYear(value)}
            options={years}
            value={year}
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
          <Button onClick={sumbitDegree} type="primary">
            {updateDegree ? "update": "Add"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DegreeForm;
