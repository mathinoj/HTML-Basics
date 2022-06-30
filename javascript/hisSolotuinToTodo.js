let input = prompt("what would you like to do");
const todos = ["collect money", "deposit monkey"];
while (input !== "quit" && input !== "q") {
    if (input === "list") {
        console.log("*******************");
        for (let i = 0; i < todos.length; i++) {
            console.log(`${i}: ${todos[i]}`);
        }
        console.log("*******************");
        // input = prompt("what would you like to do")
    } else if (input === "new") {
        const newTodo = prompt("Ok, what is the new todo?");
        todos.push(newTodo);
        console.log(`${newTodo} added to the list.`);
    } else if (input === "delete") {
        const index = parseInt(prompt("Ok, enter an index to delete:"));
        if (!Number.isNaN(index)) {
            // parseInt(index);
            const deleted = todos.splice(index, 1);
            console.log(`Ok, deleted ${deleted[0]}`);
            // console.log(index);
        } else {
            console.log("Unknown index.");
        }
    }
    input = prompt("What would you like to do?");
}
console.log("Ok quit the app.");
