import React, { useState } from 'react';

function Categories() {
    const categories = ["All Categories", "Electronics", "Clothing", "Books"];
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (index) => {
        if (activeButton === index) {

        setActiveButton(null);
        } else { setActiveButton(index); }

        
    };

    return (
        <nav className="w-full flex flex-row bg-white py-[10px] px-[30px] justify-between mt-2">
            <div className="text-[18px]">
                <select>
                    {categories.map((category, index) => (
                        <option key={index} value={category.toLowerCase()}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="w-1/4 flex flex-row justify-between text-[18px]">
                <button
                    className={`hover:text-main__pink ${activeButton === 0 ? "text-main__pink" : ""}`}
                    onClick={() => handleButtonClick(0)}
                >
                    Latest
                </button>
                <button
                    className={`hover:text-main__pink ${activeButton === 1 ? "text-main__pink" : ""}`}
                    onClick={() => handleButtonClick(1)}
                >
                    Popular
                </button>
                <button
                    className={`hover:text-main__pink ${activeButton === 2 ? "text-main__pink" : ""}`}
                    onClick={() => handleButtonClick(2)}
                >
                    BestSeller
                </button>
                <button
                    className={`hover:text-main__pink ${activeButton === 3 ? "text-main__pink" : ""}`}
                    onClick={() => handleButtonClick(3)}
                >
                    Sales
                </button>
            </div>
        </nav>
    );
}

export default Categories;
