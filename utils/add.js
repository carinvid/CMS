const inquirer = require("inquirer");

function addEmployee(connection, kap) {
  let newEmployee = {};
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "role",
          type: "list",
          choices: function () {
            let optionArray = [];
            for (var i = 0; i < results.length; i++) {
              optionArray.push(results[i].title);
            }
            return optionArray;
          },
          message: "What is the employee's role?",
        },
      ])
      .then(function (answer) {
        newEmployee.first_name = answer.first_name;
        newEmployee.last_name = answer.last_name;

        connection.query(
          "SELECT * FROM role WHERE title = ?",
          answer.role,
          function (err, results) {
            if (err) throw err;

            newEmployee.role_id = results[0].id;
            console.log("Adding new role for employee: ", newEmployee);
            // Ask for manager
            connection.query(
              "SELECT * FROM employee;",
              function (err, results) {
                if (err) throw err;
                inquirer
                  .prompt([
                    {
                      name: "manager_name",
                      type: "list",
                      choices: function () {
                        let optionArray = [];
                        for (var i = 0; i < results.length; i++) {
                          optionArray.push(results[i].first_name);
                        }
                        return optionArray;
                      },
                      message: "Who is the employee's manager?",
                    },
                  ])
                  .then(function (answer) {
                    connection.query(
                      "SELECT id FROM employee WHERE first_name = ?",
                      answer.manager_name,
                      function (err, results) {
                        if (err) throw err;
                        newEmployee.manager_id = results[0].id;
                        console.log("Adding new employee: ", newEmployee);

                        connection.query(
                          "INSERT INTO employee SET ?",
                          newEmployee,
                          function (err, results) {
                            if (err) throw err;
                            console.log("Employee successfully added.");
                            kap();
                          }
                        );
                      }
                    );
                  });
              }
            );
          }
        );
      });
  });
}

function addRole(connection, kap) {
  let newRole = {};
  connection.query("SELECT * FROM department", function (err, results) {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the new title?",
          validate: function (answer) {
            if (answer.length < 1) {
              return console.log("A valid title is required.");
            }
            return true;
          },
        },
        {
          name: "salary",
          type: "input",
          message: "What is the new salary?",
          validate: function (answer) {
            if (answer.length < 1) {
              return console.log("A valid salary is required.");
            }
            return true;
          },
        },
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
          message: "What is the title?",
        },
      ])
      .then(function (answer) {
        newRole.title = answer.role_title;
        newRole.salary = answer.salary;

        connection.query(
          "SELECT id FROM department WHERE name = ?",
          answer.dept_name,
          function (err, results) {
            if (err) throw err;
            newRole.department_id = results[0].id;
            console.log("Adding new role: ", newRole);

            connection.query(
              "INSERT INTO role SET ?",
              newRole,
              function (err, results) {
                if (err) throw err;
                console.log("Role successfully added.");
                kap();
              }
            );
          }
        );
      });
  });
}

function addDepartment(connection, kap) {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the department you would like to add?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        answer.dept_name,
        function (err, results) {
          if (err) throw err;
          console.log("Department successfully added.");
          kap();
        }
      );
    });
}

module.exports = {
  addEmployee: addEmployee,
  addRole: addRole,
  addDepartment: addDepartment,
};
