import axios from "axios";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { formatCurrency } from "../../utility/format.js";

function HistoryDetail() {
  const { id } = useParams();

  const getHistoryDetail = (url) => axios.get(url).then((res) => res.data);
  const { data } = useSWR(
    `http://localhost:3000/transactions/${id}`,
    getHistoryDetail,
  );

  return (
    <div className="flex">
      <section className="w-full p-10 xl:px-20">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold uppercase">Transaction Detail</h1>
          <span className="text-gray-500">{data?.time}</span>
        </div>

        <span>ID: {data?.id}</span>

        <div className="mt-4 rounded-xl bg-white px-6 shadow">
          <div className="">
            {data?.items.map((item, index) => (
              <div
                className={`flex py-6 ${
                  index !== data.items.length - 1 ? "border-b-2" : ""
                }`}
                key={item.menu.id}
              >
                <img
                  className="aspect-square w-20 rounded-lg object-cover"
                  src={item.menu.image}
                  alt={item.menu.name}
                />

                <div className="flex w-full justify-between">
                  <div className="ml-4">
                    <div>{item.menu.name}</div>
                    <div>{formatCurrency(item.menu.price)}</div>
                  </div>

                  <div className="">{item.quantity}&times;</div>

                  <div className="">{formatCurrency(item.subtotal)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sticky top-0 flex h-screen w-[400px] flex-none flex-col justify-between gap-8 bg-white p-10">
        <div className="mt-16 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xl font-semibold">
            <span>Total</span>
            <span>{formatCurrency(data?.totalPrice)}</span>
          </div>

          <div className="flex items-center justify-between text-xl font-semibold">
            <span>Paid</span>
            <span>{formatCurrency(data?.paid)}</span>
          </div>

          <div className="flex items-center justify-between text-xl font-semibold">
            <span>Change</span>
            <span>{formatCurrency(data?.return)}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HistoryDetail;
