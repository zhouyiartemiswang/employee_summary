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

const employeeArray = [];
// Function takes input of role in team and use inquirer to gather information about that team member
function inquirerCall(role) {
    inquirer
        .prompt(questions.generateQuestions(role))
        .then(function (response) {

            // Create objects for each team member
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
                // const htmlFile = render(employeeArray);
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

function writeToFile(htmlFile) {
    if (!fs.existsSync(OUTPUT_DIR)) {
        console.log('Directory does not exist');
        fs.mkdirSync(OUTPUT_DIR);
    } 
    fs.writeFile(outputPath, htmlFile, function(err) {
        if (err) throw err;
        console.log("The file has been saved!");
    })
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
