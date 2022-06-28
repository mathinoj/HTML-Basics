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

let userInput = prompt("What would you like to do?").toLowerCase();
console.log(userInput);

while (!commands.includes(userInput)) {
    userInput = prompt("I did not recognize that. What would you like to do?");
    console.log(userInput);
}

// let todoArray = [];
// console.log(todoArray);

let userTodos = 1;

while (commands.includes(userInput)) {
    if (userInput === "quit") break;
    userTodos++;
    if (userInput === "new") {
        // let todoArray = [];
        let newTodo = prompt(
            "You want to enter a new ToDo. Go ahead"
        ).toString();
        let storeTodo = todoArray.pop(newTodo);
        // let anotherTodo = todoArray.unshift(newTodo);
        console.log(storeTodo);
        // console.log(anotherTodo);
    } else if (userInput === "list") {
        let viewList = prompt(
            "Here is the list in the Console. What else would you like to do?"
        );
        console.log(viewList);
    } else if (userInput === "delete") {
        let deleteTodo = prompt(
            "You want to delete. Choose a number from the Console that you want to delete and input it below"
        );
        console.log(deleteTodo);
        // } else if (userInput === "quit") {
        //     let quitTodo = alert("Okay you quit");
        //     console.log(quitTodo);
    } else {
        userInput = prompt("I do not recognize THAT STUFF, please try again");
    }
}

if (userInput === "quit") {
    alert("You have exited ToDo App");
}
