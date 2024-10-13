import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Text } from '@react-three/drei';
import { Element } from '../types';

interface AtomVisualizationProps {
  element: Element;
}

const getElementColor = (category: string): string => {
  const colorMap: { [key: string]: string } = {
    'Alkali Metal': '#ff6b6b',
    'Alkaline Earth Metal': '#feca57',
    'Transition Metal': '#48dbfb',
    'Post-Transition Metal': '#ff9ff3',
    'Metalloid': '#54a0ff',
    'Nonmetal': '#5f27cd',
    'Halogen': '#ff6b6b',
    'Noble Gas': '#ff9ff3',
    'Lanthanide': '#ff6b6b',
    'Actinide': '#ff9ff3',
  };
  return colorMap[category] || '#c8d6e5';
};

const AtomModel: React.FC<{ element: Element }> = ({ element }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01;
    }
  });

  const electronShells = element.electronConfiguration.split(' ').map(Number);
  const elementColor = getElementColor(element.category);

  return (
    <group ref={groupRef}>
      {/* Nucleus */}
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color={elementColor} />
      </Sphere>
      <Text position={[0, 0.7, 0]} fontSize={0.2} color="white">
        {element.symbol}
      </Text>

      {/* Electron shells */}
      {electronShells.map((electrons, index) => {
        const radius = (index + 1) * 0.8;
        return (
          <group key={index}>
            <Sphere args={[radius, 32, 32]}>
              <meshBasicMaterial color={elementColor} wireframe />
            </Sphere>
            {Array.from({ length: electrons }).map((_, electronIndex) => {
              const angle = (electronIndex / electrons) * Math.PI * 2;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              return (
                <Sphere key={electronIndex} args={[0.05, 16, 16]} position={[x, y, 0]}>
                  <meshStandardMaterial color="white" />
                </Sphere>
              );
            })}
          </group>
        );
      })}
    </group>
  );
};

const AtomVisualization: React.FC<AtomVisualizationProps> = ({ element }) => {
  return (
    <div className="w-full h-64 md:h-96 bg-gray-800 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <AtomModel element={element} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default AtomVisualization;