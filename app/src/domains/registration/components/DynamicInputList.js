import React, { useState } from 'react';

function DynamicInputList({ onItemsChange, placeholder }) {
    const [items, setItems] = useState([{ id: 0, value: '' }]);
    const [lastId, setLastId] = useState(0);

    // 항목 추가
    const addItem = () => {
        const newId = lastId + 1;
        setItems([...items, { id: newId, value: '' }]);
        setLastId(newId);
    };

    // 항목 삭제
    const removeItem = (id) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
        onItemsChange(updatedItems.map(item => item.value));
    };

    // 항목 값 변경
    const handleChange = (id, value) => {
        const updatedItems = items.map(item =>
        item.id === id ? { ...item, value } : item
        );
        setItems(updatedItems);
        onItemsChange(updatedItems.map(item => item.value));
    };

    return (
        <div>
        {items.map(item => (
            <div key={item.id} className="flex items-center mb-2">
            <input
                type="text"
                placeholder={placeholder}
                value={item.value}
                onChange={e => handleChange(item.id, e.target.value)}
                className="flex-1 w-full px-3 py-2 text-xs border border-gray-300 rounded-l-lg focus:outline-none focus:border-blue-500 mx-auto"
            />
            <button
                onClick={() => removeItem(item.id)}
                className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 text-xs border border-red-500 rounded-r-lg transition-colors duration-200 ease-in-out"
            >
                X
            </button>
            </div>
        ))}
        <button
            onClick={addItem}
            className="mt-1 bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-2 rounded-lg shadow-lg hover:shadow-xl transition ease-in-out duration-300"
        >
        <svg className="w-4 h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 4v16m8-8H4" />
        </svg>
        </button>
        </div>
    );
}

export default DynamicInputList;
