import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { getElementByAtomicNumber, getElementBySymbol, getElementByName } from '../utils/elementData';
import { Element } from '../types';

interface ElementInputProps {
  onElementChange: (element: Element | null) => void;
}

const ElementInput: React.FC<ElementInputProps> = ({ onElementChange }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    let element: Element | null = null;

    // Try to parse as atomic number
    const atomicNumber = parseInt(input);
    if (!isNaN(atomicNumber)) {
      if (atomicNumber > 118) {
        setError('Atomic number cannot exceed 118');
        return;
      }
      element = getElementByAtomicNumber(atomicNumber);
    } else {
      // If not a number, try as symbol or name
      element = getElementBySymbol(input) || getElementByName(input);
    }

    if (element) {
      onElementChange(element);
    } else {
      setError('Element not found. Please enter a valid atomic number, symbol, or name.');
    }
    setInput('');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex items-center mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter atomic number, symbol, or name"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Search size={20} />
        </button>
      </form>
      {error && (
        <p className={`text-sm ${error.includes('118') ? 'text-red-500' : 'text-yellow-600'}`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default ElementInput;