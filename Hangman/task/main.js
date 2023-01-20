// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

const words = ['python', 'java', 'swift', 'javascript'];

function getRandomElement(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}

function menu() {
    let options;
    do {
        options = input('Type "play" to play the game, ' +
            '"results" to show the scoreboard, and "exit" to quit:');
        if (options === "play") {
            let answer = getRandomElement(words);
            let end = game(answer);
            terminateTheGame(end, answer);
        }
        if (options === "results") {
            console.log(`You won: ${win} times.`);
            console.log(`You lost: ${lost} times.`);
        }
    } while (options !== "exit");
}

function checkLetter(letter) {
    if ((letter.split("").length !== 1)) {
        console.log("Please, input a single letter.");
        return false;
    }
    if ((letter !== letter.toLowerCase()) ||
        (letter.charCodeAt(0) > 122) || (letter.charCodeAt(0) < 97)) {
        console.log("Please, enter a lowercase letter from the English alphabet.");
        return false;
    }

    return true;
}

function game(answer) {
    let attempts = 8;
    let encryptArray = new Array(answer.length).fill("-");
    let encryptAnswer = encryptArray.join('');
    let letters = [];
    while (attempts > 0) {
        console.log("");
        console.log(encryptAnswer);
        let letter = input(`Input a letter:`);
        while (!checkLetter(letter)) {
            console.log("");
            console.log(encryptAnswer);
            letter = input(`Input a letter:`);
        }
        if (letters.includes(letter)) {
            console.log(`You've already guessed this letter`);
        } else {
            letters.push(letter);
            let noLetter = true;
            for (let i = 0; i < answer.length; i++) {
                if (answer[i] === letter) {
                    encryptArray[i] = letter;
                    noLetter = false;
                }
            }
            if (noLetter) {
                attempts -= 1;
                console.log(`That letter doesn't appear in the word. # ${attempts}`);
            }
            encryptAnswer = encryptArray.join('');
        }
        if (answer === encryptAnswer) {
            return true;
        }
    }
    return false;
}

function terminateTheGame(end, answer) {
    if (end) {
        console.log(`You guessed the word ${answer}!`);
        console.log("You survived!");
        win += 1;
    } else {
        console.log("You lost!");
        lost += 1;
    }
}

let win = 0;
let lost = 0;

console.log("H A N G M A N # 8 attempts");
// let end = game(encryptArray, encryptAnswer, answer, attempts);
// terminateTheGame(end);
menu();