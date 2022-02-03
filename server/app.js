const express = require("express");
const path = require("path")

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

let port = process.env.PORT || 5000

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
  console.log("Server is listening on port 5000");
});