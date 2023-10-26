import { formatCurrency } from "../../utility/format.js";
import PropTypes from "prop-types";

function CartItem({ menu, quantity }) {
  return (
    <div key={menu.id} className="flex gap-8 rounded-lg bg-white p-4">
      <img
        className="aspect-square w-20 rounded-lg object-cover"
        src={menu.image}
        alt={menu.name}
      />

      <div className="flex w-full flex-col justify-around">
        <h3 className="font-semibold">{menu.name}</h3>
        <div className="flex w-full items-center justify-between">
          <p className="text-gray-500">
            {formatCurrency(menu.price * quantity)}
          </p>
          <div className="flex items-center gap-3">
            <button
              className="aspect-square w-6 rounded border text-sm hover:bg-gray-200 active:bg-gray-300"
              type="button"
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="aspect-square w-6 rounded border text-sm hover:bg-gray-200 active:bg-gray-300"
              type="button"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  menu: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default CartItem;
