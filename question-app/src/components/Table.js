import * as React from 'react';
import { useState, useMemo } from "react";
import {useTable, useGlobalFilter,useFilters,usePagination,useRowSelect} from 'react-table';
import { GlobalFilter } from './GlobalFilter';
import { CheckBox } from './CheckBox';
import { AssignButton } from "./AssignButton";
import {AssignModel} from "./AssignModel"
import { Model } from "./Model";
import { COLUMNS } from "./columns";

export const Table = ({idMap,records}) => {
    const [assignModelOpen, setAssignModelOpen] = useState(false);
    const [modelOpen, setModelOpen] = useState(false);
    const [recordVal,setRecordVal] = useState(null);
    const [isCreate,setIsCreate] = useState(false);

    const data = React.useMemo(()=>records,[records]);
    const columns = React.useMemo(()=>COLUMNS,[records]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        prepareRow,
        state,
        setGlobalFilter,
        selectedFlatRows
    } = useTable(
        {
            columns,
            data
        },
        useFilters,
        useGlobalFilter,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <CheckBox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <CheckBox {...row.getToggleRowSelectedProps()} /> // Corrected function call
                        ),
                    },
                    ...columns
                ]
            })
        }
    );
  const {pageIndex} = state;
  const {globalFilter} = state;

  const getId = (recordId)=>{
    const matchingId = idMap.find(item => item._recordId === recordId);
    console.log(matchingId);
    // Return the id if found, or null if not found
    return matchingId ? matchingId.id : null;
  }
  
  const updateRecordVal = (row) => {

    row.cells.forEach((cell, index) => {
        switch (index) {
            case 2:
                setRecordVal(prevState => ({
                    ...prevState,
                    question: cell.value
                }));
                break;
            case 3:
                setRecordVal(prevState => ({
                    ...prevState,
                    answer: cell.value
                }));
                break;
            case 4:
                setRecordVal(prevState => ({
                    ...prevState,
                    assigneeEmail: cell.value
                }));
                break;
            case 9:
                setRecordVal(prevState => ({
                    ...prevState,
                    tags: cell.value
                }));
                break;
            case 10:
                setRecordVal(prevState => ({
                    ...prevState,
                    id: getId(cell.value)
                }));
                break;
            default:
                break;
        }
    });

  };
  return (
    <>

        {
        modelOpen && <Model 
        closeModel = {()=> {setModelOpen(false)}} 
        currentRecord = {recordVal} 
        isCreate={isCreate}
        records={records}/>
        }
        <div className="w-full">
        <div className='relative w-full inline-flex items-center space-x-4 m-2'>
        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
        <AssignButton onAssignClick={()=>{setAssignModelOpen(!assignModelOpen)}}/>
        <button
        type="button"
        onClick={() => {
          setIsCreate(true);
          setModelOpen(!modelOpen);
        }}
        className="text-black bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16">
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
        </svg>
        <p className='p-2'>Add Question</p>
        </button>
        </div>
        {
        assignModelOpen && <AssignModel 
        closeAssignModel = {()=> {
            setAssignModelOpen(false)
            }} 
            idMap={idMap} 
            selectedFlatRows={selectedFlatRows
            }/>
        }
        <table className="relative object-scale-down text-sm text-left rtl:text-right text-black" {...getTableProps()}>
            <thead className="text-xs text-gray-700 uppercase bg-blue-400">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                     column.Header !== 'RecordId' && (<th className="px-6 py-3" {...column.getHeaderProps()}>
                      {column.render('Header')}
                      <div>{column.canFilter ? column.render('Filter'):null}</div>
                    </th>))
                    )}
                    <th className="px-6 py-3">
                        ACTION
                    </th>
                </tr>
                ))}
            </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              <>
                {row.cells.map((cell, index) => (
                  index !== 10 && (<td className="px-3 py-6 border-b-2" {...cell.getCellProps()} key={index}>
                    {cell.render("Cell")}
                  </td>)
                ))}
                <td class="px-3 py-6 border-b-2" >
                    <a type="button" onClick={()=>{
                        setIsCreate(false);
                        console.log(row.cells);
                        updateRecordVal(row);
                        setModelOpen(!modelOpen);
                    }}class="font-medium text-blue-600 hover:underline">Edit</a>
                </td>
              </>
            </tr>
          );
        }
       )}
      </tbody>
      
    </table>
    <div className='relative inline-block text-left m-4 '>
      <button type="button" disabled={!canPreviousPage} onClick= {()=>{previousPage()}} class="text-black bg-gray-200 hover:bg-gray-300  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2">
      <svg class='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"/>
    </svg>    <p class='p-2'> Back</p>
      </button>
      <span class='m-4'>
       Page{' '} <strong>{pageIndex+1} of {pageOptions.length}</strong>{' '}
    </span>
      <button disabled={!canNextPage}  onClick= {()=>{nextPage()}} type="button" class="text-black bg-gray-200 hover:bg-gray-300 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
      <p class='p-2'>Next</p>
      <svg  class='w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <path d="M334.5 414c8.8 3.8 19 2 26-4.6l144-136c4.8-4.5 7.5-10.8 7.5-17.4s-2.7-12.9-7.5-17.4l-144-136c-7-6.6-17.2-8.4-26-4.6s-14.5 12.5-14.5 22l0 72L32 192c-17.7 0-32 14.3-32 32l0 64c0 17.7 14.3 32 32 32l288 0 0 72c0 9.6 5.7 18.2 14.5 22z"/>
    </svg></button>
    </div>
    </div>
  </>
  )
};
