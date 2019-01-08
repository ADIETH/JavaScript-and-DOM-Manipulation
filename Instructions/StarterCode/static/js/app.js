// from data.js
var tableData = data;

// YOUR CODE HERE!


// Declaring variable to display information from the json data

var date  =  d3.select("#date_time");
var city  =  d3.select("#city");
var state =  d3.select("#state");
var country =  d3.select("#country");
var shape  =  d3.select("#shape");

// Additional variable to create button on webpage tp provide better user experiennce

var ReloadButton  =   d3.select("#load");
var SearchButton  =   d3.select("#search");
var NextButton    =   d3.select("#next");
var PreviousButton    =   d3.select("#prev");
var pageNum = 0;



// create function and renderTable  from json  tableData to the tbody and limit the number of record display per page to 20 by using slice

function renderTable() {

    var AlienData = tableData.slice(pageNum*20, 20+(pageNum*20));

    d3.select("tbody")
    .html("")
    .selectAll('tr')
    .data(AlienData)
    .enter()
    .append("tr")
    .html(function(d){
      return `<td>${d.datetime}</td><td>${d.city}</td><td>${d.state}</td><td>${d.country}</td><td>${d.shape}</td><td>${d.durationMinutes}</td><td>${d.comments}</td>`
    });

  };


// create function for Click search button for all searchable item

SearchButton.on("click", function searchBtn() {

    var SearchDate =  date.property("value");
    var SearchCity =  city.property("value");
    var SearchState = state.property("value");
    var SearchCountry = country.property("value");
    var SearchShape  = shape.property("value");


    // Assign filter to array to filter all dates matches with searched date

    if (SearchDate != "") {
        tableData = tableData.filter(function (date) {
        var dataDate = date.datetime;
        console.log(SearchDate)

        // If searched date exist in the data table return data, otherwise don't add it to searchdate
        return dataDate === SearchDate;
    });

    }

    // create function and Assign filter to array to filter all city  from data table that matches with searched city

    if (SearchCity != "") {
        tableData = tableData.filter(function (city) {
        var dataCity = city.city;
        console.log(SearchCity)

        // If searched city found from the data table add the city record to the SearchCity, otherwise don't add it to SearchCity
        return dataCity === SearchCity;
    });
    }

    // create function and Assign filter to Array to filter all state from data table that matches with searched state, otherwise don't add it 

    if (SearchState != "") {
        tableData = tableData.filter(function (state) {
            var dataState = state.state;
            console.log(SearchState)

            return dataState === SearchState;
        });
    }

    // create function and Assign filter to Array to filter all country from data table that matches with searched state, otherwise don't add it 
    // however in our given data only country the data collected is US

    if (SearchCountry != "") {
        tableData = tableData.filter(function (country) {
            var dataCountry = country.country;
            console.log(SearchCountry)

            return dataCountry === SearchCountry;
        });
    }

    // create function and Assign filter to Array to filter all shapes from data table that matches with searched shape, otherwise don't add it 

    if (SearchShape != "") {
        tableData = tableData.filter(function (shape) {
            var dataShape = shape.shape;
            console.log(SearchShape)

            return dataShape === SearchShape;
        });
    }


      // Create function fo the next click  button 
NextButton.on("click", function clickNext() {
    pageNum++;
    if (pageNum >= (tableData.length/20)){pageNum = pageNum-1;};
    renderTable();
});

// Click function fot Previous click button
PreviousButton.on("click", function clickPrev() {
    pageNum--;
    if (pageNum < 0){pageNum = 0;};
    renderTable();
});

    renderTable();
});


// Create function for reload button to set to the defaul after searching by filterd request
ReloadButton.on("click", function reloadBtn() {

    tableData = data;
    date.property("value", '');
    city.property("value", '');
    state.property("value", '');
    country.property("value", '');
    shape.property('value', '');

    renderTable();
});


// Render the table for the first time on page load
renderTable();
