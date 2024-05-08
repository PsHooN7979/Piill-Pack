import { Box, Paper, styled } from "@mui/material";
import images from "../../constants/image.constant";

const ProcessBlack = styled(Box)({
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
const AnalysisPaper = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "90%",
  height: "100%",
  borderRadius: "15px",
  padding: "15px",
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
  ProcessBlack,
};
export default S;
