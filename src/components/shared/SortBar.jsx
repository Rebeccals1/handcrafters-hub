import React from "react";

export default function SortBar({
  sortBy,
  onSortChange,
  selectedCategory,
  onCategoryChange,
  categories,
}) {
  return (
    <div className="sort-bar-wrapper">
      
      <div className="sort-by-content">
        <label className="mr-2 font-medium">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Upvoted</option>
        </select>
      </div>

      <div className="sort-category-content">
        <label className="mr-2 font-medium">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

