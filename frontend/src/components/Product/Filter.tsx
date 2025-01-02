import React from "react";
import {Filter} from '../../Types/Filter';

interface FilterProps {
    filter:Filter,
    handleCategoryChange:(e: React.ChangeEvent<HTMLSelectElement>) => void,
    handleSearchChange:(e: React.ChangeEvent<HTMLInputElement>) => void,
    sortType:'name' | 'price',
    handleSortChange:(e: React.ChangeEvent<HTMLSelectElement>) => void
}


export const FilterComponent: React.FC<FilterProps> = ({ filter,handleCategoryChange,handleSearchChange,sortType,handleSortChange}) => {

return (
    <div className="filters">
    <select value={filter.category} onChange={handleCategoryChange}>
      <option value="">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Furniture">Furniture</option>
      <option value="Outdoor">Outdoor</option>
    </select>
    <input
      type="text"
      placeholder="Search by name"
      value={filter.name}
      onChange={handleSearchChange}
    />
    <select value={sortType} onChange={handleSortChange}>
      <option value="name">Sort by Name</option>
      <option value="price">Sort by Price</option>
    </select>
  </div>
)

}