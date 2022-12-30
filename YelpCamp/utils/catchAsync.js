module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};

// we return a function that accepts a function and then it executes that fuction but it catches any errors and passes in to next() if there is an error
//func(req, res, next) is what you pass in
//return (req, res, next) returns a new function that has func executed

//function catchAsync(fn){}
//Our fuction here is catchAsync. It accepts a function, which here we call 'fn', 'fn' refers to everything from the app.js 'async' part until the end '});'
// What 'function catchAsync(fn){}' needs to do is return a function, see below.
//function catchAsync(fn){return function (req, res, next)}
// We need '(req, res, next)' from above because were passing that through to the 'fn()' function, which again is the whole app.js function.
//
//from out catchAsync function, EXPRESS calls (in app.js) everything that has catchAsycn(...) and everything that is inside it.
//catchAsync return a function

// the goal: we want to make a function that we can wrap our async callbacks in so that we don't have to type, try/catch next-error over and over and over. This is just a standard practice.

//with fn(req, res, next), we are taking the whole function from app.js and passing it through to the error handlers: (req, res, next).

//module.exports accepts a function, here we call 'func', which returns a new function. This new function is its own thing, meaning that it exists on its own.
//This NEW function executes whatever we pass into catchAsync, which is everything from the app.js function that has catchAsync(everything inside these parenthesis) in it.
//SO it executes the catchAsync() but also adds a .catch()
//.catch() - if anything goes wrong in the app.js function were gonna catch it and take that error ('e') and pass that through to next like: catch(e=>next(e))
