
function UserInfoRegistrationPage() {

    return(
        <div className="flex justify-center items-center">
            <div className="bg-white pt-6 shadow-custom01 w-80 min-h-screen">
                {/* 입력 필드 */}
                <div className="mb-3 px-6">
                    <input
                        type="text"
                        placeholder="닉네임을 입력하세요"
                        onChange={null}
                        className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
                    />
                    <input
                        type="password"
                        placeholder="키를 입력하세요(cm)"
                        onChange={null}
                        className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
                    />
                    <input
                        type="password"
                        placeholder="몸무게를 입력하세요(kg)"
                        onChange={null}
                        className="w-full px-3 py-2 mb-3 text-xs border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mx-auto"
                    />
                </div>
                {/* 버튼 */}
                <div className="flex flex-row justify-between">
                    <button
                        onClick={null}
                        className="w-24 py-1 border-2 border-slate-500 text-s bg-white rounded-lg hover:bg-slate-300 transition-colors mx-auto block"
                    >
                        처음으로
                    </button>
                    <button
                        onClick={null}
                        className="w-24 py-1 border-2 border-slate-500 text-s bg-white rounded-lg hover:bg-slate-300 transition-colors mx-auto block"
                    >
                        완료
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserInfoRegistrationPage;