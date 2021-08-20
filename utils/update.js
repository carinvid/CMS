const inquirer = require("inquirer");

function removeEmployee(connection, kap) {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "removeEmployee",
          type: "list",
          choices: function () {
            let optionArray = [];
            for (var i = 0; i < results.length; i++) {
              optionArray.push(results[i].first_name);
            }
            return optionArray;
          },
          message: "Which employee would you like to remove?",
        },
      ])
      .then(function (answer) {
        let query = "DELETE FROM employee WHERE first_name = ?";
        connection.query(query, answer.removeEmployee, function (err, res) {
          if (err) throw err;
          console.log("Employee successfully deleted");
          kap();
        });
      });
  });
}

function updateRole(connection, kap) {
  let newRole = {};

  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id",
    function (err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "updateEmployee",
            type: "list",
            choices: function () {
              let optionArray = [];
              for (var i = 0; i < results.length; i++) {
                optionArray.push(results[i].first_name);
              }
              return optionArray;
            },
            message: "Which employee would you like to update?",
          },
        ])
        .then(function (answer) {
          newRole.first_name = answer.updateEmployee;

          connection.query("SELECT * FROM role", function (err, res) {
            if (err) throw err;
            inquirer
              .prompt([
                {
                  name: "updateRole",
                  type: "list",
                  choices: function () {
                    let optionArray = [];
                    for (var i = 0; i < results.length; i++) {
                      optionArray.push(results[i].title);
                    }
                    return optionArray;
                  },
                  message: "What is the new role?",
                },
              ])
              .then(function (answer) {
                connection.query(
                  "SELECT * FROM role WHERE title = ?",
                  answer.updateRole,
                  function (err, results) {
                    if (err) throw err;

                    newRole.role_id = results[0].id;

                    connection.query(
                      "UPDATE employee SET role_id = ? WHERE first_name = ?",
                      [newRole.role_id, newRole.first_name],
                      function (err, res) {
                        if (err) throw err;
                        console.log("new role successfully updated.");
                        kap();
                      }
                    );
                  }
                );
              });
          });
        });
    }
  );
}

function updateManager(connection, kap) {
  let newManager = {};

  connection.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager FROM employee LEFT JOIN employee AS e2 ON e2.id = employee.manager_id JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id",
    function (err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "updateEmployee",
            type: "list",
            choices: function () {
              let optionArray = [];
              for (var i = 0; i < results.length; i++) {
                optionArray.push(results[i].first_name);
              }
              return optionArray;
            },
            message: "who is the employee would you like to update?",
          },
        ])
        .then(function (answer) {
          newManager.first_name = answer.updateEmployee;

          connection.query("SELECT * FROM employee", function (err, res) {
            if (err) throw err;
            inquirer
              .prompt([
                {
                  name: "updateManager",
                  type: "list",
                  choices: function () {
                    let optionArray = [];
                    for (var i = 0; i < results.length; i++) {
                      optionArray.push(results[i].first_name);
                    }
                    return optionArray;
                  },
                  message: "Who is the new manager for this employee?",
                },
              ])
              .then(function (answer) {
                connection.query(
                  "SELECT * FROM employee WHERE first_name = ?",
                  answer.updateManager,
                  function (err, results) {
                    if (err) throw err;

                    newManager.manager_id = results[0].id;

                    connection.query(
                      "UPDATE employee SET manager_id = ? WHERE first_name = ?",
                      [newManager.manager_id, newManager.first_name],
                      function (err, res) {
                        if (err) throw err;
                        console.log("Employee's manager successfully updated.");
                        kap();
                      }
                    );
                  }
                );
              });
          });
        });
    }
  );
}

function removeRole(connection, kap) {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "removeRole",
          type: "list",
          choices: function () {
            let optionArray = [];
            for (var i = 0; i < results.length; i++) {
              optionArray.push(results[i].title);
            }
            return optionArray;
          },
          message: "Which role would you like to remove?",
        },
      ])
      .then(function (answer) {
        let query = "DELETE FROM role WHERE title = ?;";
        connection.query(query, answer.removeRole, function (err, res) {
          if (err) throw err;
          console.log("Role successfully deleted");
          kap();
        });
      });
  });
}

function removeDepartment(connection, kap) {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "removeDept",
          type: "list",
          choices: function () {
            let optionArray = [];
            for (var i = 0; i < results.length; i++) {
              optionArray.push(results[i].name);
            }
            return optionArray;
          },
          message: "Which department would you like to remove?",
        },
      ])
      .then(function (answer) {
        let query = "DELETE FROM department WHERE name = ?;";
        connection.query(query, answer.removeDept, function (err, res) {
          if (err) throw err;
          console.log("Department successfully deleted");
          kap();
        });
      });
  });
}

module.exports = {
  removeEmployee: removeEmployee,
  updateRole: updateRole,
  updateManager: updateManager,
  removeRole: removeRole,
  removeDepartment: removeDepartment,
};
