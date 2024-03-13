import React from 'react'
import { useState } from 'react';
import axios, * as others from 'axios';

const { v4: uuidv4 } = require('uuid');

const createRecordAPI = 'http://localhost:5121/create-records';
const updateRecordAPI = 'http://localhost:5121/update-records';

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

export const Model = ({closeModel,currentRecord,isCreate}) => {

    const [record,setRecord] = useState(uuidv4());
    const [formState, setFormState] = useState(currentRecord? {
      id:currentRecord.id,
      question:currentRecord.question,
      answer:currentRecord.answer,
      assigneeEmail:currentRecord.assigneeEmail,
      tags:currentRecord.tags,
  }:{
        question:"",
        answer:"",
        assigneeEmail:"",
        tags:"",
    });

const handlePostRequest = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };
  
      const data = isCreate?{
          "_recordId": record,
          "Company Name": "Test kannan Limited",
          "Question": formState.question,
          "Answer": formState.answer,
          "Updated By": "founders+alex@privasee.io",
          "Created By": "founders+alex@privasee.io",
          "Assigned To": formState.assigneeEmail,
          "Properties": formState.tags
      }:{
        id:formState.id,
          fields:{
          "Question": formState.question,
          "Answer": formState.answer,
          "Assigned To": formState.assigneeEmail,
          "Properties": formState.tags
      }
      };

      console.log(data);
      const response = isCreate ? await axios.post(createRecordAPI, data,{headers}):
      await axios.put(`${updateRecordAPI}/${data.id}`, data.fields,{headers});
  
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

    const [displayConfirmation,setDisplayConfirmation] = useState(false);

    const handleChange = (e)=>{
        setFormState( {
        ...formState,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(formState);
        handlePostRequest();
        setFormState({
            question: "",
            answer: "",
            assigneeEmail: "",
            tags: "",
          });
    };
  return (
<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
  {/* Dark overlay */}
  <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50" onClick={()=>{closeModel(); setDisplayConfirmation(false);}}></div>

  {/* Modal */}
  <div className="relative z-10 bg-white rounded-lg p-6 w-96">
    <form className="max-w-sm mx-auto">
      {/* ... (Your form content) */}
      <div class="mb-5">
      <label htmlFor="question" className="block my-2 text-sm font-medium text-gray-900 text-black">
        Question
      </label>
      <textarea
  id="question"
  name="question"  
  rows="4"
  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
  placeholder="Enter the question..."
  value={formState.question}
  required
  onChange={handleChange}
></textarea>
</div>
<div class="mb-5">
    <label htmlFor="answer" className="block my-2 text-sm font-medium text-gray-900 text-black">
        Answer
      </label>
      <textarea
        id="answer"
        name="answer"  
        rows="4"
        className="block p-2.5  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Enter the answer..."
        value={formState.answer}
        onChange={handleChange}
      ></textarea>
</div>
<div class="mb-5">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Assignee Email</label>
    <input type="email" name='assigneeEmail' onChange={handleChange} value={formState.assigneeEmail} id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@flowbite.com" />
  </div>
  <div class="mb-5">
    <label for="tag" class="block mb-2 text-sm font-medium text-gray-900">Tags</label>
    <input type="text" name='tags' onChange={handleChange} value={formState.tags} id="tag" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Key1:Value1, Key2:Value2... " />
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
          onClick={()=>{closeModel(); setDisplayConfirmation(false);}}
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
