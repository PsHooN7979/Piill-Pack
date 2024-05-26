import PrescHeader from "./components/prescHeader";
import BottomNavigation from "../../common/components/BottomNavigation";
import PrescSelect from "./components/presc.select";
import images from "../../constants/image.constant";
import { useEffect } from "react";
import Title from "../_scanner/_organisms/title/_title";
import constant from "../../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { getPrescriptions } from "./repositories/presc.repository";
import { setPrescriptions } from "./slices/presc.slice";

export default function PrescriptionList() {
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const response = await getPrescriptions();
        console.log("처방전 목록 가져옴", response.data);
        dispatch(setPrescriptions(response.data));
      } catch (error) {
        console.error("처방전 목록을 가져오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const data2 = useSelector((state) => state.prescriptions.prescriptions || []);
  const prescriptionList = useSelector((state) => state.user.prescriptionList);
  const loading = useSelector((state) => state.prescriptions.loading);
  const error = useSelector((state) => state.prescriptions.error);

  console.log("리덕스 스토어에서 처방전 가져옴▼");
  console.dir(data2);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative">
      <PrescHeader />
      <Title title={constant.Title.prescription} />
      <div className="flex flex-col justify-center items-center">
        <div className=" flex-col bg-opacity-100 mt-6 w-[85%] min-h-screen ">
          {/* 처방전 데이터                    */}
          <PrescSelect presc={prescriptionList} nameLimit={12} />
        </div>
      </div>
      <BottomNavigation active="2" />{" "}
      {/* 활성화(1: 홈, 2: 처방목록, 3: 건강 상태, 4: 내 정보) */}
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
