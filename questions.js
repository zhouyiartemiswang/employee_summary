// List of questions for different team roles

const managerQuestions = [
    "What is your manager's name?",
    "What is your manager's id?",
    "What is your manager's email?",
    "What is your manager's office number?"
];

const engineerQuestions = [
    "What is your engineer's name?",
    "What is your engineer's id?",
    "What is your engineer's email?",
    "What is your engineer's GitHub username?"
];

const internQuestions = [
    "What is your intern's name?",
    "What is your intern's id?",
    "What is your intern's email?",
    "What is your intern's school?"
];

const typeOfMemberQuestion = "What type of team member would you like to add?";

// Initiate inquirer prompts as am empty array
let promptQuestions = [];

// Function takes input of team role (manager, engineer, intern) and return the corresponding prompt questions
function generateQuestions(role) {

    let questions = []; // initiate message property for each prompt question
    let promptNames = ["name", "id", "email", "lastQ"]; // name property for each prompt question

    // Assign questions based on role input
    switch (role) {

        case "manager":
            questions = managerQuestions;
            break;

        case "engineer":
            questions = engineerQuestions;
            break;

        case "intern":
            questions = internQuestions;
            break;

        default:
            return console.log("Please enter a valid input.");

    }

    // Generate prompt questions for each team member
    for (let i = 0; i < questions.length; i++) {

        promptQuestions[i] = {
            type: "input",
            message: questions[i],
            name: promptNames[i]
        }

    }

    // Generate prompt question to ask question about the next team member
    promptQuestions[questions.length] = {

        type: "list",
        message: typeOfMemberQuestion,
        name: "answerRole",
        choices: ["engineer", "intern", "I don't want to add any more team members"]

    };

    return promptQuestions;
}

module.exports = { generateQuestions };
