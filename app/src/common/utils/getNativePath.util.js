/**
 * 네이티브 디바이스로부터 실제 이미지 경로를 가져옵니다.
 * @param {string} fullPath
 */
export default function getNativePath(fullPath) {
  return "/storage/emulated/0/DCIM/" + fullPath.split("/").slice(-2).join("/");
}
