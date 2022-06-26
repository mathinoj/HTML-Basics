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
