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
    var selectedRoast = roastSelection.value;
    console.log(selectedRoast);
    // let allCoffee = allThem.value;
    // console.log(allCoffee);
    var filteredCoffees = [];
    coffees.forEach(function (coffee) {
        if (coffee.roast === selectedRoast) {
            filteredCoffees.push(coffee);
        } else if (selectedRoast === "All") {
            filteredCoffees.push(coffee);
        }
    });
    tbody.innerHTML = renderCoffees(filteredCoffees); //
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var rev = [
    { id: 1, name: "Light City", roast: "Light" },
    { id: 2, name: "Half City", roast: "Light" },
    { id: 3, name: "Cinnamon", roast: "Light" },
    { id: 4, name: "City", roast: "Medium" },
    { id: 5, name: "American", roast: "Medium" },
    { id: 6, name: "Breakfast", roast: "Medium" },
    { id: 7, name: "High", roast: "Dark" },
    { id: 8, name: "Continental", roast: "Dark" },
    { id: 9, name: "New Orleans", roast: "Dark" },
    { id: 10, name: "European", roast: "Dark" },
    { id: 11, name: "Espresso", roast: "Dark" },
    { id: 12, name: "Viennese", roast: "Dark" },
    { id: 13, name: "Italian", roast: "Dark" },
    { id: 14, name: "French", roast: "Dark" },
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
