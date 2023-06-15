"use client";
import React from "react";
import { createCustomer } from "../../sdk/Action";
import {
  Typography,
  Box,
  Stack,
  ButtonGroup,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import QontoStepIcon, { QontoConnector } from "@unstyled/StepperCounter";
import Register from "@components/Register";
import { ButtonLoad } from "@unstyled/Addload";
import { useSessionStorage } from "usehooks-ts";
import { useRouter } from "next/navigation";
import MerchantRegister from "./partner/page";
import GetLocation from "@components/MapLocation";
import FindCurrentLocation from "@lib/location";

export default function Registering() {
  const [activeStep, setActiveStep] = useSessionStorage("step-key", 0);
  const [continueAs, setContinueAs] = useSessionStorage("type-key", "");
  const [userId, setUserId] = useSessionStorage("uid-key", "");
  const steps = ["Choose a role", "address", "Create Account", "Finish"];

  const router = useRouter();

  const getTheuserId = (uid: string) => {
    setUserId(uid);
  };

  const handleStepUP = (value: number) => {
    setActiveStep(value);
  };

  const handleChoice = (value: string) => {
    setContinueAs(value);
  };

  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "90vh",
      }}
    >
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label, index) => (
          <Step sx={{ minWidth: 200 }} key={index}>
            <StepLabel
              sx={{ fontWeight: 900 }}
              StepIconComponent={QontoStepIcon}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          my: 4,
          mx: "auto",
          width: "60%",
          minHeight: "60vh",
          justifySelf: "center",
          alignItems: "center",
        }}
      >
        {activeStep === 0 ? (
          <ChoiceStep
            handleStepUP={handleStepUP}
            handleChoice={handleChoice}
            activeStep={activeStep}
          />
        ) : activeStep === 2 &&
          (continueAs === "customer" || continueAs === "drivers") ? (
          <Register
            handleStepUP={handleStepUP}
            getTheuserId={getTheuserId}
            activeStep={activeStep}
            continueAs={continueAs}
            userId={userId}
          />
        ) : activeStep === 2 && continueAs === "partner" ? (
          <MerchantRegister
            handleStepUP={handleStepUP}
            getTheuserId={getTheuserId}
            activeStep={activeStep}
          />
        ) : (
          activeStep === 1 && (
            <FindCurrentLocation
              handleStepUP={handleStepUP}
              activeStep={activeStep}
            />
          )
        )}
      </Box>
    </Stack>
  );
}

export const ChoiceStep = ({ ...props }) => {
  const { activeStep, handleStepUP, handleChoice } = props;
  return (
    <Box>
      <Typography variant="h4" color="inherit">
        Welcome back !<br /> You can Continue ...
      </Typography>
      <ButtonGroup
        size="large"
        color="inherit"
        variant="contained"
        disableElevation
        aria-label="vertical outlined button group"
      >
        <ButtonLoad loading={activeStep === 2}>
          <Button
            disabled={activeStep === 2}
            onClick={() => {
              handleChoice("customer");
              handleStepUP(activeStep + 1);
            }}
          >
            ...As a Customer
          </Button>
        </ButtonLoad>
        <ButtonLoad loading={activeStep === 2}>
          <Button
            disabled={activeStep === 2}
            onClick={() => {
              handleChoice("partner");
              handleStepUP(activeStep + 1);
            }}
          >
            ...As a Partner
          </Button>
        </ButtonLoad>
        <ButtonLoad loading={activeStep === 2}>
          <Button
            disabled={activeStep === 2}
            onClick={() => {
              handleChoice("drivers");
              handleStepUP(activeStep + 1);
            }}
          >
            ...As a Driver
          </Button>
        </ButtonLoad>
      </ButtonGroup>
    </Box>
  );
};

// export const UploadStep = ({ ...props }) => {
//   const { activeStep, continueAs, handleStepUP, router, userId } = props;
//   if (activeStep === 2) {
//     sessionStorage.removeItem("step-key");
//     sessionStorage.removeItem("uid-key");
//     sessionStorage.removeItem("type-key");
//   }
//   if (continueAs === "customer" && activeStep === 2) {
//     createCustomer(userId)
//       .then(() => router.push("/signin"))
//       .catch((err) => console.log(err));
//   }
//   return (
//     <Box>
//       {continueAs === "partner" ? (
//         <Typography variant="h3" color="inherit">
//           Partner place
//         </Typography>
//       ) : (
//         continueAs === "driver" && (
//           <Button
//             variant="outlined"
//             sx={{ border: "1px dashed #00ff64", p: "4em 4em" }}
//             disableElevation
//             component="label"
//             color="primary"
//           >
//             Upload Your <br /> Driver License
//             <input type="file" hidden />
//           </Button>
//         )
//       )}
//     </Box>
//   );
// };
