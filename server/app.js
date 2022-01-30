const express = require("express");
const { graphqlHTTP } = require('express-graphql');
const mongoose = require("mongoose")

const cors = require("cors");

const schema = require("./schema/schema");


const app = express();

app.use(cors());

mongoose.connect(
    "mongodb://localhost:27017/myapp",
    { useNewUrlParser: true },
    () => {
      console.log("Connect with DB successfully.");
    }
  );

app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      graphiql: true
    })
  );


//When our application starts, it will listen on port 4000
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
  });