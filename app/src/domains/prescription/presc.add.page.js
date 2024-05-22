import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPrescription, fetchMedicine } from "./slices/presc.slice";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import PrescAddHeader from "./components/presc.add.header";
import PrescAdd from "./components/presc.add"

export default function PrescAddPage() {
  const dispatch = useDispatch();
  const medicines = useSelector((state) => state.prescriptions.medicines);
  const [searchTerm, setSearchTerm] = useState("");
  const [prescriptionData, setPrescriptionData] = useState({
    name: '',
    medicines: [],
    created: '',
    updated: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearch = () => {
    dispatch(fetchMedicine(searchTerm));
  };

  const handleAddPrescription = () => {
    const newPrescriptionData = {
      ...prescriptionData,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };
    dispatch(addNewPrescription(newPrescriptionData));
  };

  return (
    <div className="relative">
      <PrescAddHeader title="처방 목록 추가" onAdd={handleAddPrescription} />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[85%] min-h-screen">
          <PrescAdd
            pill={medicines}
            onSearch={handleSearch}
            setSearchTerm={setSearchTerm}
            prescriptionData={prescriptionData}
            setPrescriptionData={setPrescriptionData}
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
