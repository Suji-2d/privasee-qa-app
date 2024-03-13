import { useState, useEffect } from "react";
import axios from 'axios';
import { Table } from "./components/Table";
import { FuzzySearch } from './components/FuzzySearch';
import { FilteringTable } from "./components/FilteringTable";


var retriveRecordAPI = "http://localhost:5121/records";
export default function App() {

const [idMap,SetIdMap] = useState([]);
const [records, setRecords] = useState([]);

 

const minifyRecord = (record)=>{
  return{
    id:record.id,
    fields:record.fields
}
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API call
        const response = await axios.get(retriveRecordAPI);
        // Extract the data from the response
        const fetchedRecords = response.data;
        // Set the data to the state
        fetchedRecords.forEach(record => {
          setRecords(prevRecords => [...prevRecords, record.fields]);
          SetIdMap(prevIdMap => [...prevIdMap, {id:record.id,_recordId: record.fields?._recordId}]);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, []);

  //initiating table
  console.log('records',records);
  console.log('IdMap',idMap);

  return (
    <>
     
    <h1 class="text-5xl font-extrabold">Privasee<small class="ms-2 font-semibold text-gray-500 ">Question Records</small></h1>
    <FuzzySearch idMap={idMap} records={records} setRecords={setRecords} SetIdMap={SetIdMap}/>
    <Table idMap={idMap} records={records}/>
    {/* <FilteringTable idMap={idMap} records={records}/> */}
    </>
  );
}