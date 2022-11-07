const express = require("express");
require("./db");
const Router = require("./routes");
let cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port ==> 3000");
});
