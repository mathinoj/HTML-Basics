function callTwo(func) {
    func();
    func();
}

function rollDye() {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log(roll);
}
callTwo(rollDye);

const cat = {
    name: "Blu",
    color: "grey",
    breed: "cat",
    mew: function () {
        console.log("mew mew");
    },
};

//SHORTHAND WOULD BE:
const dog = {
    name: "Black",
    color: "tan",
    breed: "dog",
    woof() {
        console.log("brk");
    },
};

const human = {
    name: "Matt",
    color: "brown",
    breed: "human",
    say() {
        console.log(this.name + " says yo!");
    },
};

// const hen = {
//     name: "Helen",
//     eggCount: 0,
//     layAnEgg: function () {
//         return this.eggCount++;
//     },
// };

const hen = {
    name: "Helen",
    eggCount: 0,
    layAnEgg() {
        this.eggCount++;
        return "EGG";
    },
};
