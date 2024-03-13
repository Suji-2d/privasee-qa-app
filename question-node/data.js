
require('dotenv').config(); 
const airtableApiKey = process.env.API_KEY;
var Airtable = require('airtable');
var base = new Airtable({apiKey: airtableApiKey}).base('appj92cNtMJZ2qxlH');

const { v4: uuidv4 } = require('uuid');

const table =  base('Questions');

const getRecords = async () => {
    try {
        let allRecords = [];

        await table.select().eachPage((records, fetchNextPage) => {
            const minifiedRecords = records.map(minifyRecord);
            allRecords = [...allRecords, ...minifiedRecords];
            fetchNextPage();
        });

        return allRecords;
    } catch (error) {
        console.error('Error fetching records:', error);
        throw error;
    }
};


  const getRecordById = async (id) => {
    try {
      const record = await table.find(id);
      return minifyRecord(record);
    } catch (error) {
      console.error('Error fetching record by ID:', error);
    }
  };
  

    const createRecord = async (field) => {
        try {
          const createdRecord = await table.create(field);
          return minifyRecord(createdRecord);
        } catch (error) {
          console.error('Error fetching record by ID:', error);
        }
      };

      const updateRecord = async (id,fields) =>{
        try {
            const updateRecord = await table.update(id,fields);
            return minifyRecord(updateRecord);
          } catch (error) {
            console.error('Error fetching record by ID:', error);
          }
        
      }
      const updateRecords = async (records) =>{
        try {
            const updateRecords = await table.update(records);
            return updateRecords.map(minifyRecord);
          } catch (error) {
            console.error('Error fetching record by ID:', error);
          }
        
      }
    const minifyRecord = (record) =>{
        return{
            id:record.id,
            fields:record.fields
        }
    };

    module.exports = {
        getRecords,
        createRecord,
        getRecordById,
        updateRecord,
        updateRecords
      };