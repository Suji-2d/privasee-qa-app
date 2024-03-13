const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware
app.use(bodyParser.json());

const port = process.env.PORT || 5121;

const { getRecords,createRecord,getRecordById,updateRecord,updateRecords} = require('./data');

const { getRecordsForSearchWord} = require('./search');

//# Routes
//## Get all records
app.get('/records', async (req, res) => {
    try {
      const records = await getRecords();
      res.json(records);
    } catch (error) {
      console.error('Error fetching records:', error);
      res.status(500).json({ error: 'Error fetching records' });
    }
  });
  
  //## Get a single record based on ID
  app.get('/records/:id', async (req, res) => {
    try {
      const record = await getRecordById(req.params.id);
      res.json(record);
    } catch (error) {
      console.error('Error fetching record by ID:', error);
      res.status(500).json({ error: 'Error fetching record by ID' });
    }
  });

  //## Get top 5 semantically similar records
  app.get('/search-records/:word', async (req, res) => {
    try {
      console.log(req.params.word)
      const records = await getRecordsForSearchWord(req.params.word);
      console.log(records)
      res.json(records);
    } catch (error) {
      console.error('Error fetching record by ID:', error);
      res.status(500).json({ error: 'Error fetching record by ID' });
    }
  });
  
  //## Insert a single record into DB
  app.post('/create-records', async (req, res) => {
    try {
      const createdRecord = await createRecord(req.body);
      res.json(createdRecord);
    } catch (error) {
      console.error('Error creating record:', error);
      res.status(500).json({ error: 'Error creating record' });
    }
  });
  
  //## Update the desired values of single record
  app.put('/update-records/:id', async (req, res) => {
    try {
      const updatedRecord = await updateRecord(req.params.id, req.body);
      res.json(updatedRecord);
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ error: 'Error updating record' });
    }
  });

  //## Update multiple records
  app.put('/update-records', async (req, res) => {
    try {
      const updatedRecord = await updateRecords(req.body);
      res.json(updatedRecord);
    } catch (error) {
      console.error('Error updating record:', error);
      res.status(500).json({ error: 'Error updating record' });
    }
  });


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});