//Library
import React from "react";

//Logic and Style
import L from "./logic";
import S from "./style";

//Hooks
import useCustomNavigate from "../../common/hooks/useCustomNavigate";
import useSelect from "./hooks/___useSelect";
import useMutate from "./hooks/__useMutate";
import useScannerState from "./hooks/_useScannerState";
import useTextEffect from "./hooks/useTextEffect";
import useScanEffect from "./hooks/useScanEffect";

//Constant
import images from "../../constants/image.constant";

//Components
import AppBar from "./components/appbar/_appbar";
import Title from "./components/title/title";
import { Box } from "@mui/material";

export default function Scanner() {
  const initialState = {
    medicineList: [],
    isProcessing: true,
    isActive: true,
  };
  const {
    medicineList,
    setMedicineList,
    isProcessing,
    setIsProcessing,
    isActive,
    setIsActive,
  } = useScannerState(initialState);

  const { OCR } = useMutate();
  const { nativeState, isCamera, isRead } = useSelect();
  const navigate = useCustomNavigate();
  const loadingText = useTextEffect(isActive);

  useScanEffect({
    isActive,
    nativeState,
    isCamera,
    isRead,
    navigate,
    takePhoto: L().takePhoto,
    OCR,
    setIsProcessing,
    setMedicineList,
    setIsActive,
  });

  if (isProcessing)
    return <Box sx={{ height: "100vh", background: "black" }} />;
  return (
    <S.ScannerContainer>
      <AppBar />
      <Title isActive={isActive} />
      <S.AnalysisSection>
        <S.AnalysisPaper elevation={3}>
          {isActive ? (
            <>
              <S.LoadingImage src={images.loading} />
              <S.AnalysisTitle>{loadingText}</S.AnalysisTitle>
            </>
          ) : (
            <></>
          )}
        </S.AnalysisPaper>
      </S.AnalysisSection>
    </S.ScannerContainer>
  );
}
