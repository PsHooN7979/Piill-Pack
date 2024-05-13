import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  components: {
    MuiStepIcon: {
      styleOverrides: {
        root: {
          "&.Mui-completed": {
            color: "#7FDAD7", // 완료된 스탭의 색상
          },
          "&.Mui-active": {
            color: "#E8A1A0", // 현재 활성화된 스탭의 색상
          },
        },
      },
    },
  },
});

export default function TestStep({
  list,
  efficacy,
  handler,
  remove,
  count,
  name,
}) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = (index) => {
    if (index === list.length - 1) handler(name, count);
    else setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (index) => {
    if (index === list.length - 1)
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (list.length === 1) handler(name, count);
    remove(count, index);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Stepper activeStep={activeStep} orientation="vertical">
          {list.map((medicine, index) => (
            <Step key={index}>
              <StepLabel
                optional={
                  index === list.length - 1 ? (
                    <Typography variant="caption">
                      마지막 {efficacy}에요
                    </Typography>
                  ) : null
                }
              >
                {medicine.name}
              </StepLabel>
              <StepContent>
                <Typography>{medicine.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="contained"
                      onClick={() => handleNext(index)}
                      sx={{ mt: 1, mr: 1, background: "#7FDAD7" }}
                    >
                      {index === list.length - 1
                        ? "저장하기"
                        : "다음 의약품 보기"}
                    </Button>
                    <Button
                      onClick={() => handleBack(index)}
                      sx={{ mt: 1, mr: 1, color: "#bbb" }}
                    >
                      삭제하기
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </ThemeProvider>
  );
}
