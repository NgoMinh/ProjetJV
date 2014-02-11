function JewelRenderer(texture, jewel){
	PIXI.Sprite.call(this, texture);
	this.jewel = jewel;
	this.setInteractive(true);
	this.click = function(){
		console.log(this.jewel);
	}
}

JewelRenderer.constructor = JewelRenderer;
JewelRenderer.prototype   = Object.create(PIXI.Sprite.prototype);
