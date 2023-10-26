import { formatCurrency } from "../../utility/format.js";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem.jsx";
import CartItem from "./CartItem.jsx";

function Order() {
  const menus = [
    {
      id: 1,
      name: "Chicken Satay Nusantara",
      category: "Appetizer",
      price: 45000,
      image:
        "https://api.arenacorp.com/assets/uploaded/arena/media/MEDI_9157F22FB2A94D58A450C6D5F2B11994_1441761614.jpeg",
    },
    {
      id: 2,
      name: "Beef Satay Kotagede",
      category: "Appetizer",
      price: 50000,
      image:
        "https://api.arenacorp.com/assets/uploaded/arena/media/MEDI_D7C49FDEDE064CC4BC77030AEADB53CE_1441761615.jpeg",
    },
    {
      id: 3,
      name: "Stuffed Tofu Parahyangan",
      category: "Appetizer",
      price: 40000,
      image:
        "https://api.arenacorp.com/assets/uploaded/arena/media/MEDI_C3D2F40C1F6B4219A5E70DF3D1B75EA2_1697015416.jpeg",
    },
    {
      id: 4,
      name: "Selat Popia",
      category: "Appetizer",
      price: 38000,
      image:
        "https://api.arenacorp.com/assets/uploaded/arena/media/MEDI_A52A6757C10D4C3D853A3D408C741BA5_1441761615.jpeg",
    },
    {
      id: 5,
      name: "Gulai Fish Head Tasik",
      category: "Seafood",
      price: 63000,
      image:
        "https://api.arenacorp.com/assets/uploaded/arena/media/MEDI_307F2335A12C418C8C7D50AA0BA134FC_1441773582.jpeg",
    },
    {
      id: 6,
      name: "Jimbaran Fried Fish",
      category: "Seafood",
      price: 70000,
      image:
        "https://api.arenacorp.com/assets/uploaded/arena/media/MEDI_3F83DA5CAF6C4454A5F7E90D5F92A5BF_1586858338.jpeg",
    },
    {
      id: 7,
      name: "Malacca Nasi Lemak",
      category: "Rice & Noodle",
      price: 55000,
      image:
        "https://api.arenacorp.com/assets/uploaded/arena/media/MEDI_0F6DF9DF308849768BBE5D310EC8DEA6_1441771987.jpeg",
    },
    {
      id: 8,
      name: "Nasi Sayur Medan",
      category: "Rice & Noodle",
      price: 45000,
      image:
        "https://api.arenacorp.com/assets/uploaded/arena/media/MEDI_C3AD725A38DB4F77B64E22E1E74D5CB9_1441771987.jpeg",
    },
    {
      id: 9,
      name: "Nasi Bali Singaraja",
      category: "Rice & Noodle",
      price: 52000,
      image:
        "https://api.arenacorp.com/assets/uploaded/arena/media/MEDI_AC2BEC6A06214E45A7CBF498D0FDC54C_1471922390.jpeg",
    },
  ];

  const carts = [
    {
      menu: menus[2],
      quantity: 2,
    },
    {
      menu: menus[5],
      quantity: 1,
    },
    {
      menu: menus[8],
      quantity: 3,
    },
  ];

  return (
    <div className="flex gap-12">
      <section className="basis-2/3">
        <h1 className="text-2xl font-bold uppercase">Choose Order</h1>
        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {menus.map((menu) => (
            <MenuItem key={menu.id} menu={menu} />
          ))}
        </div>
      </section>

      <section className="basis-1/3">
        <h1 className="text-2xl font-bold uppercase">Order Menu</h1>
        <div className="mt-10 flex flex-col gap-4">
          {carts.map(({ menu, quantity }) => (
            <CartItem key={menu.id} menu={menu} quantity={quantity} />
          ))}

          <hr className="mt-10 border-t border-gray-700" />

          <div className="flex items-center justify-between text-xl font-semibold">
            <span>Total</span>
            <span>{formatCurrency(306000)}</span>
          </div>

          <Link
            to="/payment"
            className="mt-4 w-full rounded-lg bg-[#FF2351] py-4 text-center text-lg uppercase text-white transition-colors hover:bg-[#e81e48]"
          >
            Pay
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Order;
