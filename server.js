const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
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

db.query(`SELECT * FROM employees`, (err, rows) => {
  console.log(rows);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
