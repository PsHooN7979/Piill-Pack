import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import HealthPageHeader from "./components/health.page.header";

export default function HealthPage() {
    
    return (
        <div className="relative">
            <HealthPageHeader />
            <div className="flex justify-center items-center">
                <div className="bg-opacity-100 w-[85%] min-h-screen">

                </div>
            </div>

            <BottomNavigation active="3" />
            {/* 배경 */}
            <div className="absolute bottom-0 w-full">
                <div className="relative w-full h-auto bottom-0">
                <img
                    src={images.wave}
                    alt="Background"
                    className="fixed bottom-0 w-full h-60 z-[-1]"
                />
                </div>
            </div>
        </div>
    );
}
