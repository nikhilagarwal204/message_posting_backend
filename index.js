const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const app = express();
require("./db/conn.js");
app.use(express.json());
const port = 5050;
app.use(require("./API/auth"));
app.use(require("./API/crud"));
app.listen(port, () => {
  console.log(`sever is running`);
});
