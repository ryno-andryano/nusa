import axios from "axios";
import useSWR from "swr";
import SortHeader from "./SortHeader";
import RowMenu from "./RowMenu";
import { useState } from "react";

function Index() {
  const getMenuList = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR("http://localhost:3000/menus", getMenuList);

  const [sortMenu, setSortMenu] = useState(false);
  const [sortCategory, setSortCategory] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [sortDate, setSortDate] = useState("");

  const handleSortClick = (sortType) => () => {
    sortTransactions(sortType);

    if (sortType === "menu") {
      setSortMenu(!sortMenu);
      setSortCategory("");
      setSortPrice("");
      setSortDate("");
    } else if (sortType === "category") {
      setSortCategory(!sortCategory);
      setSortMenu("");
      setSortPrice("");
      setSortDate("");
    } else if (sortType === "price") {
      setSortPrice(!sortPrice);
      setSortMenu("");
      setSortCategory("");
      setSortDate("");
    } else if (sortType === "date") {
      setSortDate(!sortDate);
      setSortMenu("");
      setSortCategory("");
      setSortPrice("");
    }
  };

  const sortTransactions = (sortType) => {
    data.sort((a, b) => {
      if (sortType === "menu") {
        const menuAsc = a.name - b.name;
        const menuDesc = b.name - a.name;

        return sortMenu ? menuAsc : menuDesc;
      } else if (sortType === "date") {
        const dateA = new Date(a.lastModified);
        const dateB = new Date(b.lastModified);
        const latestDate = dateA - dateB;
        const oldestDate = dateB - dateA;

        return sortDate ? latestDate : oldestDate;
      } else if (sortType === "price") {
        const lowPrice = parseFloat(a.price) - parseFloat(b.price);
        const highPrice = parseFloat(b.price) - parseFloat(a.price);

        return sortPrice ? lowPrice : highPrice;
      }
    });
  };

  return (
    <section className="p-10 xl:px-20">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold uppercase">Menu List</h1>
        <button className="mx-1 flex items-center rounded-md bg-[#FF2351] px-3 py-2 text-white hover:bg-[#e81e48]">
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          ADD
        </button>
      </div>

      <div className="mt-10 rounded-xl bg-white px-6 shadow">
        <table className="w-full">
          <thead className="border-b">
            <tr className="">
              <SortHeader
                label="Menu"
                sortType="menu"
                sortDirection={sortMenu.toString()}
                onClick={handleSortClick}
              />

              <SortHeader
                label="Category"
                sortType="category"
                sortDirection={sortCategory.toString()}
                onClick={handleSortClick}
              />

              <SortHeader
                label="Price"
                sortType="price"
                sortDirection={sortPrice.toString()}
                onClick={handleSortClick}
              />

              <SortHeader
                label="LastModified"
                sortType="date"
                sortDirection={sortDate.toString()}
                onClick={handleSortClick}
              />

              <td className="py-4 text-sm font-medium text-gray-500">Action</td>
            </tr>
          </thead>

          <tbody className="bg-white lg:border-gray-300">
            {data?.map((menu) => (
              <RowMenu key={menu.id} menu={menu} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Index;
