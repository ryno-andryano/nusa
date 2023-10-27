import { formatCurrency } from "../../utility/format.js";
import PropTypes from "prop-types";

function Transaction({ transaction }) {
  const { id, time, totalPrice } = transaction;
  return (
    <tr className="" key={id}>
      <td className="py-4 text-sm text-gray-600">{time}</td>

      <td className="py-4 text-sm font-normal text-gray-600">{id}</td>

      <td className="py-4 text-sm text-gray-600">
        {formatCurrency(totalPrice)}
      </td>

      <td className="py-4 text-sm font-normal text-gray-500">
        <button className="rounded-md bg-[#FF2351] px-2 py-1 text-white">
          Detail
        </button>
      </td>
    </tr>
  );
}

Transaction.propTypes = { transaction: PropTypes.object.isRequired };

export default Transaction;
