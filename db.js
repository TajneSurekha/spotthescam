const mongoose = require("mongoose");
const username = "user";
const password = "user";
const cluster = "cluster0.4xf9c";
const dbname = "spotscam";

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("MongDB Atlas Connected successfully!");
});
