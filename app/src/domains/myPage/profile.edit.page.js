import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveUserInfo } from "../firstLogin/repositories/user.repository";
import { setUserInfo } from "../../common/feature/slices/user.slice";
import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import ProfileEditPageHeader from "./compoents/profile.edit.page.header";
import GenderButton from "../../common/components/gender.button";
import TagList from "../../common/components/tagList";
import { addSnackBar } from "../../common/feature/slices/snackBar.slice";
import axios from "axios";

export default function ProfileEditPage() {
  const imageUrl =
    "https://i.pinimg.com/564x/d6/4e/97/d64e9765deca662e8fa07d2cfdb67f7c.jpg";

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profileData } = location.state || {}; // 프로필 카드에서 navigate할때 state 옵션으로 전달한 데이터를 가져옴
  const initialTags = profileData.diseaseList.map((disease) => disease.name); // 받은 리스트 객체 데이터의 name을 가져와 리스트 형식으로 매핑

  const token = useSelector((state) => state.auth.token);

  const [nick, setNick] = useState(profileData.nick);
  const [age, setAge] = useState(profileData.age);
  const [tall, setTall] = useState(profileData.tall);
  const [weight, setWeight] = useState(profileData.weight);
  const [selectedGender, setSelectedGender] = useState(
    profileData.gender == "male"
  );
  const [diseaseList, setDiseaseList] = useState(initialTags);

  const handleNickChange = (event) => {
    setNick(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleTallChange = (event) => {
    setTall(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleGenderSelect = (gender) => {
    console.log("선택된 성별: ", gender);
    setSelectedGender(gender);
  };

  const handleInputsChange = (newInputs) => {
    setDiseaseList(newInputs);
  };

  const handleEditImage = () => {
    // 이미지 변경 로직
  };

  const handleDone = async () => {
    // 모든 필드가 비어있지 않고, tall과 weight가 숫자인지 검사
    if (
      !nick ||
      !selectedGender == null ||
      !age ||
      !tall ||
      !weight ||
      isNaN(Number(age)) ||
      isNaN(Number(tall)) ||
      isNaN(Number(weight))
    ) {
      dispatch(
        addSnackBar({
          id: Date.now(),
          message: "정보 입력 후 회원가입을 진행해 주세요",
        })
      );
      return;
    }

    const userInfo = {
      image: imageUrl,
      nick: nick,
      age: Number(age),
      height: Number(tall),
      weight: Number(weight),
      gender: selectedGender,
      disease_list: diseaseList,
    };

    await saveUserInfo(userInfo, token)
      .then(() => {
        dispatch(
          addSnackBar({
            id: Date.now(),
            message: "회원 정보 수정이 완료되었습니다",
          })
        );

        // dispatch(
        //   setUserInfo({
        //     age: userInfo.age,
        //     gender: userInfo.gender,
        //     weight: userInfo.weight,
        //     height: userInfo.height,
        //     nickname: userInfo.nickname,
        //   })
        // );
        // navigate(-1); // 뒤로 가기
      })
      .catch((error) => {
        dispatch(
          addSnackBar({
            id: Date.now(),
            message: "회원 정보 저장 중 오류 발생",
          })
        );
        console.error("회원 정보 저장 중 오류 발생:", error);
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
      <ProfileEditPageHeader title="내 정보 수정" btnHandler={handleDone} />
      <div className="flex justify-center items-center">
        <div className="bg-opacity-100 w-[95%] min-h-screen">
          <div className="flex justify-start items-center ml-5 mt-6 mb-2">
            <div className="rounded-full overflow-hidden w-12 h-12 bg-white border-2 border-gray-300 mr-3">
              <img
                src={profileData.profile_image}
                alt="profile_image"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={handleEditImage}
              className="font-bold text-white rounded-xl bg-mint03 px-4 py-[0.4rem] hover:bg-mint03"
            >
              프로필 이미지 변경
            </button>
          </div>

          <div className="mb-3 px-6">
            <div className="text-sm mb-1 ml-1">별명</div>
            <input
              type="text"
              placeholder="별명을 입력하세요"
              value={nick}
              onChange={handleNickChange}
              className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <div className="text-sm mb-1 ml-1">나이</div>
            <input
              type="number"
              placeholder="나이를 입력하세요"
              value={age}
              onChange={handleAgeChange}
              className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <div className="text-sm mb-1 ml-1">키</div>
            <input
              type="number"
              placeholder="키를 입력하세요(cm)"
              value={tall}
              onChange={handleTallChange}
              className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <div className="text-sm mb-1 ml-1">몸무게</div>
            <input
              type="number"
              placeholder="몸무게를 입력하세요(kg)"
              value={weight}
              onChange={handleWeightChange}
              className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <div className="text-sm mb-1 ml-1">성별</div>
            <GenderButton
              onGenderSelect={handleGenderSelect}
              selectedGender={selectedGender}
            />
            <div className="text-sm mt-3 mb-1 ml-1">질병 입력</div>
            <TagList
              onItemsChange={handleInputsChange}
              tagDatas={initialTags}
              placeholder="병명을 입력하세요"
            />
          </div>
        </div>
      </div>

      <BottomNavigation active="4" />
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
