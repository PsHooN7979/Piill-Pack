import { Box, Typography, styled } from "@mui/material";

const TitleContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  margin: "2px 15px",
});

const Text = styled(Typography)({
  fontWeight: "bold",
});
const StrongText = styled(Typography)({
  fontWeight: "bold",
});

const MedicineText = styled("span")(({ delay, variant, color }) => ({
  fontSize: variant === "h6" ? "22px" : "16px",
  fontWeight: "bold",
  color: color || "black",
  opacity: 0,
  display: "inline-block",
  transform: "translateY(20px)",
  whiteSpace: "pre-wrap",
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

function SequentialText({ text, initialDelay = 0, variant, color }) {
  const letters = text.split("").map((char, index) => (
    <MedicineText
      key={index}
      delay={initialDelay + index * 0.02}
      variant={variant}
      color={color}
    >
      {char === " " ? "\u00A0" : char}
    </MedicineText>
  ));

  return <div>{letters}</div>;
}

const S = { TitleContainer, Text, StrongText, SequentialText };
export default S;
