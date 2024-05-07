//Library
import React from "react";

//Logic and Style
import L from "./logic";
import S from "./style";

//Hooks
import useCustomNavigate from "../../common/hooks/useCustomNavigate";
import useSelect from "./hooks/useSelect";
import useMutate from "./hooks/useMutate";

//Components
import Progress from "./components/progress/_progress";
import AppBar from "./components/appbar/_appbar";
import Title from "./components/title/title";

export default function Scanner() {
  const { OCR } = useMutate();
  const { nativeState, isCamera, isRead } = useSelect();
  const N = useCustomNavigate();

  const [isProcessing, setIsProcessing] = React.useState(true);
  const [medicineList, setMedicineList] = React.useState([]);

  React.useEffect(() => {
    if (nativeState !== "Init" || isCamera === true || isRead === true) {
      // return N.goHome();
    }
    async function getNativeData() {
      const imageToBase64 = await L().takePhoto();
      if (imageToBase64 === "error") {
        return N.goHome();
      }
      setIsProcessing(false);
      OCR.mutateAsync(imageToBase64).then((result) => {
        setMedicineList(result.data.medicine_list);
      });
    }
    // getNativeData();
  }, []);

  if (isProcessing)
    return (
      <S.ScannerContainer>
        <AppBar />
        <Title />
        <Progress />
      </S.ScannerContainer>
    );

  return (
    <S.ScannerContainer>
      <AppBar />
      <Title />
      <S.AnalysisPaper elevation={3}>test</S.AnalysisPaper>
    </S.ScannerContainer>
  );
}
