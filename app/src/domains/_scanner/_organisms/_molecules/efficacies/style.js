import { Box, styled } from "@mui/material";

const MedicineContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  overflowY: "scroll",
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});
const BlinkingContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "center",
  width: "100%",
  paddingRight: "8px",
  opacity: 0,
  "@keyframes blink-effect": {
    "50%": {
      opacity: 1,
    },
  },
  animation: "blink-effect 1s 1.5s forwards step-end infinite",
});
const TooltipBox = styled(Box)(({ theme, state }) => ({
  opacity: state === "" ? 1 : 0,
  position: "relative",
  display: "inline-block",
  border: "1px solid #ccc",
  padding: "2px 5px",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  fontSize: "12px",

  "&::after, &::before": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "50%",
    border: "solid transparent",
    height: "0",
    width: "0",
    pointerEvents: "none",
  },

  "&::before": {
    borderColor: "rgba(204, 204, 204, 0)",
    borderWidth: "8px",
    marginLeft: "-8px",
    borderTopColor: "#ccc",
  },

  "&::after": {
    borderColor: "rgba(255, 255, 255, 0)",
    borderWidth: "7px",
    marginLeft: "-7px",
    borderTopColor: "#f9f9f9",
  },
}));

const S = {
  MedicineContainer,
  BlinkingContainer,
  TooltipBox,
};
export default S;
