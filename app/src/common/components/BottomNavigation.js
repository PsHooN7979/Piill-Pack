import React from 'react';
import { useNavigate } from 'react-router-dom';

// 바텀 네비게이션 사용방법 <BottomNavigation active="숫자(1,2,3,4)" />
function BottomNavigation({ active }) {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-md flex justify-around items-center py-2">
      <button className={`flex flex-col items-center ${active === '1' ?  'text-gray-900' : 'text-gray-400'}`} onClick={() => navigate('/home')}>
        <img src={active === '1' ? "/web/images/ico/home_active.png" : "/web/images/ico/home.png"} alt="Home" className='w-5 h-5' />
        <div className="text-xs">홈</div>
      </button>
      <button className={`flex flex-col items-center ${active === '2' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => navigate('/presc')}>
        <img src={active === '2' ? "/web/images/ico/invoice_active.png" : "/web/images/ico/invoice.png"} alt="PrescriptionList" className='w-5 h-5' />
        <div className="text-xs">처방 목록</div>
      </button>
      <button className={`flex flex-col items-center ${active === '3' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => navigate('/health')}>
        <img src={active === '3' ? "/web/images/ico/heart_active.png" : "/web/images/ico/heart.png"} alt="Health" className='w-5 h-5' />
        <div className="text-xs">건강 상태</div>
      </button>
      <button className={`flex flex-col items-center ${active === '4' ? 'text-gray-900' : 'text-gray-400'}`} onClick={() => navigate('/profile')}>
        <img src={active === '4' ? "/web/images/ico/person_active.png" : "/web/images/ico/person.png"} alt="Profile" className='w-5 h-5' />
        <div className="text-xs">내 정보</div>
      </button>
    </div>
  );
}

export default BottomNavigation;