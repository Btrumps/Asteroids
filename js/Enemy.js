const ENEMY_POWER = 1.5;

const ENEMIES_TO_SPAWN = 10;
const ENEMY_COLLISION_RADIUS = 28;

const SPAWN_COLLISION_RADIUS = 90;

var enemyList = new Array(ENEMIES_TO_SPAWN);

enemyClass.prototype = new movingWrapPositionClass();

function enemyClass() {

	this.init = function (whichGraphic) {
		this.myBitmap = whichGraphic;
		this.reset();
		this.randomAng = Math.random()*Math.PI*2.0;

	}

	this.superclassReset = this.reset;
	this.reset = function () {
		this.superclassReset();
		this.x = Math.random()*canvas.width;
		this.y = Math.random()*canvas.height;

		while(this.isSpawningTooClose(p1.x, p1.y) == true) {
			this.x = Math.random()*canvas.width;
			this.y = Math.random()*canvas.height;
		}
	}

	this.superclassMove = this.move;
	this.move = function () {
		this.superclassMove();
		this.xv = Math.cos(this.randomAng) * ENEMY_POWER;
		this.yv = Math.sin(this.randomAng) * ENEMY_POWER;
		this.xv *= SPACE_SPEED_DECAY;
		this.yv *= SPACE_SPEED_DECAY
	}

	this.draw = function () {
		drawBitmapCenteredAtLocationWithRotation( this.myBitmap, this.x, this.y, 0);
	}

	this.isOverlappingPoint = function(testX, testY) {
		var deltaX = testX - this.x;
		var deltaY = testY - this.y;

		var dist = Math.sqrt ( (deltaX * deltaX) + (deltaY * deltaY) ); 
		return (dist <= ENEMY_COLLISION_RADIUS);
	}

	this.isSpawningTooClose = function(testX, testY) {
		var deltaX = testX - this.x;
		var deltaY = testY - this.y;

		var dist = Math.sqrt ( (deltaX * deltaX) + (deltaY * deltaY) ); // not sure about this math
		return (dist <= SPAWN_COLLISION_RADIUS);
	}
}

function spawnEnemies(whichPic) {
	for (i = 0; i < enemyList.length; i++) {
		enemyList[i] = new enemyClass ();
		enemyList[i].init(whichPic);
	}
}

function drawSpawnedEnemies() {
	for (i=0; i < enemyList.length; i++) {
		enemyList[i].draw();
	}
}

function moveSpawnedEnemies() {
	for (i=0; i < enemyList.length; i++) {
		enemyList[i].move();
	}
}

function checkCollisionLoop(whichShip) {
	for(i = 0; i < enemyList.length; i++) {
		whichShip.checkShipandShotCollisionAgainstEnemy(enemyList[i]);
	}
}