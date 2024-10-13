import React from 'react';
import { Element } from '../types';

interface ElementDetailsProps {
  element: Element;
}

const ElementDetails: React.FC<ElementDetailsProps> = ({ element }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{element.name} ({element.symbol})</h2>
      <ul className="space-y-2">
        <li><strong>Atomic Number:</strong> {element.atomicNumber}</li>
        <li><strong>Atomic Mass:</strong> {element.atomicMass}</li>
        <li><strong>Category:</strong> {element.category}</li>
        <li><strong>Electronic Configuration:</strong> {element.electronicConfiguration}</li>
        <li><strong>Valence Electrons:</strong> {element.valenceElectrons}</li>
        <li><strong>Oxidation States:</strong> {element.oxidationStates.join(', ')}</li>
        <li><strong>Group:</strong> {element.group}</li>
        <li><strong>Period:</strong> {element.period}</li>
      </ul>
    </div>
  );
};

export default ElementDetails;