import { useNavigate } from "react-router-dom";

import uis from "../../../constants/ui.constant";

export default function EtcPageHeader({ title }) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-between p-2 shadow-md h-16">
      <button onClick={goBack} className="text-lg">
        <div className="px-3">
          <img src={uis.prev} alt="back_btn" className="w-2" />
        </div>
      </button>
      <div className="text-lg font-semibold">{title}</div>
      <div className="w-8">
      </div>
    </div>
  );
}
