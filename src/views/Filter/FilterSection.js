import React, { useState } from "react";
import { Card, Select, Modal, Button, Divider, Radio } from "antd";

const FilterSection = ({ selectUser, userType: u }) => {
  const [userType, setUserType] = useState(u);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (value) => {
    // setUserType(value)
  };

  return (
    <Card style={{ backgroundColor: "#F1F1F3" }}>
      <Button
        size="large"
        style={{ fontSize: "1rem" }}
        onClick={() => setShowModal(true)}
      >
        Filter
      </Button>

      <Modal
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        width={"70%"}
        okText="Submit"
      >
        {selectUser && (
          <div>
            <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
              {" "}
              User Type :{" "}
            </p>
            <Radio.Group
              defaultValue="doctor"
              buttonStyle="solid"
              style={{
                marginTop: 16,
              }}
              onChange={(e) => setUserType(e.target.value)}
            >
              <Radio.Button value="mio">MIO</Radio.Button>

              <Radio.Button value="doctor">Doctor</Radio.Button>
              <Radio.Button value="chemist">Chemist</Radio.Button>
            </Radio.Group>
          </div>
        )}
        <Divider
          orientation="left"
          // orientationMargin={0}
          style={{
            marginTop: ".8rem",
            marginBottom: ".3rem",
            color: "#1165b3",
          }}
        >
          <p
            style={{
              margin: "0",
              fontSize: ".8rem",
              opacity: "1",
              fontStyle: "italic",
            }}
          >
            {" "}
            Hierarchy
          </p>
        </Divider>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
              Team :
            </p>
            <Select
              //   defaultValue="lucy"
              style={{ width: 200, marginTop: ".2rem" }}
              // onChange={handleChange}
              options={[
                { value: "", label: "" },
                { value: "a", label: "A" },
                { value: "b", label: "B" },
                { value: "c", label: "C" },
              ]}
            />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
              GM :{" "}
            </p>
            <Select
              //   defaultValue="lucy"
              style={{ width: 200, marginTop: ".2rem" }}
              onChange={handleChange}
              options={[
                { value: "", label: "" },
                { value: "19001-Eagle", label: "19001-Eagle" },
                { value: "19003-Falcon", label: "19003-Falcon" },
                { value: "19004-Mitford RPL-A", label: "19004-Mitford RPL-A" },
                { value: "19002-Ospery", label: "19002-Ospery" },
              ]}
            />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
              SM :{" "}
            </p>
            <Select
              //   defaultValue="lucy"
              style={{ width: 200, marginTop: ".2rem" }}
              onChange={handleChange}
              options={[
                { value: "", label: "" },
                {
                  value: "18007-Dhaka North (GEN-A)",
                  label: "18007-Dhaka North (GEN-A)",
                },
                {
                  value: "18005-Dhaka South (GEN-A) (depened on gm)",
                  label: "18005-Dhaka South (GEN-A) (depened on gm)",
                },
              ]}
            />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
              ZM :{" "}
            </p>
            <Select
              //   defaultValue="lucy"
              style={{ width: 200, marginTop: ".2rem" }}
              onChange={handleChange}
              options={[
                { value: "", label: "" },
                {
                  value: "17017-Dhaka-B (GEN A)",
                  label: "17017-Dhaka-B (GEN A)",
                },
              ]}
            />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
              RM :{" "}
            </p>
            <Select
              //   defaultValue="lucy"
              style={{ width: 200, marginTop: ".2rem" }}
              onChange={handleChange}
              options={[
                { value: "", label: "" },
                {
                  value: "16011-Dhaka GEN-A-15 (depend on zm)",
                  label: "16011-Dhaka GEN-A-15 (depend on zm)",
                },
              ]}
            />
          </div>
          {userType == "doctor" ? (
            <div>
              <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
                Work Area :{" "}
              </p>
              <Select
                //   defaultValue="lucy"
                style={{ width: 200, marginTop: ".2rem" }}
                onChange={handleChange}
                options={[
                  { value: "", label: "" },
                  { value: "101100", label: "10072 BSMMU - GREEN LIFE" },
                  {
                    value: "1011100",
                    label: "10070 BSMMU - GREEN - SUPER - RAJABAJAR",
                  },
                ]}
              />
            </div>
          ) : userType == "chemist" ? (
            <div>
              <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
                Work Area :{" "}
              </p>
              <Select
                //   defaultValue="lucy"
                style={{ width: 200, marginTop: ".2rem" }}
                onChange={handleChange}
                options={[
                  { value: "", label: "" },
                  { value: "101100", label: "10072 BSMMU - GREEN LIFE" },
                  {
                    value: "1011100",
                    label: "10070 BSMMU - GREEN - SUPER - RAJABAJAR",
                  },
                ]}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
        <Divider
          orientation="left"
          // orientationMargin={0}
          style={{
            marginTop: ".8rem",
            marginBottom: ".3rem",
            color: "#1165b3",
          }}
        >
          <p
            style={{
              margin: "0",
              fontSize: ".8rem",
              opacity: "1",
              fontStyle: "italic",
            }}
          >
            {" "}
            Location
          </p>
        </Divider>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
              Division
            </p>
            <Select
              //   defaultValue="lucy"
              style={{ width: 200, marginTop: ".2rem" }}
              onChange={handleChange}
              options={[
                { value: "", label: "" },
                { value: "19001-Eagle", label: "19001-Eagle" },
                { value: "19003-Falcon", label: "19003-Falcon" },
                { value: "19004-Mitford RPL-A", label: "19004-Mitford RPL-A" },
                { value: "19002-Ospery", label: "19002-Ospery" },
              ]}
            />
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
              District
            </p>
            <Select
              //   defaultValue="lucy"
              style={{ width: 200, marginTop: ".2rem" }}
              onChange={handleChange}
              options={[
                { value: "", label: "" },
                {
                  value: "18007-Dhaka North (GEN-A)",
                  label: "18007-Dhaka North (GEN-A)",
                },
                {
                  value: "18005-Dhaka South (GEN-A) (depened on gm)",
                  label: "18005-Dhaka South (GEN-A) (depened on gm)",
                },
              ]}
            />
          </div>
        </div>
        {userType == "doctor" && (
          <div>
            <Divider
              orientation="left"
              // orientationMargin={0}
              style={{
                marginTop: ".8rem",
                marginBottom: ".3rem",
                color: "#1165b3",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: ".8rem",
                  opacity: "1",
                  fontStyle: "italic",
                }}
              >
                Doctor
              </p>
            </Divider>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".5rem",
                flexWrap: "wrap",
              }}
            >
              {userType == "doctor" && (
                <div>
                  <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
                    Spaciality :{" "}
                  </p>
                  <Select
                    //   defaultValue="lucy"
                    style={{ width: 200, marginTop: ".2rem" }}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "" },
                      { value: "101100", label: "Orthopedics" },
                      { value: "101102", label: "Medicine" },
                      { value: "101103", label: "Surgery" },
                    ]}
                  />
                </div>
              )}
              {userType == "doctor" && (
                <div>
                  <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
                    Degree :{" "}
                  </p>
                  <Select
                    //   defaultValue="lucy"
                    style={{ width: 200, marginTop: ".2rem" }}
                    onChange={handleChange}
                    options={[
                      { value: "", label: "" },
                      { value: "101100", label: "MBBS" },
                      { value: "101102", label: "FCPS" },
                      { value: "101103", label: "MPFIL" },
                    ]}
                  />
                </div>
              )}
              <div>
                <p style={{ margin: 0, fontWeight: "700", color: "#5F6061" }}>
                  Gender :{" "}
                </p>
                <Select
                  //   defaultValue="lucy"
                  style={{ width: 200, marginTop: ".2rem" }}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "" },
                    { value: "male", label: "Male" },
                    { value: "feamle", label: "Female" },
                  ]}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default FilterSection;
