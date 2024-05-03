import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import L from "./logic";
import useCustomNavigate from "../../common/hooks/useCustomNavigate";
import { Box, CircularProgress } from "@mui/material";

export default function Prescription() {
  const nativeState = useSelector((state) => state.native.nativeState);
  const isCamera = useSelector((state) => state.native.isCamera);
  const isRead = useSelector((state) => state.native.isRead);

  const N = useCustomNavigate();

  const [image, setImage] = useState("init");
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    if (nativeState !== "" || isCamera === true || isRead === true) {
      return N.goHome();
    }

    async function getNativeData() {
      const result = await L().takePhoto();
      if (result === "error") {
        return N.goHome();
      }

      setImage(result);
    }

    getNativeData();
    setIsProcessing(false);
  }, []);

  return isProcessing ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <CircularProgress sx={{ color: "lightblue" }} />
    </Box>
  ) : (
    <img src={image} alt={""} />
  );
}
