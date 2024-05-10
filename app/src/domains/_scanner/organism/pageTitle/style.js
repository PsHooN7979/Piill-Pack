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

const MedicineText = styled("span")(({ set }) => ({
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

function SequentialText({ set }) {
  if (!set || !set.text) return;
  const letters = set.text.split("").map((char, index) => {
    const charDelay = set.initialDelay + index * 0.05; // 각 글자마다 0.05초씩 지연을 추가
    return (
      <MedicineText key={index} set={{ ...set, initialDelay: charDelay }}>
        {char === " " ? "\u00A0" : char}
      </MedicineText>
    );
  });

  return <>{letters}</>;
}

const S = { TitleContainer, Text, StrongText, SequentialText };
export default S;
