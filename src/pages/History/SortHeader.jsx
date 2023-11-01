import PropTypes from "prop-types";

function SortHeader({ label, sortType, sortDirection, onClick }) {
  let caretUpIcon, caretDownIcon;

  if (sortDirection === "false") {
    caretUpIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="currentColor"
        className="bi bi-caret-up-fill"
        viewBox="0 0 16 16"
      >
        <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
      </svg>
    );

    caretDownIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="currentColor"
        className="bi bi-caret-down"
        viewBox="0 0 16 16"
      >
        <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
      </svg>
    );
  } else if (sortDirection === "true") {
    caretUpIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="currentColor"
        className="bi bi-caret-up"
        viewBox="0 0 16 16"
      >
        <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
      </svg>
    );

    caretDownIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="currentColor"
        className="bi bi-caret-down-fill"
        viewBox="0 0 16 16"
      >
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
      </svg>
    );
  } else {
    caretUpIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="currentColor"
        className="bi bi-caret-up"
        viewBox="0 0 16 16"
      >
        <path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z" />
      </svg>
    );

    caretDownIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        fill="currentColor"
        className="bi bi-caret-down"
        viewBox="0 0 16 16"
      >
        <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
      </svg>
    );
  }

  return (
    <td
      className="flex cursor-pointer items-center py-4 text-sm font-semibold text-gray-800 hover:text-[#e81e48]"
      onClick={onClick(sortType)}
    >
      <div className="mr-1 flex flex-col">
        <div className="-mb-[2px]">{caretUpIcon}</div>
        <div className="-mt-[2px]">{caretDownIcon}</div>
      </div>
      <div>{label}</div>
    </td>
  );
}

SortHeader.propTypes = {
  label: PropTypes.string,
  sortType: PropTypes.string,
  sortDirection: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SortHeader;
