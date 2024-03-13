import React from 'react'

export const ColumnFilter = ({column}) => {
    const {filterValue,setFilter } = column;
    return (
        <div class="relative m-2 min-w-28 max-w-36">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex  items-center px-2 pointer-events-none">
            <svg class ='w-3 h-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z"/>
            </svg>
            </div>
            <input  value={filterValue||''}  onChange={(e)=>setFilter(e.target.value)} type="text" id="table-search-users" class="block p-2 ps-8 w-full text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..."/>
        </div>
      )
}
