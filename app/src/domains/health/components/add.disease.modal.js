import uis from "../../../constants/ui.constant";

export default function AddingDiseaseModal({ onClose }) {

  const handleClose = () => {
    onClose();
  };

  // 모달 바깥쪽 클릭 시 모달 닫기
  const handleBackdropClick = (e) => {
    if (e.target.id === "backdrop") {
      onClose();
    }
  };

  return (
    <div
      id="backdrop"
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white pt-1 rounded-xl shadow-custom01 w-80 h-80">
        {/* 닫기 버튼 */}
        <div className="flex justify-end mb-1">
          <button onClick={handleClose} className="p-2">
            <img src={uis.close} alt="Close" className="h-4 w-4" />
          </button>
        </div>
        {/* 폼 제목 */}
        <div className="text-2xl font-bold text-center text-shadow-custom01 mb-5">
          질병 입력
        </div>
        
      </div>
    </div>
  );
}
