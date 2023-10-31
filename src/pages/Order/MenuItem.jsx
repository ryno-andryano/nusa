import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { formatCurrency } from "../../utility/format.js";
import { addCartItem, removeCartItem } from "../../redux/cartSlice.js";

function MenuItem({ menu, inCart }) {
  const { name, price, image } = menu;
  const dispatch = useDispatch();

  const handleItemClick = () => {
    inCart ? dispatch(removeCartItem(menu)) : dispatch(addCartItem(menu));
  };

  return (
    <div
      className={`flex cursor-pointer flex-col items-center justify-center rounded-lg bg-white p-4 shadow transition hover:shadow-lg ${
        inCart ? "ring-4 ring-[#FF2351]" : ""
      }`}
      onClick={handleItemClick}
    >
      <img
        className="aspect-square w-full rounded-lg object-cover"
        src={image}
        alt={name}
      />
      <h2
        className="mt-3 w-full overflow-hidden text-ellipsis whitespace-nowrap text-center font-semibold"
        title={name}
      >
        {name}
      </h2>
      <p className="text-center">{formatCurrency(price)}</p>
    </div>
  );
}

MenuItem.propTypes = {
  menu: PropTypes.object.isRequired,
  inCart: PropTypes.bool,
};

export default MenuItem;
