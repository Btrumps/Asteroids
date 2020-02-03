const SPACE_SPEED_DECAY = 0.99;
const SHIP_POWER = 0.07;
const TURN_RATE = 0.03;

const PLAYER_RELOAD_DELAY = 10;


shipClass.prototype = new movingWrapPositionClass();

function shipClass() {

	this.reloadingWait = 0;
	this.score = 0;
	this.highScore = 0;

	this.keyHeld_Gas = false;
	this.keyHeld_TurnLeft = false;
	this.keyHeld_TurnRight = false;
	this.keyHeld_Shoot = false;

	

	/*this.x = canvas.width/2;
	this.y = canvas.height/2;
	this.xv = 0;
	this.yv = 0;

	this.ang = 0;*/

	this.init = function(whichGraphic) {
		this.myShotList = [];
		this.myBitmap = whichGraphic;
		this.reset();
	}

	this.setupControls = function( forwardKey, leftKey, rightKey, shootKey) {
		this.controlKeyForGas = forwardKey;
		this.controlKeyForTurnLeft = leftKey;
		this.controlKeyForTurnRight = rightKey;
		this.controlKeyForShoot = shootKey;
	}

	this.superclassReset = this.reset;
	this.reset = function() {
		this.superclassReset();
		this.x = canvas.width/2;
		this.y = canvas.height/2;
		this.ang = -0.5 * Math.PI;
		this.myShotList = [];

		this.score = 0;
	}

	this.superclassMove = this.move;
	this.move = function() {
		if (this.keyHeld_TurnLeft) {
			this.ang -= TURN_RATE * Math.PI; //multiply by PI (TODO)
		}
		if (this.keyHeld_TurnRight) {
			this.ang += TURN_RATE * Math.PI;
		}
		if (this.keyHeld_Gas) {
			this.xv += Math.cos(this.ang) * SHIP_POWER;
	      	this.yv += Math.sin(this.ang) * SHIP_POWER;
		}

		this.superclassMove();

		this.xv *= SPACE_SPEED_DECAY;
		this.xy *= SPACE_SPEED_DECAY;

		this.shotAndReloadUpdate();

	}

	this.shoot = function() {
		if (this.reloadingWait <= 0) {
			var nextShot = new shotClass();
			nextShot.shootFrom(this);
			this.myShotList.push(nextShot);
			this.reloadingWait = PLAYER_RELOAD_DELAY;
		}
	}

	this.draw = function() {
		for (var i = 0; i < this.myShotList.length; i++) {
			this.myShotList[i].draw();
		}

		drawBitmapCenteredAtLocationWithRotation(this.myBitmap, this.x, this.y, this.ang);
	}

	this.shotAndReloadUpdate = function() {
		if (this.reloadingWait > 0) {
			this.reloadingWait--;
		}

		for (var i = 0; i < this.myShotList.length; i++) {
			this.myShotList[i].move();
		}

		for (var i = this.myShotList.length - 1; i >= 0; i--) {
			if (this.myShotList[i].isReadyToRemove()) {
				this.myShotList.splice(i, 1);
				//console.log(this.myShotList.length); // shows that all elements get removed
			}
		}

	}

	this.checkShipandShotCollisionAgainstEnemy = function(thisEnemy) {
		if (thisEnemy.isOverlappingPoint(this.x,this.y) ) {
			this.reset();
			document.getElementById("debugText").innerHTML = "Player Crashed!";
		}

		for (var i = 0; i < this.myShotList.length; i++) {
			if (this.myShotList[i].hitTest(thisEnemy) ) {
				thisEnemy.reset();
				this.score += 100;
				this.myShotList[i].markToRemove();
				document.getElementById("debugText").innerHTML = "Enemy Blasted!";
			}
		}
	}

	this.displayScore = function() {
		colorText("SCORE: " + this.score, 15,20, 'white', '16 pt hyperspace');
		colorText("HIGHSCORE: " + this.highScore, 15,40, 'white','16pt hyperspace');

		if (this.score > this.highScore) {
			this.highScore = this.score;
		}
	}


}