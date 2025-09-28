import React, { useState } from 'react';
import { ExclamationTriangleIcon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/outline';

const CrisisSupport: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-red-500 text-white py-2 px-4 text-center relative">
      <div className="flex items-center justify-center space-x-2 text-sm">
        <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0" />
        <span className="font-medium">Crisis Support Available 24/7:</span>
        <a 
          href="tel:9152987821" 
          className="flex items-center space-x-1 hover:underline font-semibold"
        >
          <PhoneIcon className="h-3 w-3" />
          <span>Call 9152987821</span>
        </a>
        <span>|</span>
        <button className="hover:underline font-semibold">
          Crisis Chat
        </button>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-red-600 rounded"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default CrisisSupport;