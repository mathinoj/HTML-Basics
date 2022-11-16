module.exports = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
//weve created a function that returns and accepts a (req, res, next) function, then it executes the function 'func(req, res, next)' then catches any errors and passes it onto next()
