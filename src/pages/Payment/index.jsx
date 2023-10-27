import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Payment() {
  // Mengambil data keranjang (cart) dari Redux store
  const cart = useSelector((state) => state.cart);

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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold uppercase mb-4">Payment</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold">Payment Details</h2>
          <div className="flex flex-col items-start justify-center rounded-lg bg-white p-4 shadow">
            <ul>
              {items.map((item, index) => (
                <li key={item.menu.id} className="mb-4 flex items-center">
                  <img
                    src={item.menu.image}
                    alt={item.menu.name}
                    className="w-16 h-16 mr-4"
                  />
                  <div>
                    <p>{item.menu.name}</p>
                    <p>{item.menu.price}</p>
                  </div>
                  {index < items.length - 1 && <hr className="my-4 border-t border-gray-300" />}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-semibold">Total Price: {totalPrice}</p>
          </div>


        </div>
        <div>
          <h2 className="text-lg font-bold">Payment</h2>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter payment amount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />
          <button
            className="bg-[#FF2351] text-white p-2 rounded mt-2 transition-colors hover:bg-[#e81e48]"
            onClick={onSubmit}
          >
            Process Payment
          </button>
          {paymentAmount !== 0 && (
            <div className="mt-4">
              Kembalian: {calculateChange()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
