import { formatCurrency } from "../../utility/format.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useSWR from "swr";
import axios from "axios";
import { formatCurrency } from "../../utility/format.js";
import MenuItem from "./MenuItem.jsx";
import CartItem from "./CartItem.jsx";

function Order() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/menus",
    (url) => axios.get(url).then((response) => response.data),
  );

  let menus;
  if (data) menus = [...data];

  return (
    <div className="flex gap-12">
      <section className="basis-2/3">
        <h1 className="text-2xl font-bold uppercase">Choose Order</h1>
        {!error && !isLoading ? (
          <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {menus?.length > 0 ? (
              menus.map((menu) => (
                <MenuItem
                  key={menu.id}
                  menu={menu}
                />
              ))
            ) : (
              <p>No Match</p>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section className="basis-1/3">
        <h1 className="text-2xl font-bold uppercase">Order Menu</h1>
        <div className="mt-10 flex flex-col gap-4">
          {cartItems.length > 0 ? (
            cartItems.map(({ menu, quantity }) => (
              <CartItem key={menu.id} menu={menu} quantity={quantity} />
            ))
          ) : (
            <p>Cart Empty</p>
          )}

          <hr className="mt-10 border-t border-gray-700" />

          <div className="flex items-center justify-between text-xl font-semibold">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>

          <Link
            to="/payment"
            className="mt-4 w-full rounded-lg bg-[#FF2351] py-4 text-center text-lg uppercase text-white transition-colors hover:bg-[#e81e48]"
          >
            Pay
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Order;
