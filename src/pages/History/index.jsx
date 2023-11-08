import { useState } from "react";
import useSWR from "swr";
import axios from "axios";
import Transaction from "./Transaction";
import SortHeader from "./SortHeader";
import { BounceLoader } from "react-spinners";

function History() {
  const getHistory = (url) => axios.get(url).then((res) => res.data);
  const { data, isLoading, error } = useSWR(
    "http://localhost:3000/transactions",
    getHistory,
  );

  const [sortDate, setSortDate] = useState(false);
  const [sortPrice, setSortPrice] = useState("");

  const handleSortClick = (sortType) => () => {
    sortTransactions(sortType);
    if (sortType === "date") {
      setSortDate(!sortDate);
      setSortPrice("");
    } else {
      setSortPrice(!sortPrice);
      setSortDate("");
    }
  };

  const sortTransactions = (sortType) => {
    [...data].sort((a, b) => {
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
    <div className="flex min-h-screen">
      <section className="w-full p-10 xl:px-20">
        <h1 className="text-2xl font-bold uppercase">Transaction History</h1>

        {!error && !isLoading ? (
          <div className="mt-10 rounded-xl bg-white px-6 shadow">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <SortHeader
                    label="Order Date"
                    sortType="date"
                    sortDirection={sortDate.toString()}
                    onClick={handleSortClick}
                  />

                  <td className="py-4 text-sm font-medium text-gray-500">
                    Order ID
                  </td>

                  <SortHeader
                    label="Total Price"
                    sortType="price"
                    sortDirection={sortPrice.toString()}
                    onClick={handleSortClick}
                  />

                  <td className="py-4 text-sm font-medium text-gray-500">
                    Action
                  </td>
                </tr>
              </thead>

              <tbody className="bg-white lg:border-gray-300">
                {[...data].map((transaction) => (
                  <Transaction key={transaction.id} transaction={transaction} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BounceLoader color="#FF2351" size={100} speedMultiplier={1.2} />
          </div>
        )}
      </section>
    </div>
  );
}

export default History;
