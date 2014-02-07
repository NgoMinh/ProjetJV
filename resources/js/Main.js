function Main (){
	this.scenesManager = new ScenesManager();
	this.scenesManager.create(1280, 768, $('#renderer-container'));
	this.menuScene = new MenuScene();
	this.gameScene = new GameScene();
	var menu = this.scenesManager.createScene('menu',this.menuScene);
	var game = this.scenesManager.createScene('game',this.gameScene);
	//var game = this.scenesManager.createScene('game', 0x30BFDE);
	ScenesManager.goToScene('menu');
}