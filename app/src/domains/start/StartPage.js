import React, { useState } from "react";
import LoginBtn from "./components/buttons";
import LoginFormModal from "./components/LoginFormModal";
import JoinFormModal from "./components/JoinFormModal";

function StartPage() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

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

    const handleLogin = (email, password, isKeepLogin) => {
        // 로그인 핸들러
        console.log("아이디: " + email + ", 비밀번호: " + password + ", 로그인 상태 유지 여부: " + isKeepLogin);
    };

    const handleJoin = (email, password, isAgree) => {
        // 회원가입 핸들러
        console.log("아이디: " + email + ", 비밀번호: " + password + ", 이메일 수신 동의 여부: " + isAgree);
    };

  return (
    <>
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
              src="images/wave.png"
              alt="Background"
              className="absolute bottom-0 w-full h-60 z-0"
            />
            <img
              src="images/logo.png"
              alt="Logo"
              className="absolute bottom-28 left-1/2 transform -translate-x-1/2 w-20 z-10"
            />
          </div>
        </div>

        {!isLoginModalOpen && !isJoinModalOpen && (
          <div className="absolute bottom-0 mb-10 w-full flex justify-center">
            <LoginBtn onLoginClick={openLoginModal} />
          </div>
        )}
      </div>
      {/* 모달 컴포넌트를 조건부로 표시 */}
      {isLoginModalOpen && (
        <LoginFormModal onLogin={handleLogin} onClose={closeLoginModal} onJoinClick={openJoinModal} />
      )}
      {isJoinModalOpen && (
        <JoinFormModal onJoin={handleJoin} onClose={closeJoinModal} />
      )}
    </>
  );
}

export default StartPage;
