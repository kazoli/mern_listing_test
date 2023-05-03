require("dotenv").config();
const path = require("path");
const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

// call DB connection
connectDB();

const app = express();

// parse query
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// router part
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/collections", require("./routes/collectionRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => res.send("Please set to production first!"));
}

// call error handler from middlewares
app.use(errorHandler);

// port that backend is listening to handle requests
app.listen(port, (error) =>
  console.log(error ? error : `Server started on port ${port}`)
);
