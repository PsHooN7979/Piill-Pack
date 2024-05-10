import { Box, Button, Paper, styled } from "@mui/material";
import images from "../../constants/image.constant";

const Process = styled(Box)({
  height: "100vh",
  background: "black",
});
const ScannerContainer = styled(Box)({
  backgroundImage: `url(${images.wave})`,
  height: "100vh",
  backgroundSize: "100% 20%",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
});
const AnalysisSection = styled(Box)({
  display: "flex",
  width: "100%",
  height: "80%",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "5px",
});
const AnalysisPaper = styled(({ state, loading, ...otherProps }) => (
  <Paper {...otherProps} />
))(({ state, loading }) => ({
  display: state ? "flex" : "none",
  flexDirection: "column",
  justifyContent: loading ? "center" : "space-between",
  alignItems: loading ? "center" : "",
  width: "90%",
  height: "100%",
  borderRadius: "15px",
  padding: loading ? "15px" : "10px",
  overflow: loading ? "" : "scroll",
  scrollbarWidth: loading ? "" : "none",
  msOverflowStyle: loading ? "" : "none",
  "&::-webkit-scrollbar": {
    display: loading ? "" : "none",
  },
}));
const ShowSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});
const TitleSection = styled(Box)({
  display: "flex",
  marginBottom: "5px",
});
const MedicineImage = styled("img")({
  display: "flex",
  width: "10%",
  opacity: 0,
  display: "inline-block",
  transform: "translateY(20px)",
  animation: `fadeInUp 0.5s 1s forwards`,
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
});
const MedicineText = styled("span")(({ delay }) => ({
  fontSize: "20px",
  fontWeight: "bold",
  opacity: 0,
  display: "inline-block",
  transform: "translateY(20px)",
  animation: `fadeInUp 0.5s ${delay}s forwards`,
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
function SequentialText({ text }) {
  const letters = text.split("").map((char, index) => (
    <MedicineText key={index} delay={1.1 + index * 0.02}>
      {char === " " ? "\u00A0" : char}
    </MedicineText>
  ));

  return <div>{letters}</div>;
}
const SelectSection = styled(Box)({
  display: "flex",
  justifyContent: "center",
  padding: "20px 0px",
  background: "white",
  position: "sticky",
  bottom: 0,
});
const SaveButton = styled(Button)({
  display: "flex",
  width: "65%",
  color: "white",
  background: "#7FDAD7",
  fontSize: "17px",
  fontWeight: "bold",
  padding: "17px 10px",
  marginRight: "7px",
});
const DetailButton = styled(Button)({
  display: "flex",
  color: "white",
  background: "#E8A1A0",
  fontSize: "17px",
  fontWeight: "bold",
  padding: "17px 10px",
});
const AnalysisTitle = styled(Box)({
  fontSize: "20px",
  fontWeight: "bold",
  marginBottom: "30%",
});
const LoadingImage = styled("img")({
  width: "250px",
});

const S = {
  ScannerContainer,
  AnalysisPaper,
  AnalysisSection,
  AnalysisTitle,
  LoadingImage,
  Process,
  SequentialText,
  MedicineImage,
  TitleSection,
  ShowSection,
  SelectSection,
  SaveButton,
  DetailButton,
};
export default S;
