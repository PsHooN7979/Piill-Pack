import getNativePath from "../../common/utils/getNativePath.util";

export default function useLogic() {
  async function useCamera() {
    return new Promise((resolve, reject) => {
      M.media.camera({
        path: "/media",
        mediaType: "PHOTO",
        saveAlbum: true,
        callback: function (status, result, option) {
          if (status === "SUCCESS") {
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
      return { status: "error", message: error };
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
      return { status: "error", message: error };
    }
  }

  async function takePhoto() {
    const fullPath = await AsyncUseCamera();
    if (fullPath.status === "error") return "error";

    const path = getNativePath(fullPath);

    const photo = await AsyncUseRead(path);
    if (photo.status === "error") return "error";

    return photo;
  }

  function goBack(N) {
    M.onBack(function (e) {
      return N.goHome();
    });
  }

  const L = { takePhoto, goBack };
  return L;
}
