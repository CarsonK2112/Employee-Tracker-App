# Employee-Tracker-App

This completed assignment allows the user to access, add to, and update a sql database that is built around a company that includes employees, departments, and roles. When a user types npm start in the terminal they will be presented with a list of three options: view, add, and update. 

The view option will branch off into three more options: view employees, view departments, or view roles. Choosing any of the three will allow the user to view the respective data from the three tables in the sql database.

The add option also has three options: add employees, departments, or roles. The user will pick one of the three and will be prompted by a series of questions on which data they would like to input into the sql tables.

The update option is for employee roles only, the user will be able to view the list of employees and choose which they would like to update. From that point they can alter the role of said employee.

The code utilizes callback functions within the inquirer prompts for the initial questions (whether they wish to view, add, or update) and within these callback functions are the blocks of code that interact with the database.