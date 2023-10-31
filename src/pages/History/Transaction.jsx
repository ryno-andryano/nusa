import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utility/format.js";
import PropTypes from "prop-types";

function Transaction({ transaction }) {
  const navigate = useNavigate();

  const { id, time, totalPrice } = transaction;

  const handleGoToDetail = (id) => {
    navigate(`/history/${id}`);
  };

  return (
    <tr className="" key={id}>
      <td className="py-4 text-sm text-gray-600">{time}</td>

      <td className="py-4 text-sm font-normal text-gray-600">{id}</td>

      <td className="py-4 text-sm text-gray-600">
        {formatCurrency(totalPrice)}
      </td>

      <td className="py-4 text-sm font-normal text-gray-500">
        <button
          className="rounded-md bg-[#FF2351] px-2 py-1 text-white hover:bg-[#e81e48]"
          onClick={() => handleGoToDetail(id)}
        >
          Detail
        </button>
      </td>
    </tr>
  );
}

Transaction.propTypes = { transaction: PropTypes.object.isRequired };

export default Transaction;
