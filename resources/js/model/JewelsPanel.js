function JewelsPanel(){

	//Init double dimension tab
	this.jewels     = new Array(JewelsPanel.NUMBER_OF_LINE);
	for(var i = 0; i < this.jewels.length; i++){
		this.jewels[i] = new Array(JewelsPanel.NUMBER_OF_COLUMN);
	}

	this.jewelsType = ['TOPAZ','EMERALD','SAPPHIRE','AMETHYST','RUBY'];
	
}

JewelsPanel.NUMBER_OF_LINE    = 9;
JewelsPanel.NUMBER_OF_COLUMN  = 8;
//Minimum number of aligned jewels to destroy them and earn points
JewelsPanel.NB_JEWELS_ALIGNED = 4;

JewelsPanel.constructor = JewelsPanel;

/**
 * Complete the double dimension tab with Jewel
 */
JewelsPanel.prototype.init = function(){
	//Complete each line of the array
	for(var idLine = 0; idLine < JewelsPanel.NUMBER_OF_LINE; idLine++)
	{
		for(var idColumn = 0; idColumn < JewelsPanel.NUMBER_OF_COLUMN; idColumn++)
		{
			do{
				//Complete the array of jewel with a random jewelsType
				var jewelsType = this.jewelsType[Math.floor(Math.random()*5)];
				this.jewels[idLine][idColumn] = new Jewel(jewelsType);
				//Start the validation at this value
				var validAt = JewelsPanel.NB_JEWELS_ALIGNED-2;
				if(idColumn > validAt)
				{
					var resultLine   = this.checkLine(idColumn, idLine);
				}

				if(idLine > validAt)
				{
					var resultColumn = this.checkColumn(idColumn, idLine);
				}
			}while(resultLine || resultColumn);
			var validAt = JewelsPanel.NB_JEWELS_ALIGNED-2;
			if(idColumn > validAt){
				this.checkLine(idColumn, idLine);
			}
			if(idLine > validAt){
				this.checkColumn(idColumn, idLine);
			}

		}
	}
}


/**
 * checks if there are not three jewel of the same type in the previous cell in the same column
 */
JewelsPanel.prototype.checkColumn = function(idColumn, idLine){
	//We check the N previous ID if they are the same
	var nPreviousId = JewelsPanel.NB_JEWELS_ALIGNED-1;
	for(var i = 1; i <= nPreviousId; i++){

		if(this.jewels[idLine][idColumn].getType() !== this.jewels[idLine-i][idColumn].getType()){
			return false;
		}
	}
	console.log("checkColumn      idColumn : "+idColumn+"       idLine : "+idLine);
	return true;
};

/**
 * checks if there are not three jewel of the same type in the previous cell in the same Line
 */
JewelsPanel.prototype.checkLine = function(idColumn, idLine){
	//We check the N previous ID if they are the same
	var nPreviousId = JewelsPanel.NB_JEWELS_ALIGNED-1;
	for(var i = 1; i <= nPreviousId; i++){

		if(this.jewels[idLine][idColumn].getType() !== this.jewels[idLine][idColumn-i].getType()){
			return false;
		}
	}
	console.log("checkLine       idColumn : "+idColumn+"       idLine : "+idLine);
	return true;
};

/**
 * Show the state of the console in the table
 */
JewelsPanel.prototype.showContent = function() {
	for(var idLine = 0; idLine < JewelsPanel.NUMBER_OF_LINE; idLine++)
	{
		var stringContent = "";
		for(var idColumn = 0; idColumn < JewelsPanel.NUMBER_OF_COLUMN; idColumn++)
		{
			var type   = this.jewels[idLine][idColumn].getType();

			//Complete the string type with space for a better display in console
			var length = this.jewels[idLine][idColumn].getType().length;
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