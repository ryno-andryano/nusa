import PropTypes from "prop-types";

function SortHeader({ label, sortType, sortDirection, onClick }) {
  return (
    <td
      className="flex cursor-pointer py-4 text-sm font-semibold text-gray-800 hover:text-[#e81e48]"
      onClick={onClick(sortType)}
    >
      {sortDirection === "asc" ? (
        // Up Arrow
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
          />
        </svg>
      ) : (
        // Down Arrow
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
          />
        </svg>
      )}
      {label}
    </td>
  );
}

SortHeader.propTypes = {
  label: PropTypes.string,
  sortType: PropTypes.string,
  sortDirection: PropTypes.object.isRequired,
  onClick: PropTypes.object.isRequired,
};

export default SortHeader;
