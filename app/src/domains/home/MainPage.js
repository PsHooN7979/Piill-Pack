import BottomNavigation from "../../common/components/BottomNavigation";
import images from "../../constants/image.constant";

function MainPage() {
  return (
    <div className="relative">
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

export default MainPage;
