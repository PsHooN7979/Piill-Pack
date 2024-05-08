import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";
import EtcPageHeader from "./compoents/etc.page.header";

export default function PrivacyPage() {
    
    return (
        <div className="relative">
            <EtcPageHeader title="개인정보 처리 방침" />
            <div className="flex justify-center items-center">
                <div className="bg-opacity-100 w-[85%] min-h-screen">
                    <div className="mt-3">
                        대충 개인정보 처리 방침에 대한 내용
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
