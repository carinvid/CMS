const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");
const inputCheck = require("./utils/inputCheck");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({
//     message: "Hello World",
//   });
// });

// Get all employees
app.get("/api/employees", (req, res) => {
  const sql = `SELECT * FROM employees`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "Americo01",
    database: "cms",
  },
  console.log("Connected to the cms database.")
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
