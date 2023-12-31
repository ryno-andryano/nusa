import PropTypes from "prop-types";
import { formatCurrency, formatDate } from "../../utility/format.js";

function RowMenu({ menu, onUpdate, onDelete }) {
  const { id, name, category, price, image, lastModified } = menu;

  const handleUpdate = () => onUpdate(menu);

  const handleDelete = () => onDelete(menu);

  return (
    <tr key={id}>
      <td className="flex items-center gap-x-4 py-4 text-sm text-gray-600">
        <img
          className="aspect-square w-14 rounded-lg object-cover"
          src={image}
          alt={name}
        />
        {name}
      </td>

      <td className="py-4 text-sm font-normal text-gray-600">{category}</td>

      <td className="py-4 text-sm text-gray-600">{formatCurrency(price)}</td>

      <td className="py-4 text-sm text-gray-600">{formatDate(lastModified)}</td>

      <td className="py-4 text-sm font-normal text-gray-500">
        {/* Update Button */}
        <button
          className="mr-1 rounded-md bg-[#FF2351] p-2 text-white hover:bg-[#e81e48]"
          onClick={handleUpdate}
          title="Update"
        >
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
            />
          </svg>
        </button>

        {/* Delete Button */}
        <button
          className="mx-1 rounded-md bg-[#FF2351] p-2 text-white hover:bg-[#e81e48]"
          onClick={handleDelete}
          title="Delete"
        >
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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
}

RowMenu.propTypes = {
  menu: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RowMenu;
