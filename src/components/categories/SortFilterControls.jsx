
export default function SortFilterControls({
  sortBy,
  setSortBy,
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
}) {
  return (
    <div className="sort-controls">
      <span>Order by:</span>
      <button
        className={sortBy === "newest" ? "active" : ""}
        onClick={() => setSortBy("newest")}
      >
        Newest
      </button>
      <button
        className={sortBy === "popular" ? "active" : ""}
        onClick={() => setSortBy("popular")}
      >
        Most Popular
      </button>

      <span style={{ marginLeft: "1rem" }}>Filter by Category:</span>
      <select
        value={selectedCategoryId || ""}
        onChange={(e) =>
          setSelectedCategoryId(e.target.value ? Number(e.target.value) : null)
        }
      >
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
    </div>
  );
}
