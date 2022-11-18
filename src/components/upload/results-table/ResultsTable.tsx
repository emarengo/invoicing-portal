export interface ResultItem {
  [key: string]: string;
}

interface ResultsTableProps {
  title: string;
  items: (ResultItem | string)[];
  values: {
    key?: string;
    label: string;
  }[];
}

const ResultsTable = ({ title, items, values }: ResultsTableProps) => {
  return (
    <div className="results-table">
      <h5>{title}</h5>
      <table className="table">
        <colgroup>
          <col width="5%" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">#</th>
            {values.map((value, index) => (
              <th scope="col" key={index}>
                {value.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              {values.map((value, valueIndex) => (
                <td key={valueIndex}>
                  {item &&
                    (value.key
                      ? (item as ResultItem)[value.key as string]
                      : (item as string))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
