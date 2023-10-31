import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatCurrency } from "../../utility/format.js";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { emptyCart } from "../../redux/cartSlice";
import axios from "axios";


function Payment() {


  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = cart;

  const [paymentAmount, setPaymentAmount] = useState(0);
  const [isPaymentSuccessModalOpen, setIsPaymentSuccessModalOpen] = useState(false);

  const calculateChange = () => {
    return paymentAmount - totalPrice;
  };

  const closeModal = () => {
    setIsPaymentSuccessModalOpen(false);
  };

  const onSubmit = () => {

      const newTransaction = {
        time: new Date().toLocaleString(),
        items,
        totalPrice,
        paid: parseInt(paymentAmount),
        return: calculateChange(),
      };

      // kirim ke server di sini
      axios
     .post("http://localhost:3000/transactions", newTransaction)
     .then(() => {
       dispatch(emptyCart()); // Mengosongkan keranjang setelah pembayaran
       setIsPaymentSuccessModalOpen(true);
     })
     .catch((error) => {
       console.error("Error posting transaction:", error);
     });
  };

  return (
    <div className="flex">
      <section className="w-full p-10 xl:px-20">
        <h1 className="text-2xl font-bold uppercase">Payment Details</h1>
        <div className="mt-10 flex flex-col items-start justify-center rounded-lg bg-white p-4 shadow">
          <ul>
            {items.map((item, index) => (
              <li key={item.menu.id} className="mb-2 flex items-center">
                <img
                  src={item.menu.image}
                  alt={item.menu.name}
                  className="mr-4 h-16 w-16"
                />
                <div className="flex w-full justify-between">
                  <div className="ml-4">
                    <div>{item.menu.name}</div>
                    <div>{item.quantity}x</div>
                    <div>{formatCurrency(item.menu.price * item.quantity)}</div>
                  </div>
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

      <ReactModal
        isOpen={isPaymentSuccessModalOpen}
        onRequestClose={closeModal}
        contentLabel="Payment Success Modal"
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto inset-0"
        overlayClassName="fixed inset-0 bg-black opacity-50"
      >
        <div className="relative w-full max-w-md bg-white rounded-lg shadow p-6 text-center white:bg-white">
          <svg
          className="mx-auto mb-4 text-black-400 w-12 h-12 dark:text-black-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        viewBox="0 0 20 20"
      >
      <path
        stroke="currentColor"
        strokeLinecap="round"   
        strokeLinejoin="round" 
        strokeWidth="2"        
        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
      </svg>
      <h2 className="text-xl font-normal text-black-500 black:text-black mb-5">
      Payment Successful!
      </h2>
      <p>Your payment has been processed successfully.</p>
        <button onClick={() => navigate("/order")}className="mt-4 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
          Close</button>
          </div>
      </ReactModal>
    </div>
  );
}

export default Payment;
