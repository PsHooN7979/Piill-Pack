import { Box, styled } from "@mui/material";

const EfficacySection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: "10px 15px",
  paddingRight: "5px",
});
const TitleSection = styled(Box)(({ state }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: state === "" ? "flex-end" : "space-between",
  flexDirection: state === "" ? "row" : "column",
  marginBottom: "5px",
}));
const EfficacyImage = styled("img")(({ delay, state, name }) => ({
  display: state === "" || state === name ? "inline-block" : "none",
  width: "8%",
  marginLeft: "7px",
  border: "2px solid pink",
  borderRadius: "20px",
  padding: "7px",
  boxSizing: "content-box",
  opacity: 0,
  transform: "translateY(20px)",
  animation: `fadeInUp 0.5s ${delay / 10}s forwards`,
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
const TitleText = styled(Box)(({ delay, state }) => ({
  display: state === "" ? "inline-block" : "none",
  fontWeight: "bold",
  fontSize: "15px",
  opacity: 0,
  transform: "translateY(20px)",
  animation: `fadeInUp 0.5s ${delay / 10}s forwards`,
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
const EfficacyText = styled(Box)(({ delay, state, name }) => ({
  display: state === name ? "inline-block" : "none",
  fontWeight: "bold",
  fontSize: "15px",
  marginTop: "7px",
  opacity: 0,
  transform: "translateY(20px)",
  animation: `fadeInUp 0.5s ${delay / 3}s forwards`,
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

const S = {
  EfficacySection,
  TitleSection,
  NameSection,
  EfficacyImage,
  TitleText,
  EfficacyText,
};
export default S;
