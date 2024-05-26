import { useNavigate } from "react-router-dom";

function useCustomNavigate() {
  const navigate = useNavigate();

  const goAuth = () => navigate("/");
  const goFirst = () => navigate("/first");
  const goHome = () => navigate("/home");
  const goScanner = () => navigate("/scanner");
  const goPrescription = () => navigate("/prescription");
  const goPrescriptionEdit = () => navigate("/prescription/edit");

  const goBack = () => navigate(-1);
  const goToPage = (path) => navigate(path);

  return {
    goAuth,
    goFirst,
    goHome,
    goPrescription,
    goBack,
    goToPage,
    goScanner,
    goPrescriptionEdit,
  };
}

export default useCustomNavigate;
