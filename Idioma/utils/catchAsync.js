module.exports = (func) => {
    //module.exports accepts a function that here we named 'func'
    return (req, res, next) => {
        //we return a function that accepts a function and then exectutes the function below
        func(req, res, next).catch(next);
        //when func is executed it catches any errors and passes them onto next catch(next)
    };
};
// catchAsync returns a function, which will be the function that we wrap inside catchAsync in app.js

//func will refer to the whole function that were doing the catchAsync to in app.js
//we need 'return (req, res, next)' cuz we will be passing it through to 'func(req, res, next)', which will have our inner function (inside the catchAsync()) in app.js
//.catch(next) is for if anything goes wrong inside the func we catch it and we take the error and pass it to 'next'
//this basically simplifies the try/catch process
//this function returns another function, a new function. this new function executes whatever we pass into catchAsync and adds on the .catch(), and if there is an error it calls 'next' with that error.
