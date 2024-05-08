import images from "../../../../constants/image.constant";

export default function AppBar() {
  return (
    <div className="flex items-center justify-between p-2 h-16">
      <div className="flex items-center text-lg">
        <img
          src={images.logo}
          alt="Logo"
          className="w-6 mx-2 drop-shadow-custom2"
        />
        <div className="ml-1">
          <div className="text-xs mb-[-0.2rem] mt-1">나만의 작은 건강 비서</div>
          <div className="text-sm font-semibold text-shadow-custom03 my-1">
            필팩
          </div>
        </div>
      </div>
    </div>
  );
}
