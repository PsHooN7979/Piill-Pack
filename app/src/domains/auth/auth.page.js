import React, { useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import images from "../../constants/image.constant";

import AuthButton from "./components/auth.button";
import LoginModal from "./components/login.modal";
import SignupModal from "./components/signup.modal";
import Snackbar from "../../common/components/snack.bar";
import { createUser, tryLogin } from "./repositories/auth.service";
import { setIsAuth } from "../../common/feature/slices/auth.slice";

export default function Auth() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const [snackbars, setSnackbars] = useState([]);
  const [num, setNum] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log("현재 인증 상태: ", isAuth);

  React.useEffect(() => {
    M.onBack(function (e) {
      return navigate.goHome();
    });
  }, []);

  const handleSnackbarClose = useCallback(
    (id) => {
      setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
    },
    []
  );

  const showSnackbarWithMessage = (message) => {
    const id = new Date().getTime(); // 유니크 ID 생성
    setSnackbars((prev) => [...prev, { id, message }]);
  };

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
    console.log(
      "아이디: " +
        email +
        ", 비밀번호: " +
        password +
        ", 로그인 상태 유지 여부: " +
        isKeepLogin
    );
    try {
      console.log("로그인 전 인증 상태: ", isAuth);
      await tryLogin(email, password);
      dispatch(setIsAuth(true)); // 로그인 성공 시 인증 상태를 true로 설정
      navigate("/first");
    } catch (error) {
        console.error('로그인 중 에러 발생', error);
    }
  };

  const handleJoin = async (email, password, isAgree) => {
    // 회원가입 핸들러
    console.log(
      "아이디: " +
        email +
        ", 비밀번호: " +
        password +
        ", 이메일 수신 동의 여부: " +
        isAgree
    );
    try {
        await createUser(email, password);
        showSnackbarWithMessage("회원가입이 완료되었습니다.");
        openLoginModal();
    } catch (error) {
        console.error('회원가입 중 에러 발생', error);
        showSnackbarWithMessage("회원가입 실패");
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

            <button onClick={() => {
              showSnackbarWithMessage(num);
              setNum(num+1);
            }}>테스트</button>
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
      {/* 스낵바 표시 */}
      {snackbars.map((snackbar) => (
        <Snackbar
          key={snackbar.id}
          id={snackbar.id}
          message={snackbar.message}
          onClose={handleSnackbarClose}
        />
      ))}
    </div>
  );
}
