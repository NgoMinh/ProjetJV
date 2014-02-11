function JewelRenderer(texture, jewel){
	PIXI.Sprite.call(this, texture);
	this.jewel = jewel;
	this.controller;
	this.setInteractive(true);
}

JewelRenderer.constructor = JewelRenderer;
JewelRenderer.prototype   = Object.create(PIXI.Sprite.prototype);

JewelRenderer.prototype.setController = function(controller) {
	this.controller = controller;
};
