import { Box, styled } from "@mui/material";

const Process = styled(Box)({
  height: "100vh",
  background: "black",
});
const Container = styled(Box)(({ image }) => ({
  backgroundImage: `url(${image})`,
  height: "100vh",
  backgroundSize: "100% 20%",
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
}));

const S = {
  Process,
  Container,
};
export default S;
