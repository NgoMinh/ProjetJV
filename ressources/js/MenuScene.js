function MenuScene(){
	Scene.call(this);
	this.setBackgroundColor(0x99DB57);
	this.playButton = new PIXI.Sprite(PIXI.Texture.fromImage("ressources/images/play_button.png"));
	console.log(this.playButton);
	this.playButton.setInteractive(true);
	this.playButton.click = function(){
		ScenesManager.goToScene('game');
	};
	this.addChild(this.playButton);
	this.setInteractive(true);
}

MenuScene.constructor = MenuScene;
MenuScene.prototype   = Object.create(Scene.prototype);