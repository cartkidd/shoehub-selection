//Get the express library from node_modules which we have just downloaded.
const express = require("express");

//Making const of express() into a variable (JS function first class Object).
const app = express();

//When our application starts, it will listen on port 4000
app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});