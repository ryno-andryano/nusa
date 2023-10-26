function History() {
  const data = [
    {
      id: "62345231143",
      date: "October 9, 2023",
      totalPrice: "55.00",
    },
    {
      id: "62916335791",
      date: "September 27, 2023",
      totalPrice: "28.00",
    },
    {
      id: "62827168081",
      date: "August 12, 2023",
      totalPrice: "36.00",
    },
  ];

  return (
    <>
      <h1 className="text-2xl font-bold uppercase">History</h1>

      <div className="container">
        <div className="mt-6 rounded-xl bg-white px-6 shadow">
          <table className="w-full">
            <thead className="border-b">
              <tr className="">
                <td className="py-4 text-sm font-semibold text-gray-800">
                  Order Date
                </td>

                <td className="py-4 text-sm font-medium text-gray-500">
                  Order ID
                </td>

                <td className="py-4 text-sm font-medium text-gray-500">
                  Total Price
                </td>

                <td className="py-4 text-sm font-medium text-gray-500">
                  Action
                </td>
              </tr>
            </thead>

            <tbody className="bg-white lg:border-gray-300">
              {data.map(({ id, date, totalPrice }) => (
                <tr className="" key={id}>
                  <td className="py-4 text-sm text-gray-600">{date}</td>

                  <td className="py-4 text-sm font-normal text-gray-600">
                    {id}
                  </td>

                  <td className="py-4 text-sm text-gray-600">${totalPrice}</td>

                  <td className="py-4 text-sm font-normal text-gray-500">
                    <button className="rounded-md bg-[#FF2351] px-2 py-1 text-white">
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default History;
