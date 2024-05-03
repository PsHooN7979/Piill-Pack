import { Box } from "@mui/material";
import styled from "@emotion/styled";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

const Container = styled(Box)({
  display: "flex",
  paddingLeft: "10px",
  marginTop: "7px",
  borderRadius: "5px",
  border: "1px solid lightgray",

  transition: "transform 0.2s, background-color 0.2s",
  "&:active": {
    transform: "scale(0.95)",
    backgroundColor: "lightblue",
  },
});

const TextContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const TextBox = styled(Box)({
  fontWeight: "bold",
  fontSize: "11px",
});

const CameraIcon = styled(CameraAltOutlinedIcon)({
  color: "#00CFAC",
  width: "40px",
  height: "40px",
  padding: "5px",
  marginLeft: "12px",
  marginRight: "5px",
  borderRadius: "7px",
});

const S = { Container, TextContainer, TextBox, CameraIcon };
export default S;
