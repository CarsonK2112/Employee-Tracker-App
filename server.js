var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "employee_tracker_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  function start() {
    inquirer
      .prompt({
        name: "user_selection",
        type: "list",
        message:
          "Would you like to [VIEW] employees, departments, or roles? [ADD] employees, departments or roles? Or [UPDATE] employee roles?",
        choices: ["VIEW", "ADD", "UPDATE"],
      })
      .then(function (answer) {
        console.log(answer);
        if (answer.user_selection === "VIEW") {
          inquirer
            .prompt({
              name: "view_selection",
              type: "list",
              message:
                "Would you like to view employees, departments, or roles?",
              choices: ["EMPLOYEES", "DEPARTMENTS", "ROLES"],
            })
            .then(function (a2) {
              if (a2.view_selection === "EMPLOYEES") {
                viewemployees();
              } else if (a2.view_selection === "DEPARTMENTS") {
                viewdepartments();
              } else if (a2.view_selection === "ROLES") {
                viewroles();
              }
            });
        } else if (answer.user_selection === "ADD") {
          inquirer
            .prompt({
              name: "view_selection",
              type: "list",
              message:
                "would you like to add employees, departments, or roles?",
              choices: ["EMPLOYEES", "DEPARTMENTS", "ROLES"],
            })
            .then(function (a3) {
              if (a3.view_selection === "EMPLOYEES") {
                addemployees();
                console.log("added employee");
              } else if (a3.view_selection === "DEPARTMENTS") {
                adddepartments();
              } else if (a3.view_selection === "ROLES") {
                addroles();
              }
            });
        } else if (answer.user_selection === "UPDATE") {
          inquirer
            .prompt({
              name: "view_selection",
              type: "list",
              message: "would you like to update employee roles?",
              choices: ["YES", "NO"],
            })
            .then(function (a4) {
              if (a4.view_selection === "YES") {
                console.log("updated");
                updateemployees();
              } else if (a4.view_selection === "NO") {
                start();
              }
            });
        } else {
          console.log("invalid");
        }
      });
  }

  function viewemployees() {
    console.log("Viewing employees...\n");
    var employee_join =
      "SELECT employees.id, employees.first_name, employees.last_name, departments.name, roles.title, roles.salary";
    employee_join +=
      " FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id";
    connection.query(employee_join, function (err, res) {
      if (err) throw err;
      console.log(res);
      console.log(res[0]["first_name"]);
      console.log(res[0]["id"]);
      start();
    });
  }

  function viewdepartments() {
    console.log("Viewing departments...\n");
    connection.query("SELECT * FROM departments", function (err, res) {
      if (err) throw err;
      console.log(res);
      start();
    });
  }

  function viewroles() {
    console.log("Viewing roles...\n");
    connection.query("SELECT * FROM roles", function (err, res) {
      if (err) throw err;
      console.log(res);
      start();
    });
  }

  function addemployees() {
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employees first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name?",
        },
        {
          name: "role_id",
          type: "input",
          message: "What is the employee's role?",
        },
        {
          name: "manager_id",
          type: "input",
          message: "What is the employee's manager?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          },
        },
      ])
      .then(function (answer) {
        console.log(answer);
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id,
          },
          function (err) {
            if (err) throw err;
            console.log("The employee was added successfully!");
            start();
          }
        );
      });
  }

  function adddepartments() {
    inquirer
      .prompt([
        {
          name: "department_name",
          type: "input",
          message: "What department would you like to add?",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO departments SET ?",
          {
            name: answer.department_name,
          },
          function (err) {
            if (err) throw err;
            console.log("The department was added successfully!");
            start();
          }
        );
      });
  }

  function addroles() {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the name of the role you would like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this role?",
        },
        {
          name: "department_id",
          type: "input",
          message: "What department is this role a part of?",
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id,
          },
          function (err) {
            if (err) throw err;
            console.log("The role was added successfully!");
            start();
          }
        );
      });
  }

  function updateemployees() {
    console.log("check");
    connection.query("SELECT * FROM employees", function (err, results) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function () {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push({
                  name: results[i].first_name,
                  value: results[i].id,
                });
              }
              return choiceArray;
            },
            message: "Which employee would you like to update?",
          },
          {
            name: "role_id",
            type: "input",
            message: "Which role would you like this employee to have?",
          },
        ])
        .then(function (answer) {
          console.log(answer);
          connection.query(
            "UPDATE employees SET ? WHERE ?",
            [
              {
                role_id: answer.role_id,
              },
              {
                id: answer.choice,
              },
            ],
            function (error) {
              if (error) throw err;
              console.log("Employee updated successfully!");
              start();
            }
          );
        });
    });
  }