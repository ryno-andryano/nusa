import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatCurrency } from "../../utility/format.js";
import { emptyCart } from "../../redux/cartSlice";

function Payment() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = cart;

  const [paymentAmount, setPaymentAmount] = useState("");
  const [isPaymentSuccessModalOpen, setIsPaymentSuccessModalOpen] =
    useState(false);

  const calculateChange = () => {
    return paymentAmount - totalPrice;
  };

  const closeModal = () => {
    setIsPaymentSuccessModalOpen(false);
    dispatch(emptyCart()); // Mengosongkan keranjang setelah pembayaran
    navigate("/order");
  };

  const onSubmit = (event) => {
    event.preventDefault();

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
        setIsPaymentSuccessModalOpen(true);
      })
      .catch((error) => {
        console.error("Error posting transaction:", error);
      });
  };

  return (
    <div className="flex">
      <section className="w-full p-10 xl:px-20">
        <h1 className="mb-10 text-2xl font-bold uppercase">Payment Details</h1>

        <div className="rounded-xl bg-white px-6 shadow">
          {items.map((item) => (
            <div
              key={item.menu.id}
              className="flex border-b-2 py-6 last:border-b-0"
            >
              <img
                className="aspect-square w-20 rounded-lg object-cover"
                src={item.menu.image}
                alt={item.menu.name}
              />
              <div className="grid w-full grid-cols-3">
                <div className="ml-4">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.menu.name}
                  </div>
                  <div>{formatCurrency(item.menu.price)}</div>
                </div>

                <div className="text-center">{item.quantity}&times;</div>

                <div className="text-right">
                  {formatCurrency(item.subtotal)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sticky top-0 h-screen w-[400px] flex-none bg-white p-10">
        <h1 className="mb-10 text-2xl font-bold uppercase">Payment</h1>
        <div className="mb-4 flex items-center justify-between text-xl font-semibold">
          <span>Total</span>
          <span>{formatCurrency(totalPrice)}</span>
        </div>
        <form onSubmit={onSubmit}>
          <input
            type="number"
            className="mb-4 w-full rounded border p-2 focus:border-[#FF2351] focus:ring-[#FF2351]"
            placeholder="Enter payment amount"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
          />

          <div
            className={`${
              paymentAmount >= totalPrice ? "visible" : "invisible"
            } mb-10 flex items-center justify-between text-xl font-semibold`}
          >
            <span>Change</span>
            <span>{formatCurrency(calculateChange())}</span>
          </div>

          <button
            className="w-full rounded bg-[#FF2351] p-2 text-white transition-colors hover:bg-[#e81e48] disabled:bg-[#FF2351] disabled:opacity-50"
            type="submit"
            disabled={paymentAmount < totalPrice}
          >
            Process Payment
          </button>
        </form>
      </section>

      <ReactModal
        isOpen={isPaymentSuccessModalOpen}
        onRequestClose={closeModal}
        contentLabel="Payment Success Modal"
        className="p-0"
        overlayClassName="fixed inset-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      >
        <div className="relative w-full rounded-lg bg-white p-10 text-center shadow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-check-circle-fill mx-auto mb-4 h-14 w-14 text-green-400"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>

          <h2 className="text-black-500 black:text-black mb-2 text-2xl font-semibold">
            Payment Successful!
          </h2>
          <p>Your payment has been processed successfully.</p>

          <button className="absolute right-4 top-4" onClick={closeModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg>
          </button>
        </div>
      </ReactModal>
    </div>
  );
}

export default Payment;
