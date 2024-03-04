import React, { useState } from "react";
import { Card, Select, DatePicker, TimePicker } from "antd";

const CampaignInfo = () => {
  const [campaignType, setCampaignType] = useState("Single");

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <div style={{ margin: "1rem 0rem" }}>
      <Card
        title="Campaign Info"
        className="criclebox tablespace mb-0"
        style={{ padding: "1rem" }}
      >
        <div>
          <div style={{ marginTop: "1rem" }}>
            <p style={{ margin: 0, fontWeight: "700" }}> Campaign Type : </p>
            <Select
              size="large"
              defaultValue="single"
              style={{ width: 200, marginTop: ".2rem" }}
              onChange={(value) => setCampaignType(value)}
              options={[
                { value: "single", label: "Single" },
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "weekly" },
                { value: "Monthly", label: "Monthly" },
              ]}
            />
          </div>
        </div>
        <div>
          <div style={{ marginTop: "1rem" }}>
            <p style={{ margin: 0, fontWeight: "700" }}> Date & Time : </p>
            <div style={{display:"flex", gap:"1rem"}}>
              <DatePicker onChange={onChange} size="large" />
              <TimePicker onChange={onChange} size="large" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CampaignInfo;
