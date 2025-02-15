import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-100 py-4 border-b border-gray-300">
            <div className="container mx-auto">
                <h1 className="text-center text-xl font-bold text-gray-800">
                    Flowless
                </h1>
            </div>
        </header>
    );
};

export default Header;
