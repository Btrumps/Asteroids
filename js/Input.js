const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;
const KEY_SPACEBAR = 32;



function setupInput() {
	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	p1.setupControls(KEY_W, KEY_A, KEY_D, KEY_SPACEBAR);
}

function setKeyHoldState(thisKey, thisShip, setTo) {
	if (thisKey == thisShip.controlKeyForTurnLeft) {
		thisShip.keyHeld_TurnLeft = setTo;
	}

	if (thisKey == thisShip.controlKeyForTurnRight) {
		thisShip.keyHeld_TurnRight = setTo;
	}

	if (thisKey == thisShip.controlKeyForGas) {
		thisShip.keyHeld_Gas = setTo;
	}
}

function keyPressed(evt) {
	setKeyHoldState(evt.keyCode, p1, true);
	if (evt.keyCode == p1.controlKeyForShoot) {
		p1.shoot();
	}

	//evt.preventDefault(); // without this, arrows keys scroll the browser. turning off to F5
}

function keyReleased(evt) {
	setKeyHoldState(evt.keyCode, p1, false);
}