import React from 'react';
import { useNavigate } from 'react-router-dom';
import uis from "../../../constants/ui.constant";

function ProfileCard( {data, diseasesLimit} ) {

    const navigate = useNavigate();

    const handleEditProfile = () => {
        navigate('/profile/edit');
    };

    const diseasesString = data.diseaseList.map(disease => disease.name).join(", ");

    return(
        <div className="flex flex-col justify-center items-center border border-gray-400 rounded-lg shadow-custom01">
            <div className="rounded-full overflow-hidden w-20 h-20 bg-white border-2 border-gray-300 mt-3 mb-2">
                <img src={data.profile_image} alt="profile_image" className="w-full h-full object-cover" />
            </div>
            <div className="text-sm font-semibold">
                {data.nick} {data.gender === 'male' ? '♂️' : '♀️'}
            </div>
            <div className="text-xs mb-1">
                {data.tall}cm, {data.weight}kg
            </div>
            <div className="text-xs text-gray-500">
                지병목록: {diseasesString && diseasesString.length > diseasesLimit ? `${diseasesString.substring(0, diseasesLimit)}...` : diseasesString}
            </div>

            <div className="w-full pt-1 mt-1">
                <button 
                    className="relative flex justify-between items-center w-full py-2 bg-white rounded-b-lg hover:bg-mint01 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={handleEditProfile}
                >
                    <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-5/6 h-[0.1rem] rounded-lg bg-gray-300"></span>
                    <div className='flex items-center text-sm text-mint03 font-semibold pl-4'>
                        <img src={uis.edit} alt="next" className='h-4'/><span className='ml-1'>내 정보 수정</span>
                    </div>
                    <img src={uis.next} alt="next" className='h-3 pr-4'/>
                </button>
            </div>
        </div>
    );
}

export default ProfileCard;