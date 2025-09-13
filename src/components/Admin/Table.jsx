const Table = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
        <thead>
          <tr>
            {headers.map((head, i) => (
              <th
                key={i}
                className="border border-gray-300 px-2 py-2 md:px-4 md:py-2 bg-gray-100 text-left"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-gray-300 px-2 py-2 md:px-4 md:py-2"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
