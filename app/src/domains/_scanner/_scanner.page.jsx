//Library
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Box } from "@mui/material";

//Logic and Style
import L from "./logic";
import S from "./style";

//Hooks
import useCustomNavigate from "../../common/hooks/useCustomNavigate";
import useTextEffect from "./hooks/useTextEffect";

//Constant
import images from "../../constants/image.constant";

//Repository
import scannerRepo from "./repositories/scanner.repository";

//Components
import AppBar from "./components/appbar/_appbar";
import Title from "./components/title/title";

export default function Scanner() {
  const navigate = useCustomNavigate();

  const [medicineList, setMedicineList] = React.useState([]);
  const [isProcessing, setIsProcessing] = React.useState(true);
  const [isActive, setIsActive] = React.useState(true);

  const mutateOCR = useMutation({
    mutationFn: scannerRepo.ocr,
  });

  React.useEffect(() => {
    async function getNativeData() {
      const imageToBase64 = await L().takePhoto();

      if (imageToBase64 === "fullPath" || imageToBase64 === "photo") {
        return navigate.goHome();
      }

      setIsProcessing(false);

      await mutateOCR
        .mutateAsync(imageToBase64)
        .then((result) => {
          setMedicineList(result.data.medicine_list);
        })
        .catch((error) => {
          console.log("mutate error");
          return navigate.goHome();
        });

      setTimeout(() => setIsActive(false), 3000);
    }

    getNativeData();
  }, []);

  // const loadingText = useTextEffect(isActive);

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
              <S.AnalysisTitle>{"loadingText"}</S.AnalysisTitle>
            </>
          ) : (
            <>
              {medicineList.map((medicine, index) => (
                <>test</>
              ))}
            </>
          )}
        </S.AnalysisPaper>
      </S.AnalysisSection>
    </S.ScannerContainer>
  );
}
