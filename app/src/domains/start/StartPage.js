import LoginBtn from "./components/buttons";


function StartPage( { isLoggingIn } ) {

    return(
        <div className={`flex flex-col min-h-screen relative  ${isLoggingIn ? 'blur-sm opacity-95' : ''}`}>
            <div className="text-right mt-20 mr-4">
                <div className="text-xs mr-4">
                    나만의 작은 건강비서
                </div>
                
                <div className="text-3xl text font-bold mt-1">
                    <div>필</div>
                    <div>팩</div>
                </div>

            </div>
            <div className="absolute bottom-0 w-full">
            <div className="relative w-full h-auto bottom-0">
                <img src="images/wave.png" alt="Background" className="absolute bottom-0 w-full h-auto z-0" />
                <img src="images/logo.png" alt="Logo" className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-1/4 z-10" />
                </div>
            </div>

            {!isLoggingIn && (
                <div className="absolute bottom-0 mb-10 w-full flex justify-center">
                    <LoginBtn />
                </div>
            )}
        </div>
    );

}

export default StartPage;