import * as React from 'react'
import {useTable, useGlobalFilter,useFilters} from 'react-table'
import { GlobalFilter } from './GlobalFilter'
import { COLUMNS } from "./columns";


export const FilteringTable = ({idMap,records}) => {

  const data = React.useMemo(()=>records,[records]);
  const columns = React.useMemo(()=>COLUMNS,[records]);
  const {getTableProps,getTableBodyProps,headerGroups,footerGroups,rows,prepareRow,state,setGlobalFilter} = useTable({columns,data},useFilters,useGlobalFilter);

  const {globalFilter} = state
  return (
    <div class="table-container ">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
    <table className=" table-auto w-full text-sm text-left rtl:text-right text-black" {...getTableProps()}>
  <thead className="text-xs text-gray-700 uppercase bg-blue-400">
    {headerGroups.map((headerGroup) => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="checkbox-all-search" className="sr-only">
              checkbox
            </label>
          </div>
        </th>
        {/* // if (column.Header == "ASSIGNED TO")  */}
        {headerGroup.headers.map((column) => (
           <th className="px-6 py-3" {...column.getHeaderProps()}>
            {column.render('Header')}
            <div>{column.canFilter ? column.render('Filter'):null}</div>
          </th>) 
)}
      </tr>
    ))}
  </thead>
  <tbody {...getTableBodyProps()}>
    {rows.map((row) => {
      prepareRow(row);
      return (
        <tr {...row.getRowProps()}>
          <>
            <td className="w-4 p-4 border-b border-r">
              <div className="flex items-center">
                <input
                  id={`checkbox-table-search-${row.id}`}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor={`checkbox-table-search-${row.id}`} className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            {row.cells.map((cell, index) => (
              <td className="w-80 px-3 py-6 " {...cell.getCellProps()} key={index}>
                {cell.render("Cell")}
              </td>
    ))}
          </>
        </tr>
      );
    }
   )}
  </tbody>
  <tfoot>
    {footerGroups.map(footerGroup =>(
        <tr {...footerGroup.getFooterGroupProps()}>
            {
                footerGroup.headers.map(column =>(
                    <td {...column.getFooterGroupProps}>
                        {
                            column.render('Footer')
                        }
                    </td>
                ))
            }
        </tr>
    ))}
  </tfoot>
</table>;

</div>
  )
}
