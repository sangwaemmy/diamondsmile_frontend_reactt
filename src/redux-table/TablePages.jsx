import React, { useMemo } from "react"
// import { Columns } from "./Columns"
import { useTable,usePagination, useSortBy } from "react-table"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
// import {useHistory} from 'react-router-dom'

const Pagination = () => {
    const states = useSelector(state => state)
    const {fullData} = states;
    const data = useMemo(() => fullData,[])
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
        page,
        previousPage,
        nextPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow
    } = useTable({
        data,
        columns
    },useSortBy,usePagination)
    const { pageIndex, pageSize } = state
    return<><div className="container mt-3">
        <table className="table table-stripped table-hover table-bordered"  {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render("Header")}
                                        <span>
                                            {column.isSorted? (column.isSortedDesc? <p>desc</p>: <p>asc</p>): <p></p>}
                                        </span>
                                        </th>
                                ))
                            }
                        </tr>
                    ))
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row)=>{
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map((cell) =>(
                                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                ))
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
        <div className="text-center">
                page {" "} {pageIndex +1} {" "} of {pageOptions.length}
            </div>
        <div className="d-flex ms-5">
            
            <input type="number" defaultValue={pageIndex +1} onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(pageNumber)
            }} />

            <select value={pageSize} onChange={e => {setPageSize(Number(e.target.value))}}>
                {
                    [1,5,10,25,50,75,100].map((pageSize) =>(
                        <option value={pageSize} >set size to {pageSize}</option>
                    ))
                }
            </select>

            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>end</button>

            <button 
            className="btn btn-secondary w-25" 
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            >previous</button>

            <button 
            className="btn btn-primary w-25" 
            onClick={() => nextPage()}
            disabled={!canNextPage}
            >next</button>

            <button onClick={() => gotoPage(pageCount -1)} disabled={!canNextPage}>start</button>
        </div>
      <Link to="/form1" className="btn btn-primary w-25 ms-5 mt-3">Insert other</Link>
      </div>
    </>
}
export default Pagination