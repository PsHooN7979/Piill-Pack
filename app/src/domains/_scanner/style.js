import { Box, styled } from "@mui/material";
import images from "../../constants/image.constant";

const Process = styled(Box)({
  height: "100vh",
  background: "black",
});
const Container = styled(Box)({
  backgroundImage: `url(${images.wave})`,
  height: "100vh",
  backgroundSize: "100% 20%",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
});

const S = {
  Process,
  Container,
};
export default S;
