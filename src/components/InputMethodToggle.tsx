import React from 'react';
import { Grid, Hash } from 'lucide-react';

interface InputMethodToggleProps {
  method: 'visual' | 'numeric';
  onMethodChange: (method: 'visual' | 'numeric') => void;
  disabled?: boolean;
}

export const InputMethodToggle: React.FC<InputMethodToggleProps> = ({
  method,
  onMethodChange,
  disabled = false
}) => {
  return (
    <div className="flex items-center justify-center mb-6">
      <div className="bg-gray-100 p-1 rounded-lg flex">
        <button
          onClick={() => onMethodChange('visual')}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex items-center space-x-2
            ${method === 'visual' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <Grid className="w-4 h-4" />
          <span>Seleção Visual</span>
        </button>
        
        <button
          onClick={() => onMethodChange('numeric')}
          disabled={disabled}
          className={`
            px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex items-center space-x-2
            ${method === 'numeric' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-gray-600 hover:text-gray-800'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <Hash className="w-4 h-4" />
          <span>Entrada Numérica</span>
        </button>
      </div>
    </div>
  );
};