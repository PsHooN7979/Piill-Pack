import { Box, Typography, styled } from "@mui/material";

const TitleContainer = styled(Box)({
  fontWeight: "bold",
  margin: "2px 15px",
});

const Text = styled(Typography)({
  fontWeight: "bold",
});
const StrongText = styled(Typography)({
  fontWeight: "bold",
});

const S = { TitleContainer, Text, StrongText };
export default S;
