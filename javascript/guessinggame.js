let enterMax = parseInt(prompt("Enter a maximum number."));
while (!enterMax) {
    enterMax = parseInt(prompt("Enter a maximum number."));
}
let userEnter = enterMax;
console.log("userEnter = " + userEnter);
let randomNum = Math.floor(Math.random() * userEnter) + 1;
console.log("randomNum = " + randomNum);
let guessNow = parseInt(
    prompt(
        userEnter +
            " is the number you entered. Guess a number between 1 and " +
            userEnter +
            "."
    )
);
// let q = randomNum;
let attempts = 1;
while (parseInt(guessNow) !== randomNum) {
    if (guessNow === "q") break;
    attempts++;
    if (guessNow > randomNum) {
        guessNow = prompt("Nums too high! Enter new guess.");
    } else {
        guessNow = prompt("Nums too low. Guess again.");
    }
}
if (guessNow === "q") {
    alert("You quitter.");
} else {
    alert("You guessed rite. It took you " + attempts + " attempt(s).");
}
// } else {
//   guessNow === "q";
//   {
//       break;
//   }

// console.log("guessNow = " + guessNow);
// if (guessNow === randomNum) {
//     alert("You guessed right");
// }

// let input = prompt("Say sumthin");
// while (true) {
//     input = prompt(input);
//     if (input.toLowerCase() === "stop copying me") {
//         break;
//     }
// }
// console.log("You win, ok!");
// alert("You win ok!");

// ENTER MAX NUMVER
// RANDO NUM IS GENERATED BASED OFF USER Input
// USER GUESSES THIS NUM
// IF TOO HI THEY ARE PROMPTED TO GUESS AGAIN
// IF TOO LOW THEY ARE PROMPTED TO GUESS AGAIN
// USER CAN ALSO TYPE Q TO QUIT
