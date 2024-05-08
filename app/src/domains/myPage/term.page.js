import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import EtcPageHeader from "./compoents/etc.page.header";

export default function TermsPage() {
    
    return (
        <div className="relative">
            <EtcPageHeader title="서비스 이용 약관" />
            <div className="flex justify-center items-center">
                <div className="bg-opacity-100 w-[85%] min-h-screen">
                    <div className="mt-3">
                        대충 서비스 이용 약관에 대한 내용
                    </div>
                </div>
            </div>

            <BottomNavigation active="4" />
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
