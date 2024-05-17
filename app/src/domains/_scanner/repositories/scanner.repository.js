import axios from "axios";

const scannerRepo = {
  ocr: async (imageToBase64) => {
    return await axios.post("/ocr");
  },
  analysis: async (medicines) => {
    return await axios.post("/analysis");
  },
};

export default scannerRepo;
