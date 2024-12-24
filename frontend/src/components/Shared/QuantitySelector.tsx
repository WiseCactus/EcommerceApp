import React from 'react';

interface QuantitySelectorProps {
  value: number;
  max: number;
  onChange: (newValue: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, max, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = parseInt(e.target.value, 10);
    onChange(newValue);
  };

  return (
    <select value={value} onChange={handleChange}>
      {[...Array(max + 1).keys()].map((quantity) => (
        <option key={quantity} value={quantity}>
          {quantity}
        </option>
      ))}
    </select>
  );
};

export default QuantitySelector;
