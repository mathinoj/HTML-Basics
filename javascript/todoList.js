// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //DON'T CHANGE THIS LINE PLEASE!
// for (itself of numbers) {
//     console.log(itself * itself);
// } EXERCISE ANSWER

//TIP 1 - needs a while loop
//TIP 2 - do the quit first
//TIP 3 - store todoz in an array (todos = [] maybe with ('')
//TIP 4 - add to list (look at the one that adds to end)
//TIP 5 - remove from list should use SPLICE
//TIP 6 - conditional will be used inside loop
//TIP 7 - make sure each todo is assigned INDEX

let commands = ["new", "list", "delete", "quit"];
let todoArray = ["sell", "trade"];

let userInput = prompt("What would you LYK to do?").toLowerCase();
// console.log(userInput);

// while (!commands.includes(userInput) || userInput !== "quit") {
while (userInput !== "quit") {
    if (userInput === "new") {
        let newTodo = prompt("Enter a new ToDo.");
        console.log("LOOKY: " + newTodo);
        let addedTo = todoArray.push(newTodo);
        for (let i = 0; i < todoArray.length; i++);
        console.log(addedTo);
        console.log(todoArray);
    }

    if (userInput === "list") {
        console.log("***************");
        //  prompt("Here is the list in the Console. What else would you like to do?");
        for (let i = 0; i < todoArray.length; i++) {
            console.log(i + " " + todoArray[i]);
        }
        console.log("***************");
        userInput = alert("Here is the list in the Console.");
    } else if (userInput === "delete") {
        console.log("*******Delete********");
        for (let i = 0; i < todoArray.length; i++) {
            console.log(i + "-" + todoArray[i]);
        }
        console.log("*******Delete********");
        let deleteTodo = parseInt(
            prompt(
                "You want to delete. Choose a number from the Console that you want to delete and input it below"
            )
        );
        console.log(deleteTodo);

        // if (deleteTodo !== NaN && deleteTodo === "") {
        // let erease = todoArray.splice(deleteTodo, 1);
        // console.log("erase -- " + erease);
        // alert("things have been deleted");
        // for (let i = 0; i < todoArray.length; i++) {
        //     console.log(i + " " + todoArray[i]);
        // }

        // if (deleteTodo === NaN || deleteTodo !== null) {
        //     let tryDeleteAgain = prompt("Please choose number from console.");
        //     console.log(tryDeleteAgain);
        //     let eraseAgain = todoArray.splice(tryDeleteAgain, 1);
        //     console.log("eraseAgain -- " + eraseAgain);
        //     alert("things have been deleted");
        //     for (let i = 0; i < todoArray.length; i++) {
        //         console.log(i + " " + todoArray[i]);
        //     }
        // } else {

        let erease = todoArray.splice(deleteTodo, 1);
        console.log("erase -- " + erease);
        alert("things have been deleted");
        for (let i = 0; i < todoArray.length; i++) {
            console.log(i + " " + todoArray[i]);
        }
    }
    if (userInput === "quit") {
        userInput = prompt("What would you like to do THIS TIME?");
    }

    if (userInput === "quit") {
        let youSure = confirm("You sure you wanto to exit the ToDo App?");
        // } else if (youSure === false) {
        //     userInput = prompt("What would you like to do?").toLowerCase();
    } else {
        userInput = prompt(
            "What would you like to do IS THIS IT?"
        ).toLowerCase();
    }
}
