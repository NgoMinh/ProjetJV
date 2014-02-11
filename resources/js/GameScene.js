function GameScene(){
	Scene.call(this);
	this.jewelsPanel = new JewelsPanel();
	this.jewelsPanel.init();
	this.jewelsPanelRenderer = new JewelsPanelRenderer(this.jewelsPanel, this);
	this.setBackgroundColor(0x4DC0CA);
	this.setInteractive(true);
}

GameScene.constructor = GameScene;
GameScene.prototype   = Object.create(Scene.prototype);