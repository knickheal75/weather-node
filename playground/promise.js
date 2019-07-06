var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === "number" && typeof b === "number") {
        resolve(a + b);
      } else {
        reject("arguments must be numbers");
      }
    }, 1500);
  });
};

asyncAdd(4, 7)
  .then(res => {
    console.log(res);
    return asyncAdd(res, 33);
  })
  .then(res => {
    console.log("should be 44", res);
  })
  .catch(errorMessage => {
    console.log(errorMessage);
  });

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("hey, it worked");
//     reject("Unable to fulfill promise");
//   }, 5000);
// });

// somePromise.then(
//   message => {
//     console.log(`success:${message}`);
//   },
//   errorMessage => {
//     console.log(`Error:${errorMessage}`);
//   }
// );
