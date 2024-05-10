import { Box, styled } from "@mui/material";

const Container = styled(Box)({
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  margin: "2px 15px",
});
const Text = styled("span")(({ set }) => ({
  fontSize: set.isMiddle ? "22px" : "16px",
  fontWeight: "bold",
  color: set.color,
  opacity: 0,
  display: "inline-block",
  transform: "translateY(20px)",
  whiteSpace: "pre-wrap",
  animation: `fadeInUp 0.5s ${set.initialDelay}s forwards`,
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

const S = { Container, Text };
export default S;
