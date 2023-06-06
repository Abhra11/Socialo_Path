const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("morgan");
const cors = require("cors");
const { connection } = require("./config/connection");
const userRouter = require("./Routes/users");
const authRouter = require("./Routes/authentication");
const postsRouter = require("./Routes/postsRouter");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use("/server/users", userRouter);
app.use("/server/auth", authRouter);
app.use("/server/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("Welcome, It's the homepage");
});

app.listen(process.env.port, async () => {
  connection();
  console.log(` Server is runing ${process.env.port}`);
});
