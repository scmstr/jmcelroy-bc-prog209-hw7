var express = require('express');
var path = require('path');

//leaving in the bodyParser in case we ever send up form data and need to get data out of form
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.dataArray = [
    {
        firstName: "Donald",
        lastName: "Trump",
        age: '73'
    },
    {
        firstName: "Tom",
        lastName: "Steyer",
        age: '62'
    },

    {
        firstName: "Bernie",
        lastName: "Sanders",
        age: '78'
    },

    {
        firstName: "Elizabeth",
        lastName: "Warren",
        age: '70'
    },

    {
        firstName: "Joe",
        lastName: "Biden",
        age: '77'
    },

    {
        firstName: "Amy",
        lastName: "Klobuchar",
        age: '59'
    },

    {
        firstName: "Pete",
        lastName: "Buttigieg",
        age: '38'
    },

    {
        firstName: "Michael",
        lastName: "Bloomburg",
        age: '78'
    },

    {
        firstName: "Andrew",
        lastName: "Yang",
        age: '45'
    }
];


// use res.render to load up an ejs view file
// index
app.get('/', function(req, res) {
    res.render('pages/index');
});

// AddPerson 
// sending a get with 1 param
// http://localhost:3000/uploadData?id=2&date=1941
app.get('/AddPerson', function(req, res) {
    let firstName = req.param('firstName');
    let lastName = req.param('lastName');
    let age = req.param('age');
    if(firstName != null){
        let aPerson = {
            firstName: firstName,
            lastName: lastName,
            age: age
        }
    app.dataArray.push(aPerson);
    }
    res.render('pages/AddPerson', { 
        dataArray: app.dataArray
    });
});

// PeopleByALL
app.get('/PeopleByALL', function(req, res) {
    app.duplicateArray = 0;
    app.duplicateArray = JSON.parse(JSON.stringify(app.dataArray));
    app.duplicateArray.sort(dynamicSort("firstName"));
    res.render('pages/PeopleByALL', { 
        dataArray: app.duplicateArray
    });

});

// PeopleByAge 
app.get('/PeopleByAge', function(req, res) {
    app.duplicateArray = 0;
    app.duplicateArray = JSON.parse(JSON.stringify(app.dataArray));
    app.duplicateArray.sort(dynamicSort("age"));
    res.render('pages/PeopleByAge', { 
        dataArray: app.duplicateArray
    });
});





function dynamicSort(property) {

    /*
    https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
    Function to sort alphabetically an array of objects by some specific key.
    @param {String} property Key of the object to sort.
    */

    var sortOrder = 1;
    if(property[0] === "-") 
    {
        sortOrder = -1;
        property = property.substr(1);
    }

    // return function (a,b) {
    //     if(sortOrder == -1)
    //     {
    //         return b[property].localeCompare(a[property]);
    //     }
    //     else
    //     {
    //         return a[property].localeCompare(b[property]);
    //     }        
    // }

    return function (a,b){
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      }
}

module.exports = app;
