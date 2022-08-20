const bcrypt = require("bcrypt");

// const hashPassword = async (pw) => {
//     const salt = await bcrypt.genSalt(12);
//     const hash = await bcrypt.hash(pw, salt);
//     console.log(salt);
//     console.log(hash);
// };
//salt dictates how many times it will hash, when we actually hash it

const hashPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
    console.log(hash);
};

const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw);
    if (result) {
        console.log("Logged in successfully with a match");
    } else {
        console.log("wrong");
    }
};

// hashPassword("monkey");
login("monkey", "$2b$12$57aDGNy/j3LDyJnXW1Svb.b/BVS4dTPG47sk/.sZ8cMccXLX3YXXW");
