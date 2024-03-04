import React, { useState, useRef, useEffect } from "react";
import { Input, Select, Card } from "antd";
import MultipleFileUpload from "../FileUplaod/MultipleFileUpload";
import SingleFileUpload from "../FileUplaod/SingleFileUpload";

const { TextArea } = Input;

const Content = () => {
  const [medium, setMedium] = useState("whatsapp");
  const [contentType, setContentType] = useState("promotion");

  const [message, setMessage] = useState(null);
  const [link, setLink] = useState(null);

  const [selectedfile, SetSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [Files, SetFiles] = useState([]);
  const [acceptType, setAcceptType] = useState("image/*");

  const fileInputRef = useRef(null);

  const handleFileUpload = (type) => {
    // console.log("Input clicked");
    setAcceptType(type);
    fileInputRef.current.click();
  };

  const handleFileSelected = (e) => {
    const selectedFile = e.target.files[0];
    SetSelectedFile(selectedFile);
  };

  useEffect(() => {
    if (selectedfile) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedfile);
    }
  }, [selectedfile]);

  //utils

  const formatSize = (bytes) => {
    if (bytes < 1024) {
      return bytes + " B";
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + " KB";
    } else {
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }
  };

  const getIcon = (name) => {
    // console.log("name is : ", name)
    const ext = name?.split(".")[1];
    if (ext === "jpeg") {
      // console.log('ext called by =', ext)
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "5rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "png") {
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "5rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "PNG") {
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "5rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "png") {
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "5rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "jpg") {
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "5rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "JPG") {
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "5rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "pdf") {
      return (
        <img
          src="/icons/pdf.png"
          alt="Preview"
          style={{ height: "5rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "xlsx") {
      return (
        <img
          src="/icons/xls.png"
          alt="Preview"
          style={{ height: "5rem", overflow: "hidden" }}
        />
      );
    } else {
      // console.log("i'm called");
      return (
        <img
          src="/icons/google-docs.png"
          alt="Preview"
          style={{ height: "5rem", overflow: "hidden" }}
        />
      );
    }
  };
  const getPreview = (name) => {
    // console.log("name is : ", name)
    const ext = name?.split(".")[1];
    if (ext === "jpeg") {
      // console.log('ext called by =', ext)
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "10rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "png") {
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "10rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "PNG") {
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "10rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "png") {
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "10rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "jpg") {
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "10rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "JPG") {
      return (
        <img
          src={previewImage}
          alt="Preview"
          style={{ height: "10rem", overflow: "hidden" }}
        />
      );
    } else if (ext === "pdf") {
      return (
        <iframe
          title="PDF Preview"
          width="100%"
          height="500px"
          src={`${previewImage}#toolbar=0`}
        />
      );
    } else if (ext === "xlsx") {
      return (
        <img
          src="/icons/xls.png"
          alt="Preview"
          style={{ height: "10rem", overflow: "hidden" }}
        />
      );
    } else {
      // console.log("i'm called");
      return (
        <img
          src="/icons/google-docs.png"
          alt="Preview"
          style={{ height: "10rem", overflow: "hidden" }}
        />
      );
    }
  };

  return (
    <div
      style={{
        margin: "1rem 0rem",
        display: "flex",
        gridTemplateColumns: "1fr 1fr",
        gap: ".5rem",
      }}
    >
      <Card
        style={{ padding: "0rem 1rem 1rem 1rem", flex: "1" }}
        title={
          <div>
            <h5 style={{ marginBottom: "0", fontSize: "1.2rem" }}>
              Campaign Content
            </h5>
            <h5
              style={{
                marginTop: ".3rem",
                marginBottom: "0",
                fontSize: ".9rem",
                color: "#4d4d4d",
              }}
            >
              Medium :{" "}
              <span style={{ color: "#4d4d4d", textTransform: "uppercase" }}>
                {medium}
              </span>
            </h5>
          </div>
        }
        className="criclebox tablespace"
      >
        {/* <div style={{ marginTop: "1rem" }}>
          <p style={{ margin: 0, fontWeight: "700" }}> Medium : </p>
          <Select
            size="small"
            defaultValue="sms"
            style={{ width: 200, marginTop: ".2rem" }}
            onChange={(value) => setMedium(value)}
            options={[
              { value: "sms", label: "SMS" },
              { value: "whatsapp", label: "WhatsApp" },
            ]}
          />
        </div> */}
        {/* <div style={{ marginTop: "1rem" }}>
          <p style={{ margin: 0, fontWeight: "700" }}> Content Type : </p>
          <Select
            size="large"
            defaultValue="promotion"
            style={{ width: 200, marginTop: ".2rem" }}
            onChange={(value) => setContentType(value)}
            options={[
              { value: "promotion", label: "Promotion" },
              { value: "survey", label: "Survey" },
            ]}
          />
        </div>
        {contentType == "survey" && (
          <div style={{ marginTop: "1rem" }}>
            <p style={{ margin: 0, fontWeight: "700" }}> Select Survey : </p>
            <Select
              size="large"
              defaultValue="promotion"
              style={{ width: 200, marginTop: ".2rem" }}
              options={[
                { value: "promotion", label: "Survey 1" },
                { value: "survey", label: "Survey 2" },
              ]}
            />
          </div>
        )} */}
        <div style={{ marginTop: "1rem" }}>
          <p style={{ color: "#4d4d4d", margin: 0, fontWeight: "700" }}>
            {" "}
            Message :{" "}
          </p>
          <TextArea onChange={(e) => setMessage(e.target.value)} />
        </div>

        {medium == "whatsapp" && (
          <div>
            {selectedfile ? (
              <div style={{ marginTop: "1rem" }}>
                <p
                  style={{
                    color: "#4d4d4d",
                    marginBottom: "5px",
                    fontWeight: "700",
                  }}
                >
                  Attachment :{" "}
                </p>
                <Card>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "1rem .9rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "start",
                      }}
                    >
                      {getIcon(selectedfile.name)}
                      <div>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "1rem",
                            marginBottom: "0",
                          }}
                        >
                          {selectedfile.name}
                        </p>
                        <p style={{ fontWeight: "400", fontSize: ".8rem" }}>
                          {formatSize(selectedfile.size)}
                        </p>
                      </div>
                    </div>
                    <div>
                      <img
                        onClick={() => {
                          SetSelectedFile(null);
                          setPreviewImage(null);
                        }}
                        style={{ height: "3rem", cursor: "pointer" }}
                        src="/icons/delete.png"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            ) : (
              <SingleFileUpload
                handleFileUpload={handleFileUpload}
                handleFileSelected={handleFileSelected}
                fileInputRef={fileInputRef}
                acceptType={acceptType}
              />
            )}
          </div>
        )}

        {/* {medium == "whatsapp" && (
          <MultipleFileUpload
            selectedfile={selectedfile}
            SetSelectedFile={SetSelectedFile}
            Files={Files}
            SetFiles={SetFiles}
          />
        )} */}
        <div style={{ marginTop: "1rem" }}>
          <p style={{ color: "#4d4d4d", margin: 0, fontWeight: "700" }}>
            {" "}
            Link :{" "}
          </p>
          <Input value={link} onChange={(e) => setLink(e.target.value)} />
        </div>
      </Card>
      <Card
        className="criclebox tablespace"
        title={
          <div>
            <h5 style={{ marginBottom: "0", fontSize: "1.2rem" }}>
              Message Preview
            </h5>
            <h5
              style={{
                marginTop: ".3rem",
                marginBottom: "0",
                fontSize: ".9rem",
                color: "#4d4d4d",
              }}
            >
              Medium :{" "}
              <span style={{ color: "#4d4d4d", textTransform: "uppercase" }}>
                {medium}
              </span>
            </h5>
          </div>
        }
        style={{ padding: "0rem 1rem 1rem 1rem", flex: "1" }}
      >
        <div style={{ padding: "1rem" }}>
          <p style={{ marginBottom: "0", fontSize: "1rem" }}>{message}</p>
          {link && (
            <div style={{ marginTop: "1rem" }}>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#4d4d4d",
                  fontWeight: "700",
                  marginBottom: 0,
                }}
              >
                Link :{" "}
              </p>
              <a href={link} style={{ marginBottom: "0", fontSize: "1rem" }}>
                {link}
              </a>
            </div>
          )}
          {selectedfile && (
            <div style={{ marginTop: "1rem" }}>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#4d4d4d",
                  fontWeight: "700",
                  marginBottom: ".5rem",
                }}
              >
                Attachment :{" "}
              </p>
              <div>
                {/* <p
                  style={{
                    fontWeight: "500",
                    fontSize: ".8rem",
                    marginBottom: "0",
                  }}
                >
                  {selectedfile.name}
                </p>
                <p style={{ fontWeight: "400", fontSize: ".8rem" }}>
                  {formatSize(selectedfile.size)}
                </p> */}
              </div>
              {getPreview(selectedfile?.name)}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Content;
