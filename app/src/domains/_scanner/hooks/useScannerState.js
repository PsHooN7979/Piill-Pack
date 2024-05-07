import { useState } from "react";

export default function useScannerState(initialValues) {
  const [medicineList, setMedicineList] = useState(initialValues.medicineList);
  const [isProcessing, setIsProcessing] = useState(initialValues.isProcessing);
  const [isActive, setIsActive] = useState(initialValues.isActive);

  return {
    medicineList,
    setMedicineList,
    isProcessing,
    setIsProcessing,
    isActive,
    setIsActive,
  };
}
