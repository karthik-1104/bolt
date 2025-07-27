import React from 'react';

interface SparkleEffectProps {
  className?: string;
}

const SparkleEffect: React.FC<SparkleEffectProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="sparkle" />
      ))}
    </div>
  );
};

export default SparkleEffect;