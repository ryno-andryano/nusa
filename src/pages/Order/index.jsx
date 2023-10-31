import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSWR from "swr";
import axios from "axios";
import { emptyCart } from "../../redux/cartSlice.js";
import { formatCurrency } from "../../utility/format.js";
import MenuItem from "./MenuItem.jsx";
import CartItem from "./CartItem.jsx";
import CategoryFilter from "./CategoryFilter.jsx";

function Order() {
  const [menus, setMenus] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [filters, setFilters] = useState([]);
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

    if (filters.length > 0)
      setMenus((prevState) =>
        [...prevState].filter((menu) => filters.includes(menu.category)),
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
  }, [data, filters, query, sortBy]);

  const handleResetClick = () => dispatch(emptyCart());

  const handleCategoryClick = (event) => {
    const { name } = event.target;
    if (name === "all") {
      setFilters([]);
      return;
    }

    const index = filters.indexOf(name);
    if (index === -1) setFilters([...filters, name]);
    else setFilters([...filters.filter((filter) => filter !== name)]);
  };

  return (
    <div className="flex">
      <section className="w-full min-w-0 p-10 xl:px-20">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold uppercase">Choose Order</h1>

          <div className="relative">
            <input
              className="w-64 rounded-lg border py-1 pl-11 pr-4 focus:border-[#FF2351] focus:ring-[#FF2351]"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              type="search"
              placeholder="Search menu..."
              autoComplete="off"
              spellCheck="false"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-search absolute left-4 top-[50%] -translate-y-[50%]"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </div>
        </div>

        {!error && !isLoading ? (
          <>
            <div className="mb-2 mt-10 flex w-full justify-between gap-4 pb-2">
              <CategoryFilter
                categories={[...new Set([...data].map((d) => d.category))]}
                filters={filters}
                onClick={handleCategoryClick}
              />

              <select
                className="h-full rounded-lg border px-4 py-2 pr-8 focus:border-[#FF2351] focus:ring-[#FF2351]"
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

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {menus.map((menu) => (
                <MenuItem
                  key={menu.id}
                  menu={menu}
                  inCart={items.some((item) => item.menu.id === menu.id)}
                />
              ))}
            </div>
          </>
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
