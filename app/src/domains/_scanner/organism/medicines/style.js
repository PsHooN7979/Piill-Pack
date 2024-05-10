import { Box, styled } from "@mui/material";

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

const S = {
  EfficacySection,
  TitleSection,
  NameSection,
  EfficacyImage,
  TitleText,
};
export default S;
