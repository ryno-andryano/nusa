import { useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utility/format.js";

function Payment() {
  // Mengambil data keranjang (cart) dari Redux store
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  // Mengambil items, totalPrice, dan images dari state cart
  const { items, totalPrice } = cart;

  const [paymentAmount, setPaymentAmount] = useState(0);

  // Fungsi untuk menghitung kembalian
  const calculateChange = () => {
    return paymentAmount - totalPrice;
  };

  const onSubmit = () => {
    if (paymentAmount === 0) {
      // Jika pembayaran masih 0, tampilkan pesan kesalahan atau lakukan sesuatu yang sesuai
      console.log("Payment amount must be greater than 0.");
    } else {
      // Jika pembayaran valid, lanjutkan dengan proses pembayaran
      console.log("Processing payment...");
      // Di sini Anda dapat menambahkan logika untuk menyelesaikan pembayaran, seperti mengirim data ke server, dan lainnya.
    }
  };

  return (
    <div className="flex">
      <section className="w-full p-10 xl:px-20">
        <h1 className="text-2xl font-bold uppercase">Payment Details</h1>
        <div className="mt-10 flex flex-col items-start justify-center rounded-lg bg-white p-4 shadow">
          <ul>
            {items.map((item, index) => (
              <li key={item.menu.id} className="mb-4 flex items-center">
                <img
                  src={item.menu.image}
                  alt={item.menu.name}
                  className="mr-4 h-16 w-16"
                />
                <div>
                  <p>{item.menu.name}</p>
                  <p>{formatCurrency(item.menu.price)}</p>
                </div>
                {index < items.length - 1 && (
                  <hr className="my-4 border-t border-gray-300" />
                )}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-semibold">
            Total Price: {formatCurrency(totalPrice)}
          </p>
        </div>
      </section>

      <section className="sticky top-0 h-screen w-[400px] flex-none bg-white p-10">
        <h1 className="text-2xl font-bold uppercase">Payment</h1>
        <input
          type="number"
          className="mt-10 w-full rounded border border-gray-300 p-2"
          placeholder="Enter payment amount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
        />
        <button
          className="mt-4 w-full rounded bg-[#FF2351] p-2 text-white transition-colors hover:bg-[#e81e48] disabled:bg-[#FF2351] disabled:opacity-50"
          onClick={onSubmit}
          disabled={paymentAmount < totalPrice}
        >
          Process Payment
        </button>
        {paymentAmount >= totalPrice && (
          <div className="mt-4">
            Kembalian: {formatCurrency(calculateChange())}
          </div>
        )}
      </section>
    </div>
  );
}

export default Payment;
