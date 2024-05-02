import { useState } from "react";
import uis from "../../../constants/ui.constant";

export default function SignupModal({ onJoin, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAgree, setIsAgree] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsAgree(event.target.value);
  };

  const handleClose = () => {
    onClose();
  };

  const handleJoinClick = () => {
    // 수신 동의 확인
    if (isAgree === "on") {
      // 비밀번호 확인
      if (password === confirmPassword) {
        onJoin(email, password, isAgree);
        onClose();
      } else {
        console.log("비밀번호를 확인해주세요");
      }
    } else {
      console.log("이메일 수신 동의에 체크해 주세요");
    }
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
          회원가입
        </div>
        {/* 입력 필드 */}
        <div className="mb-3 px-6">
          <input
            type="text"
            placeholder="이메일 형식의 아이디"
            onChange={handleEmailChange}
            className="w-full px-3 py-2 mb-1 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
          />
          {/* 이메일 수신 동의 */}
          <div className="flex items-center justify-start mb-3">
            <input
              type="checkbox"
              id="agree"
              className="mr-2"
              onChange={handleCheckboxChange}
            />
            <label htmlFor="agree" className="text-xs">
              이메일 수신 동의
            </label>
          </div>
          <input
            type="password"
            placeholder="비밀번호"
            onChange={handlePasswordChange}
            className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            onChange={handleConfirmPasswordChange}
            className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
          />
        </div>
        {/* 회원가입 버튼 */}
        <button
          onClick={handleJoinClick}
          className="px-20 py-1 text-s bg-mint02 text-white rounded-lg hover:bg-mint03 transition-colors mx-auto block"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
