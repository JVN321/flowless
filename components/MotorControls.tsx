import { Button } from '@heroui/button';
import React, { useState } from 'react';

const MotorControls = () => {
    const [isRunning, setIsRunning] = useState(false);

    return (
        <div className="flex flex-col items-center  p-4 rounded-lg shadow-md max-w-xs">
            <div className="mb-4 text-lg font-semibold">
                Motor Status: <span className={isRunning ? "text-green-600" : "text-red-600"}>
                    {isRunning ? "Running" : "Off"}
                </span>
            </div>
            
            <div className="flex gap-4">
                <Button
                    onPress={() => setIsRunning(true)}
                    className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white shadow-md transition-colors"
                    aria-label="Start motor"
                >
                    START
                </Button>
                
                <Button
                    onPress={() => setIsRunning(false)}
                    className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white shadow-md transition-colors"
                    aria-label="Stop motor"
                >
                    STOP
                </Button>
            </div>
        </div>
    );
};

export default MotorControls;