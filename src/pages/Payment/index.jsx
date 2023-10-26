import React, { useState } from 'react';

function Payment() {
  // State untuk rincian pembayaran dan pembayaran
  const [paymentDetails, setPaymentDetails] = useState([
    { name: 'Bakso', price: 15000 },
    { name: 'Mie Ayam', price: 20000 },
    { name: 'Es Teh Manis', price: 5000 },
  ]);
  const [paymentAmount, setPaymentAmount] = useState(0);

  // Fungsi untuk menghitung total harga rincian pembayaran
  const calculateTotalPrice = () => {
    return paymentDetails.reduce((total, item) => total + item.price, 0);
  }

  
  // Fungsi untuk menghitung kembalian
  const calculateChange = () => {
    return paymentAmount - calculateTotalPrice();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold uppercase mb-4">Payment</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-lg font-bold">Payment Details</h2>
          <ul>
            {paymentDetails.map((item, index) => (
              <li key={index}>{item.name}: {item.price}</li>
            ))}
          </ul>
          <p>Total Price: {calculateTotalPrice()}</p>
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
            className="bg-blue-500 text-white p-2 rounded mt-2"
            onClick={() => {
              // Proses pembayaran
            }}
          >
            Process Payment
          </button>
          <div className="mt-4">
            Kembalian: {calculateChange()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
