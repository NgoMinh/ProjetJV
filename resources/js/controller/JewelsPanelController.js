function JewelsPanelController(jewelsPanel, jewelsPanelRenderer){
	this.jewelsPanel         = jewelsPanel;
	this.jewelsPanelRenderer = jewelsPanelRenderer;
	this.init();
	this.first_selected  = null;
	this.second_selected = null;
}

JewelsPanelController.constructor = JewelsPanelController;

JewelsPanelController.prototype.init = function() {
	this.jewelsPanelRenderer.setController(this);
	for(var i = 0 ; i < this.jewelsPanelRenderer.board.children.length ; i++)
	{
		this.jewelsPanelRenderer.board.getChildAt(i).setController(this);
		this.jewelsPanelRenderer.board.getChildAt(i).click = this.jewelEvent;
	}
};

JewelsPanelController.prototype.jewelEvent = function() {
	if(this.controller.first_selected === null)
	{
		this.controller.first_selected = this.jewel;
	}
	else if(this.controller.second_selected === null)
	{
		this.controller.second_selected = this.jewel;
		if(this.controller.jewelsPanel.jewelNeighbor(this.controller.first_selected,this.controller.second_selected)){
			this.controller.jewelsPanel.swap(this.controller.first_selected, this.controller.second_selected);
		}
		this.controller.first_selected  = null;
		this.controller.second_selected = null;
	}
};