// for (let x = 1; x <= 30; x += 2) {
//     console.log(x);
// }

// for (let i = 100; i >= 0; i -= 2) {
//     console.log(i);
// }

// for (let i = 1; i <= 100; i *= 2) {
//     console.log(i);
// }

// for (let a = 1; a <= 10000; a *= 10) {
//     console.log(a);
// }

// for (let i = 25; i >= 0; i -= 5) {
//     console.log(i);
// }

const people = ["Scooby", "Velma", "Daphne", "Shaggy", "Fred"]; //DONT TOUCH THIS LINE!

// WRITE YOUR LOOP BELOW THIS LINE:
for (let i = 0; i < people.length; i++) {
    console.log(people[i].toUpperCase());
}

const letters = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
];

for (let i = 0; i < letters.length; i++) {
    const row = letters[i];
    console.log(`Row # ${i + 1}`);
    for (let j = 0; j < row.length; j++) {
        console.log(row[j]);
    }
}

// const secret = "code";
// let guess = prompt("Enter the secret code: ");
// while (guess !== secret) {
//     guess = prompt("Wrong, keep guessing.");
// }
// console.log("You got it correctly");
// alert("You got it correctly!");

// for (let i = 1; i < 10; i *= 2) {
//     console.log(i);
// }

for (let i = 1; i < 10; i++) {
    let num = i.toString(); // Converts var i (number) into string
    // console.log(num);
    console.log(num.repeat(i)); // Repeats string by var i and concatenates them together
}

// function showMultiplicationTable(num) {
//     for (var i = 1; i <= 10; i++) {
//         console.log(`${i} x ${num} = ${i * num}`);
//     }
// }
// showMultiplicationTable();

//Use a for loop and the code from the previous lessons to generate 10 random numbers between 20 and 200 and output to the console whether each number is odd or even. For example:

// 123 is odd
// 80 is even
// 24 is even
// 199 is odd

// for (let i = 1; i <= 10; i++) {
//     let rando = Math.floor(Math.random() * 180) + 20;
//     // console.log(rando);
//     if (rando % 2 === 0) {
//         console.log(`${rando} = even`);
//     } else {
//         console.log(`${rando} = odd`);
//     }
// }

// for (let i = 100; i > 0; i -= 5) {
//     console.log(i);
// }

// Prompt the user for an odd number between 1 and 50. Use a loop and a break statement to continue prompting the user if they enter invalid input.
// Use a loop and the continue statement to output all the odd numbers between 1 and 50, except for the number the user entered.

// var askNum = parseInt(prompt("Input odd number between 1-50"));
// while (askNum % 2 === 0) {
//     askNum = parseInt(prompt(`You typed: ${askNum}. Please enter Odd number`));
// }

// let userEnter = askNum;

// console.log(`Number to skip is: ${userEnter}`);

// for (var i = 1; i < 50; i += 2) {
//     if (userEnter === i) {
//         console.log(`Yikes! Skipping number: ${userEnter}`);
//     } else {
//         console.log(`Here is an odd number: ${i}`);
//     }
// }

// for (let i = 2; i <= 65536; i *= 2) {
//     console.log(i);
// }
