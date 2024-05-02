import { Box } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

export default function Scan() {
  return (
    <Box
      sx={{
        display: "flex",

        borderRadius: "5px",
        border: "1px solid lightgray",
        paddingLeft: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "11px",
          }}
        >
          진단서
        </Box>
        <Box
          sx={{
            fontWeight: "bold",
            fontSize: "11px",
          }}
        >
          스캔하기
        </Box>
      </Box>
      <CameraAltOutlinedIcon
        sx={{
          color: "#00CFAC",
          // background: "black",
          width: "40px",
          height: "40px",
          padding: "5px",
          marginLeft: "12px",
          marginRight: "5px",
          // border: "1px solid lightgray",
          borderRadius: "7px",
        }}
      />
    </Box>
  );
}
