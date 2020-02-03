const SHOT_LIFE = 60;
const SHOT_SPEED = 5;
const SHOT_SIZE = 1.5;

shotClass.prototype = new movingWrapPositionClass();

function shotClass() {


	this.superclassReset = this.reset;
	this.reset = function () {
		this.superclassReset();
		this.shotLife = 0;
	}

	this.markToRemove = function() {
		this.readyToRemoveFromArray = true;
	}

	this.isReadyToRemove = function() {
		return this.readyToRemoveFromArray;
	}

	this.shootFrom = function(whichShip) {
		this.x = whichShip.x;
		this.y = whichShip.y;

		this.xv = Math.cos(whichShip.ang) * SHOT_SPEED + whichShip.xv;
		this.yv = Math.sin(whichShip.ang) * SHOT_SPEED + whichShip.yv;

		this.readyToRemoveFromArray = false;

		this.shotLife = SHOT_LIFE;
	}

	this.hitTest = function(thisEnemy) {
		return thisEnemy.isOverlappingPoint(this.x, this.y);
	}

	this.superclassMove = this.move;
	this.move = function() {
		if (this.shotLife > 0) { // if the shot still has more time in its lifespan..
			this.shotLife--; // decrement time from its lifespan..
			this.superclassMove();
		} else { // if not
			this.markToRemove(); // mark it to be removed.
		}
	}

	this.draw = function() {
		if (this.shotLife > 0) {
			colorCircle( this.x, this.y, SHOT_SIZE, 'white'); 
		}
	}

}