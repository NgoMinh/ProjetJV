function GameScene(){
	Scene.call(this);
	this.jewelsPanel = new JewelsPanel();
	this.jewelsPanel.init();
	this.jewelsPanel.showContent();
	this.setBackgroundColor(0x4DC0CA);
}

GameScene.constructor = GameScene;
GameScene.prototype   = Object.create(Scene.prototype);