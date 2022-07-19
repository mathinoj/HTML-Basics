const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure("Connection Timeout");
        } else {
            success(`Here is fake data from ${url}`);
        }
    }, delay);
};

const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4500) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject("Connection Timeout");
            } else {
                resolve(`Here is your fake data from ${url}`);
            }
        }, delay);
    });
};

// fakeCallback(
//     "books.com",
//     function (response) {
//         console.log("It worked.");
//         console.log(AuthenticatorResponse);
//     },
//     function (err) {
//         console.log("Error", err);
//     }
// );

// fakeCallback2(
//   "books.com/page1",
//   function (response) {
//       console.log("It worked.");
//       console.log(AuthenticatorResponse);
//       fakeCallback2A
//   },
//   function (err) {
//       console.log("Error", err);
//   }
// );

fakeRequestPromise("yelp.com/api/coffee/page1")
    .then((data) => {
        console.log("it worked page 1");
        console.log(data);
        return fakeRequestPromise("yelp.com/api/coffee/page2");
    })
    .then((data) => {
        console.log("it worked page 2");
        console.log(data);
        return fakeRequestPromise("yelp.com/api/coffee/page3");
    })
    .then((data) => {
        console.log("it worked page 3");
        console.log(data);
    })
    .catch(() => {
        console.log("request failed");
    });
