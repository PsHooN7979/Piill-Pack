import React from "react";

import L from "./logic";
import S from "./scanner.style";

import useCustomNavigate from "../../common/hooks/useCustomNavigate";
import useSelect from "./hooks/useSelect";
import useMutate from "./hooks/useMutate";

import Progress from "./components/progress/progress";

export default function Scanner() {
  const { OCR } = useMutate;
  const { nativeState, isCamera, isRead } = useSelect;
  const N = useCustomNavigate();

  const [isProcessing, setIsProcessing] = React.useState(true);

  React.useEffect(() => {
    if (nativeState !== "" || isCamera === true || isRead === true) {
      return N.goHome();
    }
    async function getNativeData() {
      const result = await L().takePhoto();
      if (result === "error") {
        return N.goHome();
      }
      return result;
    }
    const imageToBase64 = getNativeData();
    OCR.mutateAsync(imageToBase64).then((result) => {});

    setIsProcessing(false);
  }, []);

  return isProcessing ? <Progress /> : <></>;
}
