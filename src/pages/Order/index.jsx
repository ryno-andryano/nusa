import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import axios from "axios";
import { emptyCart } from "../../redux/cartSlice.js";
import { formatCurrency } from "../../utility/format.js";
import MenuItem from "./MenuItem.jsx";
import CartItem from "./CartItem.jsx";

function Order() {
  const [menus, setMenus] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/menus",
    (url) => axios.get(url).then((response) => response.data),
  );

  useEffect(() => {
    if (!data) return;
    setMenus([...data]);

    if (query)
      setMenus((prevState) =>
        [...prevState].filter((menu) =>
          menu.name.toLowerCase().includes(query.toLowerCase()),
        ),
      );

    switch (sortBy) {
      case "name-asc": {
        setMenus((prevState) =>
          [...prevState].sort((a, b) => a.name.localeCompare(b.name)),
        );
        break;
      }
      case "name-desc": {
        setMenus((prevState) =>
          [...prevState].sort((a, b) => b.name.localeCompare(a.name)),
        );
        break;
      }
      case "price-asc": {
        setMenus((prevState) =>
          [...prevState].sort((a, b) => a.price - b.price),
        );
        break;
      }
      case "price-desc": {
        setMenus((prevState) =>
          [...prevState].sort((a, b) => b.price - a.price),
        );
        break;
      }
    }
  }, [data, query, sortBy]);

  const handleResetClick = () => dispatch(emptyCart());

  return (
    <div className="flex">
      <section className="w-full p-10 xl:px-20">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold uppercase">Choose Order</h1>

          <div>
            <input
              className="mr-2 w-64 rounded border px-2 py-1 focus:border-[#FF2351] focus:ring-[#FF2351]"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Search Menu"
              autoComplete="off"
              spellCheck="false"
            />

            <select
              className="rounded border px-2 py-1 pr-8 focus:border-[#FF2351] focus:ring-[#FF2351]"
              name="sort"
              title="Sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
            >
              <option value="default">Default</option>
              <option value="name-asc">&uarr; Name</option>
              <option value="name-desc">&darr; Name</option>
              <option value="price-asc">&uarr; Price</option>
              <option value="price-desc">&darr; Price</option>
            </select>
          </div>
        </div>

        {!error && !isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {menus.map((menu) => (
              <MenuItem
                key={menu.id}
                menu={menu}
                inCart={items.some((item) => item.menu.id === menu.id)}
              />
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </section>

      <section className="sticky top-0 flex h-screen w-[400px] flex-none flex-col justify-between gap-8 bg-white p-10">
        <div className="flex min-h-0 flex-col">
          <div className="mb-10 flex items-center justify-between">
            <h1 className="text-2xl font-bold uppercase">Current Order</h1>
            {items.length > 0 && (
              <button
                className="text-sm text-gray-400"
                onClick={handleResetClick}
                type="button"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-col gap-4 overflow-y-auto pb-2">
            {items.length > 0 ? (
              items.map((item) => <CartItem key={item.menu.id} item={item} />)
            ) : (
              <p className="py-5 text-center">Empty</p>
            )}
          </div>
        </div>

        <div className="flex h-[104px] flex-none flex-col">
          <div className="flex items-center justify-between text-xl font-semibold">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>

          <Link
            to="/payment"
            className={
              "mt-4 w-full rounded-lg bg-[#FF2351] py-4 text-center text-lg text-white transition-colors" +
              (items.length > 0
                ? " hover:bg-[#e81e48]"
                : " pointer-events-none opacity-50")
            }
          >
            Continue To Payment
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Order;
