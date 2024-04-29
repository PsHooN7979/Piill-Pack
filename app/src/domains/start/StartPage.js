import React, { useState } from "react";
import LoginBtn from "./components/buttons";
import LoginFormModal from "./components/LoginFormModal";

function StartPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className={`flex flex-col min-h-screen relative  ${
          isModalOpen ? "blur-sm opacity-95" : ""
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
              className="absolute bottom-0 w-full h-56 z-0"
            />
            <img
              src="images/logo.png"
              alt="Logo"
              className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-20 z-10"
            />
          </div>
        </div>

        {!isModalOpen && (
          <div className="absolute bottom-0 mb-10 w-full flex justify-center">
            <LoginBtn onLoginClick={openModal} />
          </div>
        )}
      </div>
      {/* 모달 컴포넌트를 조건부로 표시 */}
      {isModalOpen && (
        <LoginFormModal onLoginClick={openModal} onClose={closeModal} />
      )}
    </>
  );
}

export default StartPage;
