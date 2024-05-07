import { Box, Paper, styled } from "@mui/material";
import images from "../../constants/image.constant";

const ScannerContainer = styled(Box)({
  backgroundImage: `url(${images.wave})`,
  height: "100vh",
  width: "100%",
  backgroundSize: "100% 30%",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
});

const AnalysisPaper = styled(Paper)({});

const S = { ScannerContainer, AnalysisPaper };
export default S;
