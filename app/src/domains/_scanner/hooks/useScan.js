import React from "react";

export default function useScan({
  isActive,
  nativeState,
  isCamera,
  isRead,
  navigate,
  takePhoto,
  OCR,
  setIsProcessing,
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
        OCR.mutateAsync(imageToBase64);
      }
      setIsProcessing(false);
    }

    if (isActive) {
      getNativeData();
    }
  }, [isActive, nativeState, isCamera, isRead, navigate, takePhoto, OCR]);
}
