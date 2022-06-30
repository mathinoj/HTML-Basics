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

let todoArray = ["sell", "trade"];

let userInput = prompt("What would you like to do?").toLowerCase();
console.log(userInput);
if (userInput === "quit") {
    let youSure = confirm("You sure you wanto to exit the ToDo App?");
    console.log(youSure);

    if (youSure === false) {
        userInput = prompt("What would you like to do?").toLowerCase();
        console.log(youSure);
    }
}

while (userInput !== "quit") {
    console.log(userInput);

    if (userInput === "new") {
        let newTodo = prompt("Enter a new ToDo.");
        let addedTo = todoArray.push(newTodo);
        alert("Added to the list: " + newTodo);
        for (let i = 0; i < todoArray.length; i++);
        console.log(addedTo);
        console.log(todoArray);
    }

    if (userInput === "list") {
        console.log("**********List**********");

        for (let i = 0; i < todoArray.length; i++) {
            console.log(i + " - " + todoArray[i]);
        }
        console.log("**********List**********");
        userInput = alert("Here is the list in the Console.");
    } else if (userInput === "delete") {
        console.log("**********Delete**********");
        for (let i = 0; i < todoArray.length; i++) {
            console.log(i + " - " + todoArray[i]);
        }
        console.log("**********Delete**********");
        let deleteTodo = parseInt(
            prompt(
                "Choose a number from the console that you want to delete, and input it below: "
            )
        );
        console.log(deleteTodo);

        let eraseIndex = todoArray.splice(deleteTodo, 1);
        console.log("eraseIndex -- " + eraseIndex);

        alert(eraseIndex + " has been deleted.");
        for (let i = 0; i < todoArray.length; i++) {
            console.log(i + " - " + todoArray[i]);
        }
    }

    userInput = prompt("What would you like to do?").toLowerCase();
    if (userInput === "quit") {
        let youSure = confirm("You sure you wanto to exit the ToDo App?");
        console.log(youSure);

        if (youSure === false) {
            userInput = prompt("What would you like to do?").toLowerCase();
            console.log(youSure);
        }
    }
}
