

/* GLOBALS */
"use strict";

var ANSWER = "rgb(100, 100, 100)";
var NUMBOXES = 6;


// GENERATING COLORS //

function generateSingleColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function generateColors(numBoxes) {
	var colors = [];

	// generate random colors
	for (var i=0; i<numBoxes; i++) {
		colors.push(generateSingleColor());
	}

	// replace a color with the correct one
	var i = Math.floor(Math.random() * numBoxes);
	colors[i] = ANSWER;
	return colors;
}

function applyColors(colors) {
	var divs = document.getElementsByClassName('color');	
	colors.forEach(function (el, i) {
		console.log('div[' + i + '] ' + divs[i]);
		divs[i].style.backgroundColor = el;
	})
} 


// BUTTON EVENTS //

function clickedOnDiv() {
	if (!(this.style.backgroundColor === ANSWER)) {
		this.classList.add('hide');
		document.getElementById('info').innerHTML = 'Try Again'
	}
	else {
		document.getElementById('info').textContent = 'Correct!'
		finishGame();
	}
}

function changeHeaderTitle() {
	document.getElementById('title-rgb').textContent = ANSWER;
}

function changeHeaderBackground(color) {
	document.querySelector('header').style.backgroundColor = color;
}

function setEasyMode() {
	if (!document.getElementById('easy').classList.value) {
		changeMode('easy')
	}
}

function setHardMode() {
	if (!document.getElementById('hard').classList.value) {
		changeMode('hard')
	}
}

function changeMode(mode) {
	var easy = document.getElementById('easy');
	var hard = document.getElementById('hard');
	easy.classList.remove('active');
	hard.classList.remove('active');
	if (mode === 'easy') {
		NUMBOXES = 3;
		easy.classList.add('active');
	}
	else {
		NUMBOXES = 6;
		hard.classList.add('active');
	}
	var divs = document.getElementsByClassName('color');
	for (var i=0; i<divs.length; i++) {
		if (i<NUMBOXES) {
			divs[i].classList.remove('hidden');
		} else {
			divs[i].classList.add('hidden');
		}
	}
	startGame();
}

function startGame() {
	ANSWER = generateSingleColor();
	changeHeaderTitle();
	changeHeaderBackground('#33658A')
	document.querySelector('#newGame li').textContent = 'New colors';
	var colors = generateColors(NUMBOXES);
	console.log('colors from gameloop: ' + colors);
	applyColors(colors);
}

function finishGame() {
	// change header background
	changeHeaderBackground(ANSWER);

	// change menu option
	document.querySelector('#newGame li').textContent = 'Play again?';

	// change box backgrounds
	var colors = [];
	for (var i=0; i<NUMBOXES; i++) {
		colors.push(ANSWER);
	}
	applyColors(colors);

	// unhide all boxes.
	var divs = document.getElementsByClassName('color');	
	for (var i=0; i<NUMBOXES; i++) {
		divs[i].classList.remove('hide');
	}
}

function game() {
	// set up color boxes
	var divs = document.getElementsByClassName('color');	
	for (var i=0; i<NUMBOXES; i++) {
		divs[i].addEventListener('click', clickedOnDiv);
	}

	// set up new colors button
	var newColors = document.getElementById('newGame');
	newColors.addEventListener('click', startGame);

	// set up easy / hard mode buttons
	var easy = document.getElementById('easy');
	var hard = document.getElementById('hard');
	easy.addEventListener('click', setEasyMode);
	hard.addEventListener('click', setHardMode);

	startGame()
}

game();