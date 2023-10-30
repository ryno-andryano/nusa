import PropTypes from "prop-types";

function CategoryFilter({ categories, filters, onClick }) {
  return (
    <div className="flex gap-2 overflow-x-auto">
      <button
        className={`whitespace-nowrap rounded-lg border-2 border-[#FF2351] px-4 py-2 text-sm transition-colors ${
          filters.length === 0
            ? "bg-[#FF2351] text-white hover:bg-[#e81e48]"
            : "bg-white text-inherit hover:bg-gray-100"
        }`}
        onClick={onClick}
        name="all"
      >
        All Category
      </button>

      {categories.map((category) => (
        <button
          className={`whitespace-nowrap rounded-lg border-2 border-[#FF2351] px-4 py-2 text-sm transition-colors ${
            filters.includes(category)
              ? "bg-[#FF2351] text-white hover:bg-[#e81e48]"
              : "bg-white text-inherit hover:bg-gray-100"
          }`}
          key={category}
          onClick={onClick}
          name={category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.array,
  filters: PropTypes.array,
  onClick: PropTypes.func.isRequired,
};

export default CategoryFilter;
