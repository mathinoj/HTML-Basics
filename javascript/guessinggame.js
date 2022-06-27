let enterMax = parseInt(prompt("Enter a maximum number."));
console.log("1: " + enterMax);
while (!enterMax || enterMax < 0) {
    enterMax = parseInt(
        prompt("That's not a valid number. Enter a maximum number.")
    );
    console.log("22: " + enterMax);
}

let userEnter = enterMax;
console.log("userEnter = " + userEnter);
let randomNum = Math.floor(Math.random() * userEnter) + 1;
console.log("randomNum = " + randomNum);
let guessNow = prompt(
    userEnter +
        " is the number you entered. Guess a number between 1 and " +
        userEnter +
        "."
);
// let q = randomNum;
let attempts = 1;
while (parseInt(guessNow) !== randomNum) {
    if (guessNow === "q") break;
    attempts++;
    if (guessNow > randomNum) {
        guessNow = prompt("Nums too high! Enter new guess.");
    } else if (guessNow < randomNum) {
        guessNow = prompt("Nums too low. Guess again.");
    } else {
        guessNow = prompt(
            "Your guess is: " +
                guessNow +
                ". This is an invalid value. Guess again!"
        );
    }
}
if (guessNow === "q") {
    alert("You quitter.");
} else {
    alert("You guessed rite. Your number of attempts is: " + attempts + ".");
}

// ENTER MAX NUMVER
// RANDO NUM IS GENERATED BASED OFF USER Input
// USER GUESSES THIS NUM
// IF TOO HI THEY ARE PROMPTED TO GUESS AGAIN
// IF TOO LOW THEY ARE PROMPTED TO GUESS AGAIN
// USER CAN ALSO TYPE Q TO QUIT
