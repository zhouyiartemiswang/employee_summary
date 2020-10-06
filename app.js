const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const questions = require("./questions.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Function takes input of role in team and use inquirer to gather information about that team member
function inquirerCall(role) {
    inquirer
        .prompt(questions.generateQuestions(role))
        .then(function (response) {
            // console.log(response);
            // console.log(typeof response.answerRole);

            // Create objects for each team member
            if (role === "manager") {
                const managerEl = new Manager(response.name, response.id, response.email, response.lastQ);
                // console.log(managerEl);
            } else if (role === "engineer") {
                const engineerEl = new Engineer(response.name, response.id, response.email, response.lastQ);
                // console.log(engineerEl);
            } else if (role === "intern") {
                const internEl = new Intern(response.name, response.id, response.email, response.lastQ);
                // console.log(internEl);
            } else {
                console.log("Please enter a valid parameter");
            }
            
            // If user finishes adding team member, then call render()
            if (response.role === "I don't want to add any more team members") {
                return;
            } else {
                // Otherwise, keep asking questions
                inquirerCall(response.answerRole);
            }

        })
        // Errors
        .catch(error => {
            if (error.isTtyError) {
                return console.log("Prompt couldn't be rendered in the current environment");
            } else {
                return console.log("Something else went wrong");
            }
        });
}


inquirerCall("manager");
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
