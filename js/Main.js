var canvas, canvasContext;

var p1 = new shipClass();
var enemy = new enemyClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	loadImages();
}

function loadingDoneSoStartGame() {
	var fps = 60;

	setInterval(updateAll, 1000/fps);
	
	p1.init(playerPic);

	spawnEnemies(enemyPic);

	setupInput();
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	p1.move();
	moveSpawnedEnemies();

	checkCollisionLoop(p1);
}

function drawAll() {
	colorRect(0,0, canvas.width,canvas.height, 'black');

	p1.draw();
	drawSpawnedEnemies();
	p1.displayScore();
}