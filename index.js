const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

// Database connection

require("./config/db");

const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/AppError");
const errorHandler = require("./middleware/errorHandler");

// Home route
app.get("/", (req, res) => {
  res.send("API is running....");
});

// User routes
app.use("/api/users", userRouter);

// 404 handler (must be AFTER all routes)
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Global error handler (must be LAST)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});