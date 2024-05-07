import axios from "axios";

export async function ocrRepo(imageToBase64) {
  return await axios.post("/ocr", {
    imageToBase64: imageToBase64,
  });
}
