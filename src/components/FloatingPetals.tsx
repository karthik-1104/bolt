import React from 'react';

const FloatingPetals: React.FC = () => {
  return (
    <div className="floating-petals">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="petal" />
      ))}
    </div>
  );
};

export default FloatingPetals;