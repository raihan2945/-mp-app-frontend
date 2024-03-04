import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Select, Form, Button } from "antd";
import {
  useCreateHospitalMutation,
  useGetHospitalDetailsQuery,
  useGetHospitalsQuery,
} from "../../redux/features/hospital/hospitalApi";
import DebounceSingleSelect from "../../components/shared/DebounceSingleSelect";
import {
  useGetDistrictsQuery,
  useGetDivisonsQuery,
  useGetUpazilasQuery,
} from "../../redux/features/locations/locationApi";

const { Option } = Select;

const HospitalForm = ({
  setSelectedHospital,
  setIsHospital,
  success,
  error,
  warning,
}) => {
  const [items, setItems] = useState([]);
  const [searchKey, setSearchKey] = useState();

  const { register, setValue, watch } = useForm();

  const [createHospital] = useCreateHospitalMutation();

  const [searchValue, setSearchValue] = useState();
  const [selectHospital, setSelectHospital] = useState();

  const [divisions, setDivisons] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const [dropdownOpen, setdropdownOpen] = useState(true);

  const { data: getData, refetch } = useGetHospitalsQuery(searchKey);
  const { data: getDetailsData, refetch: refetchDetails } =
    useGetHospitalDetailsQuery(searchValue?.value);

  const { data: getDivisions, refetch: divisionRefetch } =
    useGetDivisonsQuery();
  const { data: getDistricts, refetch: districtRefetch } = useGetDistrictsQuery(
    selectedDivision?.value || selectHospital?.division
  );
  const { data: getUpazilas, refetch: upazilaRefectch } = useGetUpazilasQuery(
    selectedDistrict?.value || selectHospital?.district
  );

  useEffect(() => {
    if (getDivisions) {
      setDivisons(getDivisions?.data);
    }
  }, [getDivisions]);

  useEffect(() => {
    if (searchValue?.value) {
      refetchDetails();
    }
  }, [searchValue]);

  useEffect(() => {
    if (getDetailsData?.data) {
      setSelectHospital(getDetailsData?.data);
      setValue("full_address", getDetailsData?.data?.full_address);
      setSelectedDistrict(getData?.data?.district)
      setValue("upazila", getDetailsData?.data?.upazila);
      setSelectedDivision(null)
    }
  }, [getDetailsData]);

  useEffect(() => {
    if (getData?.data) {
      const newArray =
        Array.isArray(getData?.data) &&
        getData?.data?.map((d) => {
          return {
            label: `${d.name}`,
            value: d.id,
            subLabel: `${d?.upazila} ${d.full_address}`,
            district: d.district,
            upazila: d.upazila,
            full_address: d.full_address,
          };
        });
      setItems(newArray);
    }
  }, [getData]);

  useEffect(() => {
    if (!searchValue) {
      setSelectHospital(null);
    }
  }, [searchValue]);

  const submitHosptial = (hospital) => {
    if (hospital) {
      setSelectedHospital(hospital);
      setIsHospital(false);
    }
  };

  const createHostpital = async () => {
    if (!searchValue?.value) {
      error("Hospital name is required!");
      return;
    }
    if (!selectedDistrict?.value) {
      error("District is required");
      return;
    }
    if (!watch("upazila")) {
      error("Upazila is required");
      return;
    }
    if (!watch("full_address")) {
      error("Full Address is required");
      return;
    }

    const submitData = {
      name: searchValue.value,
      district: selectedDistrict.value,
      upazila: watch("upazila"),
      full_address: watch("full_address"),
    };

    const response = await createHospital(submitData);
    console.log("response is : ", response);
    if (response?.data) {
      success("Hospital Created successfully");
      submitHosptial(response?.data?.data)
    } else {
      error(JSON.stringify(response?.error));
    }
  };

  // console.log("search Value is : ", searchValue);

  // console.log("Selected hostpial is : ", selectHospital);
  // console.log("Hospital details is : ", selectHospital);

  return (
    <div>
      <Form layout="vertical">
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={
            <p style={{ margin: 0, padding: 0, fontWeight: "600" }}>
              Hospital :{" "}
            </p>
          }
          // name="division"
          labelCol={{ span: 1 }}
          wrapperCol={{ span: 6 }}
        >
          <DebounceSingleSelect
            showSearch
            mode="tags"
            value={searchValue}
            open={dropdownOpen}
            onDropdownVisibleChange={(open) => setdropdownOpen(open)}
            placeholder="Select users"
            fetchOptions={items}
            onChange={(newValue) => {
              const lastIndex = newValue.length - 1;
              setSearchValue(newValue[lastIndex]);
              setdropdownOpen(false);
            }}
            refetch={refetch}
            setSearchKey={setSearchKey}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={<p style={{ margin: 0, padding: 0 }}>Divison : </p>}
          // name="division"
          labelCol={{ span: 1 }}
          wrapperCol={{ span: 6 }}
        >
          <Select
            style={{ width: "100%" }}
            onChange={(value, option) => {
              setSelectedDivision(option);
            }}
            value={`${
              selectedDivision?.value ||
              selectHospital?.division ||
              "Select division"
            }`}
          >
            {divisions.map((d) => {
              return (
                <Option key={d.name} value={d.name}>
                  {d.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={<p style={{ margin: 0, padding: 0 }}>District : </p>}
          // name="website_url"
          labelCol={{ span: 1 }}
          wrapperCol={{ span: 6 }}
          // rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Select
            style={{ width: "100%" }}
            onChange={(value, option) => {
              setSelectedDistrict(option);
            }}
            value={`${
              selectedDistrict?.value ||
              selectHospital?.district ||
              "Select district"
            }`}
          >
            {Array.isArray(getDistricts?.data) &&
              getDistricts?.data.map((d) => {
                return (
                  <Option key={d.id} value={d.name}>
                    {d.name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: "10px" }}
          label={<p style={{ margin: 0, padding: 0 }}>Upazila : </p>}
          // name="website_url"
          labelCol={{ span: 1 }}
          wrapperCol={{ span: 6 }}
          // rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Select
            style={{ width: "100%" }}
            onChange={(value, option) => {
              setValue("upazila", value);
            }}
            value={`${
              watch("upazila") || selectHospital?.upazila || "Select Upazila"
            }`}
          >
            {Array.isArray(getUpazilas?.data) &&
              getUpazilas?.data.map((d) => {
                return (
                  <Option key={d.id} value={d.name}>
                    {d.name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item label="Full Address" style={{ marginBottom: "5px" }}>
          <input
            {...register("full_address")}
            type="text"
            className="form-control"
          />
        </Form.Item>
        {searchValue && selectHospital ? (
          <Form.Item style={{ textAlign: "center", marginBottom: "0" }}>
            <Button onClick={() => submitHosptial(selectHospital)} type="primary">
              Select
            </Button>
          </Form.Item>
        ) : searchValue ? (
          <Form.Item style={{ textAlign: "center", marginBottom: "0" }}>
            <Button onClick={() => createHostpital()} type="primary">
              Create & Select
            </Button>
          </Form.Item>
        ) : (
          ""
        )}
      </Form>
    </div>
  );
};

export default HospitalForm;
