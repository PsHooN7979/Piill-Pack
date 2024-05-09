import React from 'react';
import Slider from 'react-slick';
import images from "../../../constants/image.constant";
import uis from "../../../constants/ui.constant";
import "./ad.slider.css"

const AdSlider = ({ products, nameLimit, descLimit }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear",
        centerMode: true,
        autoplay: true,  // 자동 넘김 활성화
        autoplaySpeed: 5000,
        pauseOnHover: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    return (
        <div className="slider-container mt-6">
            <h2 className="text-center text-sm font-semibold mb-4">오늘은 이거다!</h2>
            <Slider {...settings}>
                {products.map((product, index) => (
                    <div key={index} className="p-4 text-center">
                        <div className="flex flex-col items-center">
                            <div className='rounded bg-white shadow-custom01 p-2 w-32'>
                                <img src={product.image || images.no_img} alt={product.name} className="h-28 mx-auto" />
                            </div>
                            <div className='bg-white border shadow-custom01 rounded-lg px-4 py-1 mt-2'>
                                <div className="text-base text-mint03 font-semibold mt-1">
                                    {product.name && product.name.length > nameLimit ? `${product.name.substring(0, nameLimit)}...` : product.name}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    {product.desc && product.desc.length > descLimit ? `${product.desc.substring(0, descLimit)}...` : product.desc}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

const NextArrow = ({ onClick }) => {
    return (
        <div 
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer flex items-center justify-center h-4 py-1"
            onClick={onClick}
        >
            <img src={uis.next} alt="next" className='h-4 px-4'/>
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div 
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer flex items-center justify-center"
            onClick={onClick}
        >
            <img src={uis.prev} alt="next" className='h-4 pl-4'/>
        </div>
    );
};

export default AdSlider;
