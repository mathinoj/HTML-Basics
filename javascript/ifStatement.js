console.log("herro");
if (2 + 4 === 6) {
    console.log("yea it dew");
}
let rando = Math.random();
if (rando < 0.5) {
    console.log("Your number is less than .5");
    console.log(rando);
}

// ELSE IF //

let even = Math.floor(Math.random() * 100) + 1;
// console.log("your num is " + " " + Math.floor(even));

if (even % 2 === 0) {
    console.log("EVEN!! Your number is: " + even + "! This is an even number");
} else {
    console.log(
        "ODD number. Your number is: " + even + "! This is an odd number"
    );
}

// let even = (Math.random() * 100) + 1;
// let rounded = Math.floor(even);
// // console.log("your num is " + " " + Math.floor(even));

// if(rounded % 2 === 0){
//   console.log("EVEN!! Your number is here: " + rounded + ". This is an even number")
//     } else {
//     console.log("ODD number. Your number is here: " + rounded + ". This is an odd number")
//     }

// ELSE IF ELSE
// const age = prompt('Enter age:');
// if (age <= 5){
//   console.log(age + " Free - baby");
// } else if (age <= 10) {
//   console.log(age + " $10 - child");
// } else if (age < 65){
//   console.log(age + " $15 - adult");
// } else {
//   console.log(age + " $10 - senior");
// }

// let pword = prompt('Enter P-Word');
// if(pword.length >= 6 && pword.indexOf(' ') === -1){
//   console.log('Good Pword')
// } else {
//   console.log('Pword invalid')
// }

// We did indexOf(' ') === -1 cuz having no spaces will give us a -1 index. Therefore when we run the indexOf(' ') it searches for a space in the pword. If user input a space then it will not equal to -1, cuz it would be true that they used a space. But if they does not input a space then it WILL equal to -1, which in this case is a good thing cuz we dont want pword to have spaces.

const age = 10000;
if ((age >= 0 && age < 5) || age >= 65) {
    console.log("Free");
} else if (age >= 5 && age < 10) {
    console.log("$10");
} else if (age >= 10 && age < 65) {
    console.log("$20");
} else {
    console.log("Wrong number foo!");
}

// function analyzeColor(color){
// var message;
// if(color === 'blue'){
//   console.log('sky')
// } else if (color === 'red'){
//   console.log('strawberry')
// } else {
//   console.log('No se')
// }
// return message;
// }

// let colorAsk = prompt('enter color');
// if(colorAsk === 'blue'){
//   console.log('sky')
//   alert(colorAsk + ' is color of sky')
// } else if (colorAsk === 'red'){
//   console.log('strawberry')
//   alert(colorAsk + ' is color of scrawberry')
// } else if (colorAsk === 'cyan'){
//   console.log('what?')
//   alert(colorAsk + '? Is that some form of juice?')
// } else {
//   console.log('imma learn that color')
//   alert(colorAsk + '? Imma haveta learn that one. ')
// }

var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
var randomColor = colors[Math.floor(Math.random() * colors.length)];

function randy() {
    if (colors === randomColor);
}
console.log(randomColor);

// let even = (Math.random() * 100) + 1;

let luckyNum = Math.floor(Math.random() * 6) + 0;
console.log(luckyNum);
// function promo(){
if (luckyNum === 0) {
    console.log(luckyNum + " is your number. No discount");
} else if (luckyNum === 1) {
    console.log(luckyNum + " is your number. 10% discount");
} else if (luckyNum === 2) {
    console.log(luckyNum + " is your number. 25% discount");
} else if (luckyNum === 3) {
    console.log(luckyNum + " is your number. 35% discount");
} else if (luckyNum === 4) {
    console.log(luckyNum + " is your number. 50% discount");
} else {
    console.log(luckyNum + " is your number. Errthing is FREE");
}
// }

// function calculateTotal() {
//     let grocery = prompt("How much grocery?");
//     console.log(grocery);
//     let numDisc = prompt("What's lucky num?");
//     console.log(numDisc);

//     if (numDisc === 0) {
//         alert("Sorry no discount. Your total is " + grocery + numDisc);
//     } else if (numDisc === 1) {
//         alert("Your new total is " + (grocery - grocery * 0.1));
//     }
// }
// calculateTotal();

function calculateTool() {
    let numbers = ["0", "1", "2", "3", "4", "5"];
    let randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

    let totalCost = prompt("How much your grocery?");

    if (randomNumber === "0") {
        alert(
            "Your number is: " +
                randomNumber +
                ". Sorry no discount. Your total is still: $" +
                totalCost
        );
    } else if (randomNumber === "1") {
        alert(
            "Your number is: " +
                randomNumber +
                ", which gives you 10% discount. Your total is: $" +
                (totalCost - 0.1 * totalCost) +
                " ."
        );
    } else if (randomNumber === "2") {
        alert(
            "Your number is: " +
                randomNumber +
                ", which gives you 25% discount. Your total is: $" +
                (totalCost - 0.25 * totalCost) +
                " ."
        );
    } else if (randomNumber === "3") {
        alert(
            "Your number is: " +
                randomNumber +
                ", which gives you 35% discount. Your total is: $" +
                (totalCost - 0.35 * totalCost) +
                " ."
        );
    } else if (randomNumber === "4") {
        alert(
            "Your number is: " +
                randomNumber +
                ", which gives you 50% discount. Your total is: $" +
                (totalCost - 0.5 * totalCost) +
                " ."
        );
    } else {
        randomNumber === "5";
        alert(
            "Your number is: " +
                randomNumber +
                ", which gives you 100% discount. Your total is: $" +
                0 +
                " ."
        );
    }

    console.log(randomNumber);
    console.log(totalCost);
}
calculateTool();
