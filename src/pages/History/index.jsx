import axios from "axios";
import useSWR from "swr";
import Transaction from "./Transaction";
import { useState } from "react";

function History() {
  const getHistory = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR("http://localhost:3000/transactions", getHistory);

  const [sortDate, setSortDate] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);

  const handleSortClick = (sortType) => () => {
    sortTransactions(sortType);
    if (sortType === "date") {
      setSortDate(!sortDate);
    } else {
      setSortPrice(!sortPrice);
    }
  };

  const sortTransactions = (sortType) => {
    data.sort((a, b) => {
      if (sortType === "price") {
        const lowPrice = parseFloat(a.totalPrice) - parseFloat(b.totalPrice); // Sort Transactions by Lowest Price
        const highPrice = parseFloat(b.totalPrice) - parseFloat(a.totalPrice); // Sort Transactions by Highest Price
        return sortPrice ? highPrice : lowPrice;
      } else if (sortType === "date") {
        // Sort Transactions by Date
        const dateA = new Date(a.time);
        const dateB = new Date(b.time);
        const oldestDate = dateA - dateB;
        const latestDate = dateB - dateA;
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
              <td
                className="flex cursor-pointer py-4 text-sm font-semibold text-gray-800 hover:text-[#e81e48]"
                onClick={handleSortClick("date")}
              >
                {/* Down Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`h-5 w-5 ${sortDate ? "hidden" : "block"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                  />
                </svg>
                {/* Up Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`h-5 w-5 ${sortDate ? "block" : "hidden"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                  />
                </svg>
                Order Date
              </td>

              <td className="py-4 text-sm font-medium text-gray-500">
                Order ID
              </td>

              <td
                className="flex cursor-pointer py-4 text-sm font-semibold text-gray-800 hover:text-[#e81e48]"
                onClick={handleSortClick("price")}
              >
                {/* Up Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`h-5 w-5 ${sortPrice ? "block" : "hidden"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                  />
                </svg>
                {/* Down Arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`h-5 w-5 ${sortPrice ? "hidden" : "block"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                  />
                </svg>
                Total Price
              </td>

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
