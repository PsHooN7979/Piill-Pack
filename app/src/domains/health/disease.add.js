import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import TagList from "../../common/components/tagList";
import DiseaseAddHeader from "./components/disease.add.header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { saveUserInfo } from "../firstLogin/repositories/user.repository";
import { addSnackBar } from "../../common/feature/slices/snackBar.slice";
import { setUserInfo } from "../../common/feature/slices/user.slice";

export default function DiseaseAddPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profileData } = location.state || {};
  const initialTags = profileData.diseaseList.map((disease) => disease.name);

  const dispatch = useDispatch();

  const { image, nickname, age, gender, height, weight } = useSelector(
    (state) => state.user
  );
  const token = useSelector((state) => state.auth.token);

  const [diseaseList, setDiseaseList] = useState(initialTags);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const handleInputsChange = (newInputs) => {
    setDiseaseList(newInputs);
  };

  const handleDone = async () => {
    console.log("질병 추가가 완료되었습니다.");
    console.log("질환 목록 -> " + diseaseList);

    const userInfo = {
      image: image,
      nick: nickname,
      age: Number(age),
      height: Number(height),
      weight: Number(weight),
      gender: gender,
      disease_list: diseaseList,
    };

    await saveUserInfo(userInfo, token)
      .then(() => {
        dispatch(
          addSnackBar({
            id: Date.now(),
            message: "질병 정보 수정이 완료되었습니다",
          })
        );
        // Redux store에 유저 정보 저장
        // dispatch(
        //   setUserInfo({
        //     age: userInfo.age,
        //     gender: userInfo.gender,
        //     weight: userInfo.weight,
        //     height: userInfo.height,
        //     nickname: userInfo.nickname,
        //   })
        // );
        // navigate("/home"); // 회원 정보 입력 완료 후 홈으로 이동
      })
      .catch((error) => {
        dispatch(
          addSnackBar({
            id: Date.now(),
            message: "회원 정보 저장 중 오류 발생",
          })
        );
      });

    const res = await axios.get("/patient/info", {
      headers: { Authorization: token },
    });

    dispatch(
      setUserInfo({
        image: res.data.patient.image,
        nickname: res.data.patient.nick,
        age: res.data.patient.age,
        height: res.data.patient.height,
        weight: res.data.patient.weight,
        gender: res.data.patient.gender,
        diseaseList: res.data.diseaseList,
        prescriptionList: res.data.prescriptionList,
      })
    );

    navigate(-1);
  };

  return (
    <div className="relative">
      <DiseaseAddHeader title="질병 추가" btnHandler={handleDone} />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[95%] min-h-screen">
          <div className="mt-5 px-6">
            <TagList
              onItemsChange={handleInputsChange}
              tagDatas={initialTags}
              placeholder="병명을 입력하세요"
            />
          </div>
        </div>
      </div>

      <BottomNavigation active="3" />
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
