import React, { useState } from "react";

function LoginFormModal({ onLogin, onClose, onJoinClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isKeepLogin, setIsKeepLogin] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsKeepLogin(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  const handleLoginClick = () => {
    onLogin(email, password, isKeepLogin);
    onClose(); // 로그인 후 모달 닫기
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
            <img
              src="/web/images/ico/close.png"
              alt="Close"
              className="h-4 w-4"
            />
          </button>
        </div>
        {/* 폼 제목 */}
        <div className="text-2xl font-bold text-center text-shadow-custom01 mb-5">
          로그인
        </div>
        {/* 입력 필드 */}
        <div className="space-y-4 mb-4 px-6">
          <input
            type="text"
            placeholder="이메일 형식의 아이디"
            onChange={handleEmailChange}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
          />
          <input
            type="password"
            placeholder="비밀번호"
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
          />
        </div>
        {/* 로그인 상태 유지 */}
        <div className="flex items-center mb-8 justify-start ml-6">
          <input
            type="checkbox"
            id="keepLoggedIn"
            className="mr-2"
            onChange={handleCheckboxChange}
          />
          <label htmlFor="keepLoggedIn" className="text-xs">
            로그인 상태 유지
          </label>
        </div>
        {/* 로그인 버튼 */}
        <button
          onClick={handleLoginClick}
          className="px-20 py-1 text-s bg-mint02 text-white rounded-lg hover:bg-mint03 transition-colors mx-auto block"
        >
          로그인
        </button>
        <div className="text-center text-xs text-gray-600 mt-2">
          회원정보가 없나요?{" "}
          <span
            className=" text-warn02 cursor-pointer no-underline hover:underline"
            onClick={onJoinClick}
          >
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginFormModal;
