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
    <>
      <h1 className="text-2xl font-bold uppercase">Transaction Detail</h1>

      <div>
        <div>ID: {data?.id}</div>
        <div>Date: {data?.time}</div>

        <br />

        {data?.items.map((item) => (
          <>
            <div key={item.id}>
              <div>Name: {item.menu.name}</div>
              <div>Price: {item.menu.price}</div>
              <img className="w-1/5" src={item.menu.image} />
              <div>Quantity: {item.quantity}&times;</div>
              <div>Subtotal: {formatCurrency(item.subtotal)}</div>
            </div>
            <br />
          </>
        ))}

        <div>Total: {formatCurrency(data?.totalPrice)}</div>
        <div>Dibayar: {formatCurrency(data?.paid)}</div>
        <div>Kembalian: {formatCurrency(data?.return)}</div>
      </div>
    </>
  );
}

export default HistoryDetail;
