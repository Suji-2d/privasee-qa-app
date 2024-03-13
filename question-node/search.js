const natural = require('natural');
const TfIdf = natural.TfIdf;

// Create a TF-IDF instance
const tfidf = new TfIdf();
const { getRecords} = require('./data');

function getRecordsForSearchWord(searchWord) {
    return new Promise((resolve, reject) => {
        let results = [];
        let output = [];

        getRecords().then((records) => {
            records.forEach(record => {
                tfidf.addDocument(record.fields.Question.concat(record.fields.Answer));
            });

            tfidf.tfidfs(searchWord, function(i, measure) {
                    results.push([i, measure]);
            });

            results = sortByMeasure(results);

             console.log(results)
            results.slice(0,6).forEach((result,i) => {
                if(records[result[0]])
                output.push(records[result[0]])
                //console.log(records[result[0]].fields.Questions);
            });

            resolve(output);
        }).catch(err => {
            reject(err);
        });
    });
}


function sortByMeasure(results) {
    // Sort the results array based on the measure value
    results.sort(function(a, b) {
        // Assuming measure is the second element in each inner array
        return  b[1]-a[1];
    });
    return results;
}

// getRecordsForSearchWord('customer data ever stored').then((output) => {
//     console.log(output); // Output will contain records related to the search word
// }).catch(err => {
//     console.error(err);
// });

module.exports = {
    getRecordsForSearchWord}