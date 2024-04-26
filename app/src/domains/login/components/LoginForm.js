import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1);
    }

    const handleLoginClick = () => {
        onLogin({ email: 'email', password: 'pass' });
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
            <div className="bg-white pt-1 rounded-xl shadow-custom01 w-52 h-60">
                {/* 닫기 버튼 */}
                <div className="flex justify-end mb-1">
                    <button onClick={handleClose} className="p-1">
                        <img src="images/ico/close.png" alt="Close" className="h-3 w-3" />
                    </button>
                </div>
                {/* 폼 제목 */}
                <div className=" text-base font-bold text-center mb-3">로그인</div>
                {/* 입력 필드 */}
                <div className="space-y-4 mb-3 px-6">
                    <input
                        type="text"
                        placeholder="이메일 형식의 아이디"
                        className="w-full px-3 py-1.5 text-xxs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
                    />
                    <input
                        type="password"
                        placeholder="비밀번호(나중에 MUI적용하면 바꿀예정)"
                        className="w-full px-3 py-1.5 text-xxs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
                    />
                </div>
                {/* 로그인 상태 유지 */}
                <div className="flex items-center mb-5 justify-start ml-6">
                    <input type="checkbox" id="keepLoggedIn" className="mr-2" />
                    <label htmlFor="keepLoggedIn" className="text-xxs">로그인 상태 유지</label>
                </div>
                {/* 로그인 버튼 */}
                <button
                    onClick={handleLoginClick}
                    className="w-32 px-4 py-1 text-xs bg-mint02 text-white rounded-lg hover:bg-mint03 transition-colors mx-auto block"
                >
                    로그인
                </button>
                <div className="text-center text-xxs text-gray-600 mt-2">
                    회원정보가 없나요? <span className=" text-warn02 cursor-pointer no-underline hover:underline">회원가입</span>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
  