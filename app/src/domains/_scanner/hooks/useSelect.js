import { useSelector } from "react-redux";

function useSelect() {
  const nativeState = useSelector((state) => state.native.nativeState);
  const isCamera = useSelector((state) => state.native.isCamera);
  const isRead = useSelector((state) => state.native.isRead);

  return { nativeState, isCamera, isRead };
}

export default useSelect;
