import React from "react";

export default function useScanEffect({
  isActive,
  nativeState,
  isCamera,
  isRead,
  navigate,
  takePhoto,
  OCR,
  setIsProcessing,
  setMedicineList,
  setIsActive,
}) {
  React.useEffect(() => {
    async function getNativeData() {
      if (nativeState !== "Init" || isCamera || isRead) {
        // navigate.goHome();
        return;
      }

      const imageToBase64 = await takePhoto();
      if (imageToBase64 === "error") {
        // navigate.goHome();
      } else {
        OCR.mutateAsync(imageToBase64).then((result) => {
          setMedicineList(result.data.medicine_list);
        });
        setIsProcessing(false);
        setIsActive(false);
      }
    }

    getNativeData();

    //테스트 종료 후 제거
    setIsProcessing(false);
    setIsActive(false);
  }, [isActive, nativeState, isCamera, isRead, navigate, takePhoto, OCR]);
}
