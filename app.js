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

// Initiate empty array to be passed to render()
const employeeArray = [];

// Function takes input of role in team and use inquirer to gather information about that team member
function inquirerCall(role) {
    inquirer
        .prompt(questions.generateQuestions(role))
        .then(function (response) {

            // Create objects for each team member, then push to employeeArray
            if (role === "manager") {
                employeeArray.push(new Manager(response.name, response.id, response.email, response.lastQ))
            } 
            else if (role === "engineer") {
                employeeArray.push(new Engineer(response.name, response.id, response.email, response.lastQ));
            } 
            else if (role === "intern") {
                employeeArray.push(new Intern(response.name, response.id, response.email, response.lastQ));
            } 
            else {
                console.log("Please enter a valid parameter");
            }
            
            // If user finishes adding team member, then call render()
            if (response.answerRole === "I don't want to add any more team members") {

                writeToFile(render(employeeArray));
                return;

            } 
            // Otherwise, keep asking questions
            else {
                inquirerCall(response.answerRole);
            }

        })
        // Errors
        .catch(error => {
            if (error.isTtyError) {
                return console.log("Prompt couldn't be rendered in the current environment");
            } 
            else {
                return console.log("Something else went wrong");
            }
        });
}

// Function takes input of htmlFile and save to team.html
function writeToFile(htmlFile) {

    // Check if the output folder exists
    if (!fs.existsSync(OUTPUT_DIR)) {

        // If not, create the output folder
        fs.mkdirSync(OUTPUT_DIR);

    } 

    // Write htmlFile into provided filepath
    fs.writeFile(outputPath, htmlFile, function(err) {
        if (err) throw err;
        console.log("The file has been saved!");
    })
}

// Call inquirerCall with input "manager"
inquirerCall("manager");
