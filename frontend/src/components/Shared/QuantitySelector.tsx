import React from 'react';

interface QuantitySelectorProps {
  value: number;
  max: number;
  onChange: (newValue: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, max, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <select value={value} onChange={handleChange}>
      {Array.from({ length: max + 1 }, (_, i) => (
        <option key={i} value={i}>
          {i}
        </option>
      ))}
    </select>
  );
};

export default QuantitySelector;
