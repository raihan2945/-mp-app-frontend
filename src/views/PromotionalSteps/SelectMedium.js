import React, { useState } from "react";
import { Card } from "antd";

const SelectMedium = () => {
  const [medium, setMedium] = useState("sms");

  const mediums = [
    {
      title: "Mobile SMS",
      value: "sms",
      icon : '/icons/telephone.png',
    },
    {
      title: "Email",
      value: "email",
      icon : '/icons/gmail.png',
    },
    {
      title: "WhatsApp",
      value: "whatsapp",
      icon : '/icons/whatsapp.png',
    },
    {
      title: "Voice Call",
      value: "voice_call",
      icon : '/icons/recorder.png',
    },
  ];

  return (
    <div style={{ margin: "1rem 0rem" }}>
      <Card
        title="Select Medium"
        className="criclebox tablespace mb-24"
        style={{ padding: "1rem" }}
      >
        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          {mediums?.map((m, key) => {
            return (
              <Card
                key={key}
                hoverable
                style={{
                  cursor: "pointer",
                  padding: "1rem",
                  minWidth: "200px",
                  maxWidth: "max-content",
                  textAlign: "center",
                  fontSize: "1.1rem",
                  backgroundColor: medium == m?.value && "#e8f4ff",
                  border: medium == m?.value && "1px solid #1373cc",
                  borderRadius:"5px",
                  display:"flex",
                  gap:"10px",
                  alignItems:"center"
                }}
                onClick={() => setMedium(m?.value)}
              >
                <img style={{width:"30px"}} src={m?.icon} alt="icon"/> {" "}
                {m.title}
              </Card>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default SelectMedium;
