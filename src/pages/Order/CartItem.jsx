import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { formatCurrency } from "../../utility/format.js";
import { decreaseQuantity, increaseQuantity } from "../../redux/cartSlice.js";

function CartItem({ item }) {
  const { menu, quantity, subtotal } = item;
  const dispatch = useDispatch();

  const handlePlusClick = () => {
    dispatch(increaseQuantity(menu));
  };

  const handleMinusClick = () => {
    dispatch(decreaseQuantity(menu));
  };

  return (
    <div className="relative flex gap-8 rounded-lg bg-white p-4 shadow">
      <img
        className="aspect-square w-16 rounded object-cover"
        src={menu.image}
        alt={menu.name}
      />

      <div className="flex w-full flex-col justify-between">
        <h3 className="font-semibold">{menu.name}</h3>
        <div className="flex w-full items-center justify-between">
          <p className="text-gray-500">{formatCurrency(subtotal)}</p>
          <div className="flex items-center gap-3">
            <button
              className="aspect-square w-6 rounded border text-sm hover:bg-gray-200 active:bg-gray-300 disabled:bg-inherit disabled:opacity-50"
              onClick={handleMinusClick}
              type="button"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="w-4 text-center">{quantity}</span>
            <button
              className="aspect-square w-6 rounded border text-sm hover:bg-gray-200 active:bg-gray-300"
              onClick={handlePlusClick}
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
  item: PropTypes.object.isRequired,
};

export default CartItem;
