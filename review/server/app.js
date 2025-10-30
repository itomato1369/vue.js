require("dotenv").config({ path: "./database/dbConfig.env" });

const express = require("express");
const app = express();
const port = 3000;
// -----MiddleWare-----
// body parser
// content-type : application/x-www-form-urlencoded
// 검색기능 GET, POST, PUT, DELETE
app.use(express.urlencoded({ extended: true }));
// content-type : application/json
app.use(express.json());

// -----Server-----
app.listen(port, () => {
  console.log("Server start");
  console.log(`http://localhost:${port}`);
});

// -----Routing----
app.get("/", (req, res) => {
  res.send("Good Day TODAY is 30. Oct");
});

const boardRouter = require("./routes/board_router.js");
app.use("/", boardRouter);
