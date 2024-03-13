import React from 'react'
import { useState } from 'react';
import axios, * as others from 'axios';
const updateRecordsAPI = 'http://localhost:5121/update-records';

export const AssignModel = ({closeAssignModel,idMap,selectedFlatRows}) => {
    const [asigneeState, setAsigneeState] = useState(null);
    const [displayConfirmation,setDisplayConfirmation] = useState(false);

    const minifyData = (data)=>{
        return({
            id:data.id,
            fields:{ "Assigned To": asigneeState }
        })
    };
const handlePostRequest = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };


      const data = selectedFlatRows.map((row) => {
        // Find the corresponding id based on _recordId
        const matchingId = idMap.find(item => item._recordId === row.original._recordId);
        console.log(matchingId);
        // Return the id if found, or null if not found
        return matchingId ? minifyData(matchingId) : null;
      });
  

      console.log(data);
  
      const response = await axios.put(updateRecordsAPI, data,{headers});
  
      // Check if the record was successfully created
      if (response.status === 200 || response.status === 201) {
        // Record created successfully
        setDisplayConfirmation(true);
        console.log(response);
      } else {
        console.error('Failed to create record:', response.statusText);
      }
    } catch (error) {
      // Handle errors
      console.error('Error:', error.message);
    }
  };

    const handleChange = (e)=>{
        setAsigneeState(e.target.value);
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        handlePostRequest();
        setAsigneeState(null);;
    };
  return (
<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
  {/* Dark overlay */}
  <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" onClick={()=>{closeAssignModel(); setDisplayConfirmation(false);}}></div>

  {/* Modal */}
  <div className="relative z-10 bg-white rounded-lg p-6 w-96">
    <form className="max-w-sm mx-auto">
      
<div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Assignee Email</label>
    <input type="email" name='assigneeEmail' onChange={handleChange} value={asigneeState} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" />
  </div>

      <div className="flex justify-end mt-5">
        <button
          type="submit"
          className="text-white bg-blue-400 hover:bg-blue-500 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <button
          type="button"
          className="text-black bg-gray-200 hover:bg-gray-400 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          onClick={()=>{closeAssignModel(); setDisplayConfirmation(false);}}
        >
          Cancel
        </button>
      </div>
      {displayConfirmation? <p id="helper-text-explanation" class="mt-2 text-sm text-green-500">The question is added.</p>:<></>}

    </form>
  </div>
</div>

  
  
  )
}
