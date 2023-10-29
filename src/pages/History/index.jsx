import axios from "axios";
import useSWR from "swr";
import Transaction from "./Transaction";

function History() {
  const getHistory = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR("http://localhost:3000/transactions", getHistory);

  return (
    <section className="p-10 xl:px-20">
      <h1 className="text-2xl font-bold uppercase">Transaction History</h1>

      <div className="mt-10 rounded-xl bg-white px-6 shadow">
        <table className="w-full">
          <thead className="border-b">
            <tr className="">
              <td className="py-4 text-sm font-semibold text-gray-800">
                Order Date
              </td>

              <td className="py-4 text-sm font-medium text-gray-500">
                Order ID
              </td>

              <td className="py-4 text-sm font-medium text-gray-500">
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
