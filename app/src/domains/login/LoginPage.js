import React, { useState } from "react";
import StartPage from "../start/StartPage";
import LoginForm from "./components/LoginForm";


function LoginPage() {
    const [isLoggingIn, setLoggingIn] = useState(true);

    const handleLogin = (credentials) => {
        console.log("로그인");
        // 로그인 로직
    };

    return(
        <div>
            <StartPage isLoggingIn={isLoggingIn} />
            {isLoggingIn && <LoginForm onLogin={handleLogin} />}
        </div>
    );
}

export default LoginPage;