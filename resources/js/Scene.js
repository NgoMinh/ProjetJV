function Scene(){
	PIXI.Stage.call(this, 0x7A18E7);
	this.paused = false;
	this.updateCB = function(){};
}

Scene.constructor = Scene;
Scene.prototype   = Object.create(PIXI.Stage.prototype);

Scene.prototype.onUpdate = function(callback) {
	this.updateCB = callback;
};

Scene.prototype.update = function() {
	this.updateCB();
};

Scene.prototype.pause = function() {
	this.paused = true;
};

Scene.prototype.resume = function() {
	this.paused = false;
};

Scene.prototype.isPaused = function() {
	return this.paused;
};