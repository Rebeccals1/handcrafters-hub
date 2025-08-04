// src/components/shared/SearchBar.jsx
export default function SearchBar({ searchQuery, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search posts by title..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="p-2 border rounded w-full"
      />
    </div>
  );
}
