import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utility/format.js";
import {
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
} from "../../redux/cartSlice.js";

function CartItem({ item }) {
  const { menu, quantity, subtotal } = item;
  const dispatch = useDispatch();

  const handlePlusClick = () => dispatch(increaseQuantity(menu));

  const handleMinusClick = () => dispatch(decreaseQuantity(menu));

  const handleRemoveClick = () => dispatch(removeCartItem(menu));

  return (
    <div className="relative flex flex-none gap-4 rounded-lg bg-gray-100 p-4 shadow">
      <img
        className="aspect-square w-16 rounded object-cover"
        src={menu.image}
        alt={menu.name}
      />

      <div className="flex w-full min-w-0 flex-col justify-between">
        <h3
          className="overflow-x-hidden text-ellipsis whitespace-nowrap pr-2 font-semibold"
          title={menu.name}
        >
          {menu.name}
        </h3>
        <div className="flex w-full items-center justify-between">
          <p className="text-gray-500">{formatCurrency(subtotal)}</p>
          <div className="flex items-center gap-3">
            <button
              className="aspect-square w-6 rounded border bg-white text-sm hover:bg-gray-200 active:bg-gray-300 disabled:bg-white disabled:opacity-50"
              onClick={handleMinusClick}
              type="button"
              disabled={quantity <= 1}
              title="Decrease"
            >
              -
            </button>
            <span className="w-4 text-center">{quantity}</span>
            <button
              className="aspect-square w-6 rounded border bg-white text-sm hover:bg-gray-200 active:bg-gray-300"
              onClick={handlePlusClick}
              type="button"
              title="Increase"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <button
        className="absolute right-2 top-2"
        onClick={handleRemoveClick}
        type="button"
        title="Remove"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x h-5 w-5 text-gray-400"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartItem;
