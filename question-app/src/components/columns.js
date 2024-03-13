import { ColumnFilter } from "./ColumnFilter";
import moment from 'moment';

function parseDate(inputDate) {
    // Parse the input date
    const parsedDate = moment(inputDate);

    // Format the date as per the desired output
    const formattedDate = parsedDate.format('MMM DD YYYY, h:mma');

    return formattedDate;
}

export const COLUMNS = [
   
    {
        Header:'Company Name',
        accessor:'Company Name',
        Filter:ColumnFilter,
        disableFilters: true, 
    },
    {
        Header:'Question',
        accessor:'Question',
        Filter:ColumnFilter,
        disableFilters: true, 
    },
    {
        Header:'Answer',
        accessor:'Answer',
        Filter:ColumnFilter,
        disableFilters: true, 
    },
    {
        Header:'Assigned To',
        accessor:'Assigned To',
        Filter:ColumnFilter,
       
    },
    {
        Header:'Created By',
        accessor:'Created By',
        Filter:ColumnFilter,
        disableFilters: true, 
    },
    {
        Header:'Created At',
        accessor:'Created At',
        Filter:ColumnFilter,
        disableFilters: true, 
        Cell: ({value})=> {return parseDate(value)}
    },
    {
        Header:'Updated By',
        accessor:'Updated By',
        Filter:ColumnFilter,
        disableFilters: true, 
    },
    {
        Header:'Updated At',
        accessor:'Updated At',
        Filter:ColumnFilter,
        disableFilters: true, 
        Cell: ({value})=> {return parseDate(value)}
    },
    {
        Header:'Properties',
        accessor:'Properties',
        Filter:ColumnFilter,
        
    },
    {
        Header:'RecordId',
        accessor:'_recordId',
        Filter:ColumnFilter,
        disableFilters: true, 
    }
];