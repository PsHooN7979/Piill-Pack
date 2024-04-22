// 컨테이너 테일윈드css로 디자인된 컴포넌트 정의
import React, { Children } from "react";

const ContainerTest = ({children}) => {
    return (
        <div className="container mx-auto p-4">
            <div className="p-6 rounded-lg shadow-lg bg-gray-100 min-h-screen">
                {children}
            </div>
        </div>
    );
}

export default ContainerTest;