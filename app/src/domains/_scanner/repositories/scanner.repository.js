import axios from "axios";

const scannerRepo = {
  ocr: async (data) => {
    console.log("repo1:");
    return await axios.post(
      "/prescription/scan",
      {
        base64_image_to_string: data.newImageToBase64String,
      },
      { headers: { Authorization: data.token } }
    );
  },
  analysis: async (data) => {
    console.log("repo2:");
    return await axios.post(
      "/prescription/register",
      {
        analyzeMedicine: data.medicineList,
      },
      {
        headers: {
          Authorization: data.token,
        },
      }
    );
  },
};

export default scannerRepo;
