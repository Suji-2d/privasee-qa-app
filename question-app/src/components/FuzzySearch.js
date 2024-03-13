import React, { useState } from 'react'
import axios from 'axios';
export const FuzzySearch = ({setRecords,SetIdMap}) => {
  const [searchWord, setSearchWord ] = useState("");

  var retriveRecordAPI = "http://localhost:5121/search-records";

  const headers = {
    'Content-Type': 'application/json'
  };

  const handleSubmit = async (e) =>{
    try {

      console.log(searchWord);
      const response = await axios.get(`${retriveRecordAPI}/${searchWord}`);
      // Extract the data from the response
      const fetchedRecords = response.data;
      console.log(fetchedRecords);
      // Set the data to the state
      setRecords([]);
      SetIdMap([]);
      fetchedRecords.forEach(record => {
        if(record){
        setRecords(prevRecords => [...prevRecords, record.fields]);
        SetIdMap(prevIdMap => [...prevIdMap, {id:record.id,_recordId: record.fields?._recordId}]);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const handleChange = (e)=>{
    setSearchWord(e.target.value);
};

  return (
    <div className='relative inline-flex space-x-4 mx-6 mt-6 '>
    <form class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" 
        id="default-search" 
        class="block w-80 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " 
        placeholder="Enter a keyword or phrase..." 
        onChange={handleChange}
        required />
        <button type="submit" onClick={handleSubmit} class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 ">
          Search
          </button>
    </div>
</form>
</div>
  )
}
