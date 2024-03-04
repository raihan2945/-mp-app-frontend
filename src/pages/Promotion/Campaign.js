import React, { useState } from "react";
import { Button, Card, Steps } from "antd";
import SelectUser from "../../views/PromotionalSteps/SelectUser";
import SelectMedium from "../../views/PromotionalSteps/SelectMedium";
import Content from "../../views/PromotionalSteps/Content";
import CampaignInfo from "../../views/PromotionalSteps/CampaignInfo";

const { Step } = Steps;

const Campaign = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrentStep(value);
  };

  const steps = [
    {
      title: "Step 1",
      description: "Select user",
    },
    {
      title: "Step 2",
      description: "Medium",
    },
    {
      title: "Step 3",
      description: "Campain Content",
    },
    {
      title: "Step 4",
      description: "Campain Info",
    },
  ];

  return (
    <>
      <Card
        style={{
          marginTop: ".5rem",
          boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
        }}
      >
        <Steps
          size="small"
          current={currentStep}
          onChange={onChange}
          type="navigation"
        >
          {steps?.map((step) => {
            return (
              <Step
                title={step?.title}
                description={
                  <p style={{ fontWeight: "600", color: "#616163" }}>
                    {step.description}
                  </p>
                }
              />
            );
          })}
        </Steps>
      </Card>
      <div
        style={{
          marginTop: "1rem",
        }}
      >
        {currentStep === 0 ? (
          <SelectUser />
        ) : currentStep === 1 ? (
          <SelectMedium />
        ) : currentStep === 2 ? (
          <Content />
        ) : (
          <CampaignInfo />
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        {currentStep === 3 ? (
          <Button
            // onClick={() => setCurrentStep(currentStep + 1)}
            size="large"
            type="primary"
            style={{ fontSize: "1rem" }}
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentStep(currentStep + 1)}
            size="large"
            type="primary"
            style={{ fontSize: "1rem" }}
          >
            Next
          </Button>
        )}
      </div>
    </>
  );
};

export default Campaign;
