import React, { useState } from 'react';
import { Atom, Zap } from 'lucide-react';
import ElementInput from './components/ElementInput';
import ElementDetails from './components/ElementDetails';
import AtomVisualization from './components/AtomVisualization';
import { Element } from './types';

function App() {
  const [element, setElement] = useState<Element | null>(null);

  const handleElementChange = (newElement: Element | null) => {
    setElement(newElement);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 flex items-center justify-center mb-2">
          <Atom className="mr-2" size={36} />
          Atomic Structure Explorer
          <Zap className="ml-2" size={36} />
        </h1>
        <p className="text-xl text-gray-600">Explore, visualize, and understand atomic structures</p>
      </header>
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <ElementInput onElementChange={handleElementChange} />
        {element && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <ElementDetails element={element} />
            <AtomVisualization element={element} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;