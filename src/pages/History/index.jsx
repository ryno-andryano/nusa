import axios from "axios";
import useSWR from "swr";
import Transaction from "./Transaction";
import { useState } from "react";
import SortHeader from "./SortHeader";

function History() {
  const getHistory = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR("http://localhost:3000/transactions", getHistory);

  const [sortDate, setSortDate] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  const handleSortClick = (sortType) => () => {
    if (sortType === "date") {
      switch (sortDate) {
        case "asc":
          setSortDate("desc");
          break;
        case "desc":
          setSortDate("");
          break;
        default:
          setSortDate("asc");
      }
    } else if (sortType === "price") {
      switch (sortPrice) {
        case "asc":
          setSortPrice("desc");
          break;
        case "desc":
          setSortPrice("");
          break;
        default:
          setSortPrice("asc");
      }
    }
    sortTransactions(sortType);
  };

  const sortTransactions = (sortType) => {
    data.sort((a, b) => {
      if (sortType === "price") {
        const lowPrice = parseFloat(a.totalPrice) - parseFloat(b.totalPrice);
        const highPrice = parseFloat(b.totalPrice) - parseFloat(a.totalPrice);

        return sortPrice ? lowPrice : highPrice;
      } else if (sortType === "date") {
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        const latestDate = dateA - dateB;
        const oldestDate = dateB - dateA;

        return sortDate ? latestDate : oldestDate;
      }
    });
  };

  return (
    <section className="p-10 xl:px-20">
      <h1 className="text-2xl font-bold uppercase">Transaction History</h1>

      <div className="mt-10 rounded-xl bg-white px-6 shadow">
        <table className="w-full">
          <thead className="border-b">
            <tr className="">
              <SortHeader
                label="Order Date"
                sortType="date"
                sortDirection={sortDate}
                onClick={handleSortClick}
              />

              <td className="py-4 text-sm font-medium text-gray-500">
                Order ID
              </td>

              <SortHeader
                label="Total Price"
                sortType="price"
                sortDirection={sortPrice}
                onClick={handleSortClick}
              />

              <td className="py-4 text-sm font-medium text-gray-500">Action</td>
            </tr>
          </thead>

          <tbody className="bg-white lg:border-gray-300">
            {data?.map((transaction) => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default History;
