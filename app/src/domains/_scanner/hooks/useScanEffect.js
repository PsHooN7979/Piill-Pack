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
        return navigate.goHome();
      }

      const imageToBase64 = await takePhoto();
      if (imageToBase64 === "error") {
        return navigate.goHome();
      } else {
        setIsProcessing(false);
        await OCR.mutateAsync(imageToBase64).then((result) => {
          if (!result.status || result.status !== 200) return navigate.goHome();
          setMedicineList(result.data.medicine_list);
        });

        setTimeout(() => setIsActive(false), 3000);
      }
    }

    getNativeData();
  }, []);
}
