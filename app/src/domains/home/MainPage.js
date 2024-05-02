import BottomNavigation from "../../common/components/BottomNavigation";
import LogoHeader from "./components/LogoHeader";

function MainPage() {
  return (
    <div className="relative">
        <LogoHeader />
        <div className="flex justify-center items-center">
            <div className="bg-opacity-100 mt-6 w-80 min-h-screen">
                테스트
            </div>
        </div>

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
