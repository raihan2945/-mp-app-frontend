import React from "react";

const SingleFileUpload = ({
  handleFileSelected,
  handleFileUpload,
  fileInputRef,
  acceptType
}) => {
  return (
    <div style={{ marginTop: "1rem" }}>
      <p style={{ color: "#4d4d4d", marginBottom: "5px", fontWeight: "700" }}>
        Attachment :{" "}
      </p>
      <div>
        <input
          type="file"
        //   accept={acceptType}// Define the file types you want to accept
          style={{ display: "none" }}
          onChange={handleFileSelected}
          ref={fileInputRef}
        />

        <button
          onClick={()=>handleFileUpload('pdf/*')}
          style={{
            border: "none",
            background: "none",
          }}
        >
          <div style={{display:"flex", gap:"1rem"}}>
            <label
              htmlFor="file-input"
              style={{
                display: "inline-block",
                cursor: "pointer",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <img
                src="/icons/image.png"
                style={{
                  width: "2.5rem",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </label>
            <label
              htmlFor="file-input"
              style={{
                display: "inline-block",
                cursor: "pointer",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <img
                src="/icons/pdf.png"
                style={{
                  width: "2.5rem",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </label>
            <label
              htmlFor="file-input"
              style={{
                display: "inline-block",
                cursor: "pointer",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <img
                src="/icons/google-docs.png"
                style={{
                  width: "2.5rem",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </label>
            <label
              htmlFor="file-input"
              style={{
                display: "inline-block",
                cursor: "pointer",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <img
                src="/icons/music-player.png"
                style={{
                  width: "2.5rem",
                  objectFit: "contain",
                  objectPosition: "center",
                }}
              />
            </label>
          </div>
        </button>
      </div>
    </div>
  );
};

export default SingleFileUpload;
