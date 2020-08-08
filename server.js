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

    inquirer.prompt ({
      name: "user_selection",
      type: "list",
      message: "Would you like to [VIEW] employees, departments, or roles? [ADD] employees, departments or roles? Or [UPDATE] employee roles?",
      choices: ["VIEW", "ADD", "UPDATE"]
    })
    .then(function(answer) {
      console.log(answer);
      if (answer.user_selection === "VIEW") {
        inquirer.prompt ({
          name: "view_selection",
          type: "list",
          message: "Would you like to view employees, departments, or roles?",
          choices: ["EMPLOYEES", "DEPARTMENTS", "ROLES"]
        })
        .then(function(a2){
          if (a2.view_selection === "EMPLOYEES"){
            viewemployees();
          }
          else if (a2.view_selection === "DEPARTMENTS"){
            viewdepartments();
          }
          else if (a2.view_selection === "ROLES"){
            viewroles();
          }
        })
      } else if (answer.user_selection === "ADD") {
        inquirer.prompt ({
          name: "view_selection",
          type: "list",
          message: "would you like to add employees, departments, or roles?",
          choices: ["EMPLOYEES", "DEPARTMENTS", "ROLES"]
        }).then(function(a3){
          if (a3.view_selection === "EMPLOYEES"){
            addemployees();
            console.log("added employee")
          }
          else if (a3.view_selection === "DEPARTMENTS"){
            adddepartments();
          }
          else if (a3.view_selection === "ROLES"){
            addroles();
          }
        })

      }
      else if (answer.user_selection === "UPDATE") {
        inquirer.prompt ({
          name: "view_selection",
          type: "list",
          message: "would you like to update employee roles?",
          choices: ["YES", "NO"]
        }).then(function(a4){
          if (a4.view_selection === "YES"){
            console.log("updated")
            updateemployees();

          }
          else if (a4.view_selection === "NO"){
            start();
          }
        })
        
      }
      else {
        console.log("invalid");
        
      }
    });
  }

  // Base table Employees, left join Roles and Departments


 

function viewemployees() {
  console.log("Viewing employees...\n");
  var employee_join = "SELECT employees.first_name, employees.last_name, employees.role_id, employees.manager_id";
  employee_join += "FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id";
  // connection.query("SELECT * FROM employees", function(err, res) {
    connection.query(employee_join, function(err, res) {
    if (err) throw err;
    console.log(res);
    start ()
  });
}

function viewdepartments() {
  console.log("Viewing departments...\n");
  connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;
    console.log(res);
    start ()
  });
}

function viewroles() {
  console.log("Viewing roles...\n");
  connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;
    console.log(res);
    start ()
  });
}

// function addemployees () {
//   // prompt for employee information
//   connection.query(
//     "INSERT INTO employees SET ?",
//     {
//       first_name: 
//       last_name: 
//       role_id: 
//       manager_id:
//     },
//     function(err) {
//       if (err) throw err;
//       console.log("You successfully added an employee!");
//       start();
//   })
// }

// function updateemployees() {
//   console.log("update")
//   connection.query(
//     "UPDATE employees SET first_name, last name, role_id, manager_id WHERE id:id",
//     [
//       {
//         first_name: answer.first_name,
//         last_name: answer.last_name,
//         role_id: answer.role_id,
//         manager_id: answer.manager_id
//       },
//       // {
//       //   id:id,
//       //   // first_name: "Brightside"
//       // }
//     ],
//     function(error) {
//       if (error) throw err;
//       console.log("Employee updated successfully!");
//       start();
//     }
//   );
// }
function updateemployees() {
  console.log("update")
  var employee_list = [];
  var updateemployee_sql = "UPDATE employees SET ?? WHERE ??"
  var updateemployee_array = [
      {
        role_id:answer.role_id,
      },
      {
        id:answer.id,
      }
  ]
  connection.query(updateemployee_sql, updateemployee_array,
      function(error) {
      if (error) throw err;
      console.log("Employee updated successfully!");
      start();
    }
  );
}
