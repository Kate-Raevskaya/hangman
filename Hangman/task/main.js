const words = ['python', 'java', 'swift', 'javascript'];


function getRandomElement(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}

function prepareNewGame() {
    answer = getRandomElement(words);
    attempts = 9;
    updateAttempts();
    letters = [];
    addLetter(answer);
}


function updateAttempts() {
    let countOfAttempts = document.getElementById("number-of-attempts");
    countOfAttempts.innerText = `${attempts}`;
}

function updateResults() {
    let countOfWin = document.getElementById("number-of-wins");
    let countOfLost = document.getElementById("number-of-loss");
    countOfWin.innerText = `${win}`;
    countOfLost.innerText = `${lost}`;
}


function addLetter(answer) {
    word.replaceChildren();
    let arrayLetters = answer.split("");
    for (let i = 0; i < arrayLetters.length; i++) {
        let letter = document.createElement("p");
        letter.className = `letter`;
        letter.setAttribute("id", `letter${i}`);
        word.appendChild(letter);
    }
}

function addButton(word) {
    let button = document.createElement("button");
    button.innerText = `Play again`;
    button.setAttribute('id', "button");
    button.addEventListener('click', () => {
        prepareNewGame();
        message.remove();
        button.remove();
    });

    word.insertAdjacentElement("afterend", button);
}

function addMessage(text, word) {
    message = document.createElement("p");
    message.innerText = `${text}`;
    message.setAttribute('id', "message");
    word.insertAdjacentElement("beforebegin", message);
}


function checkInput(letter, letters) {
    let promptLine = document.getElementById("promptLine");
    if ((letter.split("").length !== 1)) {
        promptLine.innerText = "Please, input a single letter";
        return false;
    } else if ((letter !== letter.toLowerCase()) ||
        (letter.charCodeAt(0) > 122) || (letter.charCodeAt(0) < 97)) {
        promptLine.innerText = "Please, enter a lowercase letter from the English alphabet";
        return false;
    } else if (letters.includes(letter)) {
        promptLine.innerText = "You've already guessed this letter";
        return false;
    } else {
        promptLine.innerText = "";
        return true;
    }
}

function checkLetter(answer, letter, rightAnswer) {
    let noLetter = true;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === letter) {
            noLetter = false;
            let placeForLetter = document.getElementById(`letter${i}`);
            placeForLetter.innerText = `${letter}`;
            rightAnswer[i] = letter;
        }
    }
    if (noLetter) {
        attempts--;
        updateAttempts();
    }
}

function isGameOver(answer, rightAnswer) {
    let gameOver = true;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] !== rightAnswer[i]) {
            gameOver = false;
        }
    }
    if (attempts === 0) {
        gameOver = true;
    }
    return gameOver;
}

function terminateTheGame() {
    if (attempts === 0) {
        lost++;
        addMessage(`You lost :(`, word);
        addMessage(`Answer: ${answer}`, word);
    } else {
        win++;
        addMessage('You won!', word);
    }
    updateResults();
    addButton(word);
}





let word = document.getElementById("word");
let message;
let answer;
let rightAnswer = [];
let letters;
let attempts;
let win = 0;
let lost = 0;

prepareNewGame();

updateResults(win, lost);


let inputLetter = document.getElementById("guess-letter");
inputLetter.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let letter = inputLetter.value;
        if (checkInput(letter, letters)) {
            letters.push(letter);
            checkLetter(answer, letter, rightAnswer);
            if (isGameOver(answer, rightAnswer)) {
                terminateTheGame();
            }
        }
        inputLetter.value = "";
    }
})