import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import images from "../../constants/image.constant";

import AuthButton from "./components/auth.button";
import LoginModal from "./components/login.modal";
import SignupModal from "./components/signup.modal";
import { addSnackBar } from "../../common/feature/slices/snackBar.slice";
import {
  createUser,
  fetchUserInfo,
  tryLogin,
} from "./repositories/auth.repository";
import { setIsAuth, clearAuth } from "../../common/feature/slices/auth.slice";
import { setUserInfo } from "../../common/feature/slices/user.slice";
import {
  fetchPrescriptions,
  setPrescriptions,
} from "../prescription/slices/presc.slice";
import { getPrescriptions } from "../prescription/repositories/presc.repository";
import axios from "axios";

export default function Auth() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  React.useEffect(() => {
    M.onBack(function (e) {
      return navigate.goHome();
    });
  }, []);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsJoinModalOpen(false); // 로그인 모달을 열 때 회원가입 모달 닫기
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openJoinModal = () => {
    setIsJoinModalOpen(true);
    setIsLoginModalOpen(false); // 회원가입 모달을 열 때 로그인 모달 닫기
  };
  const closeJoinModal = () => setIsJoinModalOpen(false);

  const handleLogin = async (email, password, isKeepLogin) => {
    // 로그인 핸들러

    try {
      const loginResponse = await tryLogin(email, password);

      // isFirst 값에 따라 네비게이트

      if (loginResponse.data === "First Login") {
        navigate("/first");
      } else {
        const token = loginResponse.headers["access-token"];
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
        navigate("/home");
      }
    } catch (error) {
      let errorMessage = "로그인 실패";
      if (error.response) {
        // 서버 응답이 있는 경우
        const status = error.response.status;
        switch (status) {
          case 400:
            errorMessage = "잘못된 요청입니다. 입력한 정보를 확인해주세요.";
            break;
          case 401:
            errorMessage = "아이디 또는 비밀번호가 올바르지 않습니다.";
            break;
          case 403:
            errorMessage = "허가되지 않은 접근입니다.";
            break;
          case 418:
            errorMessage = "나는 찻주전자 입니다.🫖";
            break;
          case 500:
            errorMessage =
              "서버 에러가 발생했습니다. 잠시 후 다시 시도해주세요.";
            break;
          default:
            errorMessage = `로그인 실패: ${
              error.response.data.message || "알 수 없는 오류가 발생했습니다."
            }`;
        }
      } else {
        // 서버 응답이 없는 경우
        errorMessage = "이메일이 인증되지 않았어요. 메일함을 확인해주세요!";
      }

      dispatch(addSnackBar({ id: Date.now(), message: errorMessage }));
    }
  };

  const handleJoin = async (email, password, isAgree) => {
    try {
      await createUser(email, password);
      dispatch(
        addSnackBar({ id: Date.now(), message: "회원가입이 완료되었습니다" })
      );
      openLoginModal();
    } catch (error) {
      let errorMessage = "회원가입 실패";
      if (error.response) {
        // 서버 응답이 있는 경우
        const status = error.response.status;
        switch (status) {
          case 400:
            errorMessage = "잘못된 요청입니다. 입력한 정보를 확인해주세요.";
            break;
          case 403:
            errorMessage = "허가되지 않은 접근입니다.";
            break;
          case 409:
            errorMessage = "이미 등록된 회원입니다.";
            break;
          case 418:
            errorMessage = "나는 찻주전자 입니다.🫖";
            break;
          case 500:
            errorMessage = "이미 가입된 회원정보입니다. 로그인해주세요.";
            break;
          default:
            errorMessage = `회원가입 실패: ${
              error.response.data.message || "알 수 없는 오류가 발생했습니다."
            }`;
        }
      } else {
        // 서버 응답이 없는 경우
        errorMessage =
          "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.";
      }

      dispatch(addSnackBar({ id: Date.now(), message: errorMessage }));
    }
  };

  return (
    <div>
      <div
        className={`flex flex-col min-h-screen relative  ${
          isLoginModalOpen || isJoinModalOpen ? "blur-sm opacity-95" : ""
        }`}
      >
        <div className="flex justify-center">
          <div className="flex flex-col text-right w-80 mt-20 mr-4">
            <div className=" text-sm mr-4">나만의 작은 건강비서</div>

            <div className="text-5xl text-shadow-custom01 font-bold mt-1">
              <div className="mb-2">필</div>
              <div>팩</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full">
          <div className="relative w-full h-auto bottom-0">
            <img
              src={images.wave}
              alt="Background"
              className="absolute bottom-0 w-full h-60 z-0"
            />
            {/* Public url resource route */}
            <img
              src={images.logo}
              alt="Logo"
              className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-20 z-10"
            />
          </div>
        </div>

        {!isLoginModalOpen && !isJoinModalOpen && (
          <div className="absolute bottom-0 mb-10 w-full flex justify-center">
            <AuthButton onLoginClick={openLoginModal} />
          </div>
        )}
      </div>
      {/* 모달 컴포넌트를 조건부로 표시 */}
      {isLoginModalOpen && (
        <LoginModal
          onLogin={handleLogin}
          onClose={closeLoginModal}
          onJoinClick={openJoinModal}
        />
      )}
      {isJoinModalOpen && (
        <SignupModal onJoin={handleJoin} onClose={closeJoinModal} />
      )}
    </div>
  );
}
