import * as React from 'react';
import { useSelector } from 'react-redux';
import { useTable,usePagination } from 'react-table';
import {useHistory} from 'react-router-dom'

function Table() {
    const moveTo = useHistory() 
    const states = useSelector(state => state)
    const {fullData} = states;
    const formattedResult = {
        fullData
    };
  const data = React.useMemo(() => fullData, []);
  const columns = React.useMemo(() => [
    {
      Header: 'NAME',
      accessor: 'name',
    },
    {
      Header: 'SUR_NAME',
      accessor: 'surname',
    },
    {
      Header: 'AGE',
      accessor: 'age',
    },
    {
      Header: 'DATE',
      accessor: 'date',
    }
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable({ columns, data },usePagination);
  const {pageIndex,pageSize} = state
  const handleBack = () => {
    moveTo.push("/")
}
  return (
    <div className="App">
      <table style={{ border: '2px solid black' }} {...getTableProps()}>
        <thead style={{ border: '2px solid black' }}>
          {headerGroups.map((headerGroup) => (
            <tr style={{ border: '2px solid black' }} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th style={{ border: '2px solid black' }} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody style={{ border: '2px solid black' }} {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr style={{ border: '2px solid black' }} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td style={{ border: '2px solid black' }} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={handleBack}>Insert other</button>
    </div>
  );
}

export default Table;
