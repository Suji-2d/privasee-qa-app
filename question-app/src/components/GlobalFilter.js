import React from 'react'

export const GlobalFilter = ({filter,setFilter}) => {
  return (
    <>
    <label for="table-search" class="sr-only">Search</label>
    <div class="relative m-4 ">
        <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex  items-center ps-3 pointer-events-none">
            <svg class="w-5 h-5 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input  value={filter||''}  onChange={(e)=>setFilter(e.target.value)} type="text" id="table-search-users" class="block w-80 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search..."/>
    </div>
</>
  )
}
