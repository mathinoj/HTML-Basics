function callTwo(func) {
    func();
    func();
}

function rollDye() {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log(roll);
}
callTwo(rollDye);
