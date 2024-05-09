import { Box, styled } from "@mui/material";

const MedicineContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});
const EfficacySection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "10px 15px",
  paddingRight: "5px",
});
const TitleSection = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  marginBottom: "5px",
});
const EfficacyImage = styled("img")(({ delay }) => ({
  width: "8%",
  marginLeft: "7px",
  border: "2px solid pink",
  borderRadius: "20px",
  padding: "7px",
  boxSizing: "content-box",
  opacity: 0,
  display: "inline-block",
  transform: "translateY(20px)",
  animation: `fadeInUp 0.5s ${delay / 3 + 1.5}s forwards`,
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));
const TitleText = styled(Box)(({ delay }) => ({
  fontWeight: "bold",
  fontSize: "15px",
  opacity: 0,
  display: "inline-block",
  transform: "translateY(20px)",
  animation: `fadeInUp 0.5s ${delay / 3 + 1.5}s forwards`,
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
}));
const NameSection = styled(Box)({
  display: "flex",
});
const BlinkingContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "center",
  width: "100%",
  paddingRight: "8px",
  opacity: 0,
  "@keyframes blink-effect": {
    "50%": {
      opacity: 1,
    },
  },
  animation: "blink-effect 1s 1.5s forwards step-end infinite",
});
const TooltipBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  border: "1px solid #ccc",
  padding: "2px 5px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  fontSize: "12px",

  "&::after, &::before": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "50%",
    border: "solid transparent",
    height: "0",
    width: "0",
    pointerEvents: "none",
  },

  "&::before": {
    borderColor: "rgba(204, 204, 204, 0)",
    borderWidth: "8px",
    marginLeft: "-8px",
    borderTopColor: "#ccc",
  },

  "&::after": {
    borderColor: "rgba(255, 255, 255, 0)",
    borderWidth: "7px",
    marginLeft: "-7px",
    borderTopColor: "#f9f9f9",
  },
}));

const S = {
  MedicineContainer,
  EfficacySection,
  TitleSection,
  NameSection,
  EfficacyImage,
  TitleText,
  BlinkingContainer,
  TooltipBox,
};
export default S;
