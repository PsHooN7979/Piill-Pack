import getNativePath from "../../common/utils/getNativePath.util";

export default function useLogic() {
  async function useCamera() {
    return new Promise((resolve, reject) => {
      M.media.camera({
        path: "/media",
        mediaType: "PHOTO",
        saveAlbum: true,
        callback: function (status, result, option) {
          if (status == "SUCCESS") {
            resolve(result.fullpath);
          } else {
            reject(new Error("Failed to camera"));
          }
        },
      });
    });
  }

  async function AsyncUseCamera() {
    try {
      const fullPath = await useCamera();
      return fullPath;
    } catch (error) {
      console.error(error);
    }
  }

  async function useRead(path) {
    return new Promise((resolve, reject) => {
      M.file.read({
        path: path,
        encoding: "BASE64",
        indicator: true,
        callback: function (status, result) {
          if (status === "SUCCESS") {
            resolve(result);
          } else {
            reject(new Error("Failed to pick media"));
          }
        },
      });
    });
  }

  async function AsyncUseRead(path) {
    try {
      const imageToBase64 = await useRead(path);
      return "data:image/png;base64," + imageToBase64.data;
    } catch (error) {
      console.error(error);
    }
  }

  async function takePhoto() {
    const fullPath = await AsyncUseCamera();
    const path = getNativePath(fullPath);
    const photo = await AsyncUseRead(path);

    return photo;
  }

  const Logic = { takePhoto };
  return Logic;
}
