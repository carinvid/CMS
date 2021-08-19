const inquirer = require("inquirer");

function viewAllEmployees(connection, kap) {
  let query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee as e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    kap();
  });
}

function viewEmployeeDept(connection, kap) {
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
          "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee as e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE department.name = ? ORDER BY employee.id";
        connection.query(query, answer.department, function (err, res) {
          if (err) throw err;
          console.table(res);
          kap();
        });
      });
  });
}

function viewEmployeeManager(connection, kap) {
  connection.query(
    "SELECT DISTINCT e2.first_name, e2.last_name FROM employee LEFT JOIN employee AS e2 ON employee.manager_id = e2.id WHERE e2.first_name IS NOT NULL",
    function (err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "manager",
            type: "list",
            choices: function () {
              let optionArray = [];
              for (var i = 0; i < results.length; i++) {
                optionArray.push(results[i].first_name);
              }
              return optionArray;
            },
            message: "Which manager would you like to see?",
          },
        ])
        .then(function (answer) {
          console.log(answer.manager);
          let query =
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id WHERE e2.first_name = ? ORDER BY employee.id;";
          connection.query(query, answer.manager, function (err, res) {
            if (err) throw err;
            console.table(res);
            kap();
          });
        });
    }
  );
}

function viewRoles(connection, kap) {
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    kap();
  });
}

function viewDepartments(connection, kap) {
  let query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    kap();
  });
}

module.exports = {
  viewAllEmployees: viewAllEmployees,
  viewEmployeeDept: viewEmployeeDept,
  viewEmployeeManager: viewEmployeeManager,
  viewRoles: viewRoles,
  viewDepartments: viewDepartments,
};
