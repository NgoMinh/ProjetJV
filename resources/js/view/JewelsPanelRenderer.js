function JewelsPanelRenderer(jewelsPanel, scene){
	this.board            = new PIXI.DisplayObjectContainer();
	this.board.position.x = JewelsPanelRenderer.MARGIN_LEFT;
	this.board.position.y = JewelsPanelRenderer.MARGIN_TOP;
	this.jewelsPanel      = jewelsPanel;
	this.scene            = scene;
	this.jewelsTexture    = new Array();
	this.controller;
	this.board.setInteractive(true);
	this.loadTexture();
	this.show();
	this.jewelsPanel.showContent(this.jewelsPanel.jewels);
}

JewelsPanelRenderer.constructor = JewelsPanelRenderer;

JewelsPanelRenderer.MARGIN_LEFT = 50;
JewelsPanelRenderer.MARGIN_TOP  = 50;
JewelsPanelRenderer.JEWEL_WIDTH = 50;
JewelsPanelRenderer.JEWEL_HEIGHT= 50;
JewelsPanelRenderer.SPACE       = 10;
JewelsPanelRenderer.SPEED       = 5;

JewelsPanelRenderer.prototype.show = function() {
	this.scene.addChild(this.board);
	for(var idLine = 0; idLine < JewelsPanel.NUMBER_OF_LINE; idLine++)
	{
		for(var idColumn = 0; idColumn < JewelsPanel.NUMBER_OF_COLUMN; idColumn++)
		{
			var type  = this.jewelsPanel.jewels[idLine][idColumn].getType();
			var jewel = new JewelRenderer(this.jewelsTexture[type], this.jewelsPanel.jewels[idLine][idColumn]);

			jewel.width      = JewelsPanelRenderer.JEWEL_WIDTH;
			jewel.height     = JewelsPanelRenderer.JEWEL_HEIGHT;
			jewel.position.x = ( (JewelsPanel.NUMBER_OF_COLUMN-idColumn-1) * JewelsPanelRenderer.JEWEL_WIDTH ) 
							  +( (JewelsPanel.NUMBER_OF_COLUMN-idColumn-1) * JewelsPanelRenderer.SPACE );
			jewel.position.y = ( (JewelsPanel.NUMBER_OF_LINE-idLine-1)     * JewelsPanelRenderer.JEWEL_HEIGHT) 
							  +( (JewelsPanel.NUMBER_OF_LINE-idLine-1)     * JewelsPanelRenderer.SPACE );

			this.board.addChild(jewel);
		}
	}
	console.log(this.board.children);
};

JewelsPanelRenderer.prototype.setController = function(controller) {
	this.controller = controller;
};

JewelsPanelRenderer.prototype.update = function() {
	for(var i = 0; i < this.board.children.length ; i++)
	{
		var jewel     = this.board.getChildAt(i).jewel;
		var idColumn  = this.jewelsPanel.getColumn(jewel);
		var idLine    = this.jewelsPanel.getLine(jewel);
		var positionX = ( (JewelsPanel.NUMBER_OF_COLUMN-idColumn-1) * JewelsPanelRenderer.JEWEL_WIDTH ) 
				       +( (JewelsPanel.NUMBER_OF_COLUMN-idColumn-1) * JewelsPanelRenderer.SPACE );
		var positionY = ( (JewelsPanel.NUMBER_OF_LINE-idLine-1)     * JewelsPanelRenderer.JEWEL_HEIGHT) 
				       +( (JewelsPanel.NUMBER_OF_LINE-idLine-1)     * JewelsPanelRenderer.SPACE );
		if( this.board.getChildAt(i).position.x !== positionX )
		{
			if( positionX - this.board.getChildAt(i).position.x > 0 )
			{
				if( this.board.getChildAt(i).position.x + JewelsPanelRenderer.SPEED < positionX )
				{
					this.board.getChildAt(i).position.x += JewelsPanelRenderer.SPEED;
				}
				else
				{
					this.board.getChildAt(i).position.x = positionX;
				}
			}
			else if( positionX - this.board.getChildAt(i).position.x < 0 )
			{
				if( this.board.getChildAt(i).position.x - JewelsPanelRenderer.SPEED > positionX )
				{
					this.board.getChildAt(i).position.x -= JewelsPanelRenderer.SPEED;
				}
				else
				{
					this.board.getChildAt(i).position.x = positionX;
				}
			}
		}
		else if( this.board.getChildAt(i).position.y !== positionY )
		{
			if( positionY - this.board.getChildAt(i).position.y > 0 )
			{
				if( this.board.getChildAt(i).position.y + JewelsPanelRenderer.SPEED < positionY )
				{
					this.board.getChildAt(i).position.y += JewelsPanelRenderer.SPEED;
				}
				else
				{
					this.board.getChildAt(i).position.y = positionY;
				}
			}
			else if( positionY - this.board.getChildAt(i).position.y < 0 )
			{
				if( this.board.getChildAt(i).position.y - JewelsPanelRenderer.SPEED > positionY )
				{
					this.board.getChildAt(i).position.y -= JewelsPanelRenderer.SPEED;
				}
				else
				{
					this.board.getChildAt(i).position.y = positionY;
				}
			}
		}
	}
};

JewelsPanelRenderer.prototype.loadTexture = function(){
	for(var i = 0; i < this.jewelsPanel.jewelsType.length; i++)
	{
		var key      = this.jewelsPanel.jewelsType[i];
		var filename = this.jewelsPanel.jewelsType[i].toLowerCase();
		this.jewelsTexture[key] = PIXI.Texture.fromImage('resources/textures/'+filename+'.png');
	}
};