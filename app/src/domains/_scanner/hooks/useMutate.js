import { useMutation } from "@tanstack/react-query";
import { ocrRepo } from "../repositories/scanner.repository";

function useMutate() {
  const OCR = useMutation({
    mutationFn: ocrRepo,
  });

  return { OCR };
}

export default useMutate;
