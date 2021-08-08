const inquirer = require("inquirer");

function viewAllEmployees(connection, cb) {
  let query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS supervisor FROM employee LEFT JOIN employee as e2 ON e2.id = employee.supervisor_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    cb();
  });
}

function viewEmployeeDept(connection, cb) {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "department",
          type: "list",
          choices: function () {
            let optionArray = [];
            for (var i = 0; i < results.length; i++) {
              optionArray.push(results[i].name);
            }
            return optionArray;
          },
          message: "What department would you like to see?",
        },
      ])
      .then(function (answer) {
        console.log(answer.department);
        let query =
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS supervisor FROM employee LEFT JOIN employee as e2 ON e2.id = employee.supervisor_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.name = ? ORDER BY employee.id";
        connection.query(query, answer.department, function (err, res) {
          if (err) throw err;
          console.table(res);
          cb();
        });
      });
  });
}

function viewEmployeeSup(connection, cb) {
  connection.query(
    "SELECT DISTINCT e2.first_name, e2.last_name FROM employee LEFT JOIN employee AS e2 ON employee.supervisor_id = e2.id WHERE e2.first_name IS NOT NULL",
    function (err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "supervisor",
            type: "list",
            choices: function () {
              let optionArray = [];
              for (var i = 0; i < results.length; i++) {
                optionArray.push(results[i].first_name);
              }
              return optionArray;
            },
            message: "Which supervisor would you like to see?",
          },
        ])
        .then(function (answer) {
          console.log(answer.supervisor);
          let query =
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS supervisor FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.supervisor_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE e2.first_name = ? ORDER BY employee.id;";
          connection.query(query, answer.supervisor, function (err, res) {
            if (err) throw err;
            console.table(res);
            cb();
          });
        });
    }
  );
}

function viewRoles(connection, cb) {
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    cb();
  });
}

function viewDepartments(connection, cb) {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    cb();
  });
}

module.exports = {
  viewAllEmployees: viewAllEmployees,
  viewEmployeeDept: viewEmployeeDept,
  viewEmployeeSup: viewEmployeeSup,
  viewRoles: viewRoles,
  viewDepartments: viewDepartments,
};
