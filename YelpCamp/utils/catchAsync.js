module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};

// we return a function that accepts a function and then it executes that fuction but it catches any errors and passes in to next() if there is an error
//func(req, res, next) is what you pass in
//return (req, res, next) returns a new function that has func executed
