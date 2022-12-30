module.exports = (func) => {
    //module.exports accepts a function that here we named 'func'
    return (req, res, next) => {
        //we return a function that accepts a function and then exectutes the function below
        func(req, res, next).catch(next);
        //when func is executed it catches any errors and passes them onto next catch(next)
    };
};

//'module.exports' accepts a function, here we call 'func', which returns a new function: 'return (req, res, next)'
// This returned function executes/runs 'func' and then CATCHES ('catch()') any errors and passes them to NEXT ('catch(next)').

//the 'next' in 'catch(next)' refers to the app.use((err, req, res, next)) in app.js, which right now has a generic error.

//In sum, the whole function in catchAsync.js returns a new function that calls the app.js function (anything that has 'catchAsync()' wrapped inside it) and catches errors

//If there is an error thrown from Mongoose our catchAsync wrap function in app.js is going to 'catch' it thanks to the 'catchAsync' function that we created in catchAsync.js, and pass it to 'next' because that's what the whole function in catchAsync.js exists for.

// Basically we create a function that accepts a function ('func') and exectutes that 'func' function, but catches any errors ('catch()') and passes it to next .('.catch(next)') if there is any errors. We use this whole thing (everything in catchAsync.js, the 'func' function) to wrap our async functions in app.js.
