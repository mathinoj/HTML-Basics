"use strict";

function renderCoffee(coffee) {
    var html = '<div class="coffee">';
    html += "<div hidden>" + coffee.id + "</div>";
    html += "<h2>" + coffee.name + "</h2>";
    html += "<p>" + coffee.roast + "</p>";
    html += "</div>";

    return html;
}

function renderCoffees(coffees) {
    var html = "";
    for (var i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data
    var selectedRoast = roastSelection.value; //disregard
    var filteredCoffees = []; //THIS var filterSrch
    coffees.forEach(function (coffee) {
        //THIS change func Name
        if (coffee.roast === selectedRoast) {
            //coffees[i] === lowCoff
            filteredCoffees.push(coffee); // filterSrch.push(coffee)
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees); // renderCoffees(filtereSrch)
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var rev = [
    { id: 1, name: "Light City", roast: "light" },
    { id: 2, name: "Half City", roast: "light" },
    { id: 3, name: "Cinnamon", roast: "light" },
    { id: 4, name: "City", roast: "medium" },
    { id: 5, name: "American", roast: "medium" },
    { id: 6, name: "Breakfast", roast: "medium" },
    { id: 7, name: "High", roast: "dark" },
    { id: 8, name: "Continental", roast: "dark" },
    { id: 9, name: "New Orleans", roast: "dark" },
    { id: 10, name: "European", roast: "dark" },
    { id: 11, name: "Espresso", roast: "dark" },
    { id: 12, name: "Viennese", roast: "dark" },
    { id: 13, name: "Italian", roast: "dark" },
    { id: 14, name: "French", roast: "dark" },
];

var coffees = rev.reverse();

var tbody = document.querySelector("#coffees");
var submitButton = document.querySelector("#submit");
var roastSelection = document.querySelector("#roast-selection");

tbody.innerHTML = renderCoffees(coffees);

submitButton.addEventListener("click", updateCoffees);

//SEARCH FUNCTION********************************

// var submitCoff = document.querySelector("#coffSearch");
// submitCoff.addEventListener(onkeyup, updateCoffees);

function userSearch() {
    let searchCoff = document.getElementById("userInput").value;
    console.log(searchCoff);
    let filterSrch = [];

    for (let i = 0; i < coffees.length; i++) {
        let lowCoff = coffees[i].name.toLowerCase();
        if (
            lowCoff.includes(searchCoff.toLowerCase()) ||
            lowCoff.includes(searchCoff.toUpperCase()) ||
            lowCoff.includes(searchCoff)
        ) {
            filterSrch.push(coffees[i]); // filterSrch.push(coffee)
            console.log(coffees[i]);
        }
        tbody.innerHTML = renderCoffees(filterSrch);
    }
}
