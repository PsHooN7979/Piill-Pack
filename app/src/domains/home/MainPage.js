import BottomNavigation from "../../common/components/BottomNavigation";

function MainPage() {

    return(
        <div className="relative">

            <BottomNavigation active="1" />
            {/* 배경 */}
            <div className="absolute bottom-0 w-full">
                <div className="relative w-full h-auto bottom-0">
                <img
                    src="/web/images/wave.png"
                    alt="Background"
                    className="fixed bottom-0 w-full h-60 z-[-1]"
                />
                </div>
            </div>
        </div>
    );
}

export default MainPage;