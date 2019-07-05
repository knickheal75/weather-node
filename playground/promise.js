var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("hey, it worked");
    reject("Unable to fulfill promise");
  }, 5000);
});

somePromise.then(
  message => {
    console.log(`success:${message}`);
  },
  errorMessage => {
    console.log(`Error:${errorMessage}`);
  }
);
