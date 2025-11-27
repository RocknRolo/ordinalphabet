// Author: Roeland L.C. Kemp

const LOWEST = 1;
const HIGHEST = 26;

const INACTIVE_BG = "#1A1A1A";
const ACTIVE_BG = "#000000";

const ordinal = document.getElementById("ordinal");

const right_text = document.getElementById("right_text");
const wrong_text = document.getElementById("wrong_text");


let rightCounter = 0;
let wrongCounter = 0;

let answerArray = [];
let currentAnswer;
let leftFieldActive = true;

question_left.onkeypress = function(e) {
    if (e.which == 13) {
        checkAnswer();
    }
    let chr = String.fromCharCode(e.which);
    return /^[A-Za-z]$/.test(chr);
}

question_right.onkeypress = function(e) {
    if (e.which == 13) {
        checkAnswer();
    }
    let chr = String.fromCharCode(e.which);
    return ("0123456789".indexOf(chr) >= 0);
}

left_radio.onclick = function () {
    if (!leftFieldActive) {
        leftFieldActive = true;
        newQuestion();
        question_left.focus();
    }
};

right_radio.onclick = function () {
    if (leftFieldActive) {
        leftFieldActive = false;
        newQuestion();
        question_right.focus();
    }
};

function newQuestion() {
    resetFields();
    if (answerArray.length == 0) {
        populateAnswers();
    }

    currentAnswer = answerArray.pop();
    
    if (currentAnswer % 20 == 1) {
        ordinal.textContent = "st";
    } else 
    if (currentAnswer % 20 == 2) {
        ordinal.textContent = "nd";
    } else 
    if (currentAnswer % 20 == 3) {
        ordinal.textContent = "rd";
    } else {
        ordinal.textContent = "th";
    }

    if (leftFieldActive) {
        question_right.disabled = true;
        question_right.setAttribute("style", "background: " + INACTIVE_BG);
        question_left.disabled = false;
        question_left.setAttribute("style", "background: " + ACTIVE_BG);
        question_left.focus();
        
        question_right.value = currentAnswer;
    } else {
        question_left.disabled = true;
        question_left.setAttribute("style", "background: " + INACTIVE_BG);
        question_right.disabled = false;
        question_right.setAttribute("style", "background: " + ACTIVE_BG);
        question_right.focus();

        question_left.value = decToChar(currentAnswer);
    }
}

function checkAnswer() {
    if (question_left.value.toUpperCase() == decToChar(currentAnswer) &&
        question_right.value == currentAnswer) {
        rightCounter++;
        right_text.textContent = rightCounter;
        newQuestion();
    } else {
        wrongCounter++;
        wrong_text.textContent = wrongCounter;
    }
}

function resetFields() {
    let fields = document.getElementsByClassName("question");
    for (let i = 0; i < fields.length; i++) {
        fields[i].value = '';
    }
}

function numRange(start, end) {
  return Array.apply(0, Array(end - start + 1))
    .map((o, index) => index + start);
}

function populateAnswers() {
    answerArray = numRange(LOWEST, HIGHEST).map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function decToChar(dec) {
    return String.fromCharCode(64 + dec);
}

function charToDec(char) {
    return char.charCodeAt() - 64;
}

populateAnswers();
newQuestion();
