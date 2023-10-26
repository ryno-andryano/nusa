import { formatCurrency } from "../../utility/format.js";
import PropTypes from "prop-types";

function MenuItem({ menu }) {
  const { name, price, image } = menu;

  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow">
      <img
        className="aspect-square w-full rounded-lg object-cover"
        src={image}
        alt={name}
      />
      <h2 className="mt-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-semibold">
        {name}
      </h2>
      <p className="text-center text-gray-500">{formatCurrency(price)}</p>
    </div>
  );
}

MenuItem.propTypes = { menu: PropTypes.object.isRequired };

export default MenuItem;
