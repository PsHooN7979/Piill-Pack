import { useNavigate } from "react-router-dom";

function useACustomNavigate() {
  const navigate = useNavigate();

  const goAuth = () => navigate("/");
  const goFirst = () => navigate("/first");
  const goHome = () => navigate("/home");
  const goPrescription = () => navigate("/prescription");

  const goBack = () => navigate(-1);
  const goToPage = (path) => navigate(path);

  return { goAuth, goFirst, goHome, goPrescription, goBack, goToPage };
}

export default useACustomNavigate;
