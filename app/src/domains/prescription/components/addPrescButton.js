

export default function addPrescList() {


    const addPresc = () => {
        console.log("처방 목록 추가 모달창 출력");

    }

    return (
        <div className="flex border border-slate-300 rounded-xl overflow-hidden">
            <button 
            onClick={addPresc}
            className="bg-mint03 px-3   text-white font-bold hover:bg-mint02"  > 처방 목록 직접 추가 </button>
        </div>
    )
    
}