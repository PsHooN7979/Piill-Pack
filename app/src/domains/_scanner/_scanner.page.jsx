import React from "react";

import L from "./logic";
import S from "./style";

import useCustomNavigate from "../../common/hooks/useCustomNavigate";
import useSelect from "./hooks/useSelect";
import useMutate from "./hooks/useMutate";

import Progress from "./components/progress/progress";

export default function Scanner() {
  const { OCR } = useMutate();
  const { nativeState, isCamera, isRead } = useSelect();
  const N = useCustomNavigate();

  const [isProcessing, setIsProcessing] = React.useState(true);
  const [medicineList, setMedicineList] = React.useState([]);

  React.useEffect(() => {
    if (nativeState !== "Init" || isCamera === true || isRead === true) {
      return N.goHome();
    }
    async function getNativeData() {
      const imageToBase64 = await L().takePhoto();
      if (imageToBase64 === "error") {
        console.log("native error");
        return N.goHome();
      }
      OCR.mutateAsync(imageToBase64).then((result) => {});
    }
    getNativeData();
    setIsProcessing(false);
  }, []);

  return isProcessing ? <Progress /> : <></>;
}
