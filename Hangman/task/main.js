// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

let words = ['python', 'java', 'swift', 'javascript'];

function getRandomElement(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}

function guessWord() {
    let word = input("Guess the word: ");
    if (word === answer) {
        console.log("You survived!");
    } else {
        console.log("You lost!");
    }
}

let answer = getRandomElement(words);

console.log("H A N G M A N");
console.log("The game will be available soon.");

guessWord();