import React from "react";
import { Select } from "antd";

const FilterSection = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div style={{ backgroundColor: "#e8f4ff", padding: ".7rem .5rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <div>
          <p style={{ margin: 0, fontWeight: "700" }}>Status : </p>
          <Select
            //   defaultValue="lucy"
            style={{ width: 200, marginTop: ".2rem" }}
            onChange={handleChange}
            options={[
              { value: "all", label: "All" },
              { value: "active", label: "active" },
              { value: "paused", label: "paused" },
            ]}
          />
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: "700" }}>Progress : </p>
          <Select
            //   defaultValue="lucy"
            style={{ width: 200, marginTop: ".2rem" }}
            onChange={handleChange}
            options={[
              { value: "running", label: "Running" },
              { value: "draft", label: "Draft" },
              { value: "completed", label: "Paused" },
              { value: "expired", label: "Expired" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
