const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql");

const db = require("./db/connection");
const inquirer = require("inquirer");
const view = require("./utils/view.js");
// Adding new employees or roles
const add = require("./utils/add.js");
// Updating and deleting existing data
const update = require("./utils/update.js");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

connection.connect(function (err) {
  if (err) throw err;
  start();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
