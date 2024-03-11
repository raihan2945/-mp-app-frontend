import React from "react";
import { Card, Select, Input, Divider } from "antd";
import { useGetAllTagsQuery } from "../../redux/features/contacts/contactsApi";

import divisions from "./division.json";
import districts from "./district.json";
import upazilas from "./upazila.json";

const { Option } = Select;
const { Search } = Input;

const SearchBar = ({
  searchItems: selectQuery,
  setSearchItems: setSelectQuey,
}) => {
  const { data: getTags } = useGetAllTagsQuery();

  const getIndex = (array, name) => {
    return array?.findIndex((v) => {
      return Object.keys(v)[0] === name;
    });
  };

  const handleChange = (name, value) => {
    const index = getIndex(selectQuery, name);

    if (!value) {
      if (index >= 0) {
        let newArray = [...selectQuery];
        newArray.splice(index, 1);
        setSelectQuey(newArray);
        return;
      }
      return;
    }

    if (index >= 0) {
      let newArray = [...selectQuery];
      newArray[index] = { [name]: value };
      setSelectQuey(newArray);
      return;
    } else {
      setSelectQuey([...selectQuery, { [name]: value }]);
      return;
    }
  };

  return (
    <div>
      <Card style={{}}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <p style={{ margin: " 0" }}>Tag : </p>
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
          </div>
          <div>
            <Search
              placeholder="Search"
              onChange={(e) => {
                let value = e.target.value;
                let newValue;

                if (value[0] == "0") {
                  newValue = value.slice(1);
                } else {
                  newValue = value;
                }

                handleChange("search", newValue);
              }}
              enterButton
              style={{ minWidth: 300, fontWeight: "400" }}
            />
          </div>
        </div>

        <Divider style={{ margin: "10px 0px", opacity: ".9" }} />
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            backgroundColor: "#FBFBFB",
            padding: "10px",
            marginTop: ".5rem",
          }}
        >
          <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <p style={{ margin: " 0", width: "max-content" }}>Division : </p>
            <Select
              style={{ minWidth: 300 }}
              defaultValue={null}
              onChange={(value) => handleChange("division", value)}
              size="small"
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
          </div>
          <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <p style={{ margin: " 0", width: "max-content" }}>District : </p>
            <Select
              style={{ minWidth: 300 }}
              defaultValue={null}
              onChange={(value) => handleChange("district", value)}
              size="small"
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
                <Option value={d?.bn_name}>{d?.bn_name}</Option>
              ))}
            </Select>
          </div>
          <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <p style={{ margin: " 0", width: "max-content" }}>Upazila : </p>
            <Select
              style={{ minWidth: 300 }}
              defaultValue={null}
              onChange={(value) => handleChange("upazila", value)}
              size="small"
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
                <Option value={d?.bn_name}>{d?.bn_name}</Option>
              ))}
            </Select>
          </div>
          {/* <div style={{ display: "flex", gap: ".5rem", alignItems: "center" }}>
            <p style={{ margin: " 0", width: "max-content" }}>Union : </p>
            <Select
              style={{ minWidth: 300 }}
              defaultValue={null}
              onChange={handleChange}
              size="small"
            >
              <Option value={null}>Select Tag</Option>
              {getTags?.data?.map((d) => (
                <Option value={d?.tag}>{d?.tag}</Option>
              ))}
            </Select>
          </div> */}
        </div>
      </Card>
    </div>
  );
};

export default SearchBar;
