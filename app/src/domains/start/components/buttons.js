import { useNavigate } from 'react-router-dom';

function LoginBtn() {
    const navigate = useNavigate();

    const handler = () => {
        console.log("test");
        navigate('/login');
    };

    return(
        <div className='flex justify-center items-center'>
            <button onClick={handler} className="flex justify-center items-center px-5 py-1 bg-slate-50 rounded shadow-custom01 hover:bg-slate-300 transition-colors">
                <img src="images/logo.png" alt="Logo" className="h-5 w-3.5" />
                <div className=" text-xs font-bold text-black ml-2">필 팩 로그인</div>
            </button>
        </div>
    );
}

export default LoginBtn;