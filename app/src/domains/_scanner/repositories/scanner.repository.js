import axios from "axios";

const scannerRepo = {
  ocr: async (imageToBase64) => {
    return await axios.post("/ocr");
  },
};

export default scannerRepo;
