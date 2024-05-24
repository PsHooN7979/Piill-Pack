import { useEffect, useRef, useState } from "react";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import PrescEditHeader from "./components/presc.edit.header";
import PrescEdit from "./components/presc.edit";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { modifyPrescription, searchMedicine } from "./repositories/presc.repository";
import { setMedicines, setPrescriptions } from "./slices/presc.slice";
import { addSnackBar } from "../../common/feature/slices/snackBar.slice";

export default function PrescEditPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectPresc } = location.state || {};
  const inputRef = useRef(null); // 검색 인풋 ref
  const medicines = useSelector((state) => state.prescriptions.medicines);
  const [searchTerm, setSearchTerm] = useState("");
  const [prescriptionData, setPrescriptionData] = useState({
    name: selectPresc.name || '',
    medicines: selectPresc.medicines || [],
    created: selectPresc.created || '',
    updated: selectPresc.updated || '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleSearch = async () => {
    try {
      const response = await searchMedicine(searchTerm);
      dispatch(setMedicines(response));
      if (inputRef.current) {
        inputRef.current.focus(); // 검색 아이콘 버튼을 눌렀을 때 인풋 필드에 포커스 설정
      }
    } catch (error) {
      console.error("약 검색 중 오류 발생:", error);
      dispatch(addSnackBar({ id: Date.now(), message: "검색 결과가 없습니다" }));
    }
  };

  const handleEditPrescription = async () => {
    try {
      const updatedPrescriptionData = {
        ...prescriptionData,
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        medicines: prescriptionData.medicines.map(medicine => ({
          ediCode: medicine.EDI_CODE,
          name: medicine.ITEM_NAME,
          chart: medicine.CHART,
          className: medicine.CLASS_NAME,
          itemSeq: medicine.ITEM_SEQ
        }))
      };
      const response = await modifyPrescription(selectPresc.id, updatedPrescriptionData);
      dispatch(setPrescriptions(response)); // 새 처방전을 스토어에 추가
      dispatch(addSnackBar({ id: Date.now(), message: "처방전 수정이 완료되었습니다" }));
      navigate(-1);
    } catch (error) {
      console.error("처방 추가 중 오류 발생:", error);
      dispatch(addSnackBar({ id: Date.now(), message: "처방전 수정 실패" }));
    }
  };

  return (
    <div className="relative">
      <PrescEditHeader title="처방 정보 수정" onEdit={handleEditPrescription} />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[85%] min-h-screen">
          <PrescEdit 
            medicines={medicines}
            handleSearch={handleSearch}
            setSearchTerm={setSearchTerm}
            prescriptionData={prescriptionData}
            setPrescriptionData={setPrescriptionData}
            inputRef={inputRef}
          />
        </div>
      </div>

      <BottomNavigation active="2" />
      {/* 배경 */}
      <div className="absolute bottom-0 w-full">
        <div className="relative w-full h-auto bottom-0">
          <img
            src={images.wave}
            alt="Background"
            className="fixed bottom-0 w-full h-60 z-[-1]"
          />
        </div>
      </div>
    </div>
  );
}
