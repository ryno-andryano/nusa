import axios from "axios";
import useSWR from "swr";
import { formatCurrency } from "../../utility/format";

function History() {
  const getHistory = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR("http://localhost:3000/transactions", getHistory);

  return (
    <>
      <h1 className="text-2xl font-bold uppercase">History</h1>

      <div className="container">
        <div className="mt-6 rounded-xl bg-white px-6 shadow">
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

                <td className="py-4 text-sm font-medium text-gray-500">
                  Action
                </td>
              </tr>
            </thead>

            <tbody className="bg-white lg:border-gray-300">
              {data?.map(({ id, time, totalPrice }) => (
                // <HistoryItem />
                <tr className="" key={id}>
                  <td className="py-4 text-sm text-gray-600">{time}</td>

                  <td className="py-4 text-sm font-normal text-gray-600">
                    {id}
                  </td>

                  <td className="py-4 text-sm text-gray-600">
                    {formatCurrency(totalPrice)}
                  </td>

                  <td className="py-4 text-sm font-normal text-gray-500">
                    <button className="rounded-md bg-[#FF2351] px-2 py-1 text-white">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default History;
