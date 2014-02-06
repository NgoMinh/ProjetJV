function ScenesManager(){

}
ScenesManager.constructor = ScenesManager;
ScenesManager.scenes = [];
ScenesManager.renderer;
ScenesManager.currentScene;
ScenesManager.prototype.create = function(width, height, container){
	if(ScenesManager.renderer) return this;
	ScenesManager.renderer = PIXI.autoDetectRenderer(width, height);
	container.append(ScenesManager.renderer.view);
	requestAnimFrame(this.loop.bind(this));
	return this;
};

ScenesManager.prototype.loop = function() {
	requestAnimFrame(this.loop.bind(this));
	if((typeof ScenesManager.currentScene === 'undefined') || ScenesManager.currentScene.isPaused()) return;
	ScenesManager.currentScene.update();
	ScenesManager.renderer.render(ScenesManager.currentScene);
};

ScenesManager.prototype.createScene = function(id, scene) {
	if(!(typeof ScenesManager.scenes[id] === 'undefined')) return undefined;
	console.log(scene);
	if(typeof scene === 'undefined') var scene = new Scene();
	ScenesManager.scenes[id] = scene;
	return scene;
};

ScenesManager.goToScene = function(id) {
	if(ScenesManager.scenes[id]){
		if(ScenesManager.currentScene) ScenesManager.currentScene.pause();
		ScenesManager.currentScene = ScenesManager.scenes[id];
		ScenesManager.currentScene.resume();
		return true;
	}
	return false;
};