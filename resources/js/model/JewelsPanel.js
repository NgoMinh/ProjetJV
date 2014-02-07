function JewelsPanel(){

	//Init double dimension tab
	this.jewels     = new Array(JewelsPanel.NUMBER_OF_LINE);
	for(var i = 0; i < this.jewels.length; i++){
		this.jewels[i] = new Array(JewelsPanel.NUMBER_OF_COLUMN);
	}

	this.jewelsType = ['TOPAZ','EMERALD','SAPPHIRE','AMETHYST','RUBY'];
	
}

JewelsPanel.NUMBER_OF_LINE   = 9;
JewelsPanel.NUMBER_OF_COLUMN = 8;

JewelsPanel.constructor = JewelsPanel;

/**
 * Complete the double dimension tab with Jewel
 */
JewelsPanel.prototype.init = function(){
	//Complete each line of the array
	for(var idLine = 0; idLine < this.jewels.length; idLine++)
	{
		for(var idColumn = 0; idColumn < this.jewels[idLine].length; idColumn++)
		{
			//Complete the array of jewel with a random jewelsType
			var jewelsType = this.jewelsType[Math.floor(Math.random()*5)];
			this.jewels[idLine][idColumn] = new Jewel(jewelsType);
		}
	}
}


/**
 * Show the state of the console in the table
 */
JewelsPanel.prototype.showContent = function() {
	for(var i = 0; i < this.jewels.length; i++)
	{
		var stringContent = "";
		for(var j = 0; j < this.jewels[i].length; j++)
		{
			var type   = this.jewels[i][j].getType();

			//Complete the string type with space for a better display in console
			var length = this.jewels[i][j].getType().length;
			if(length < 8){
				var delta = 8 - length;
				for (var x = 0; x < delta; x++){
					type += " ";
				}
			}


			stringContent += " "+type;
		}
		console.log(stringContent);
	}
};