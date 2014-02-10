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
	do
	{
		for(var idLine = 0; idLine < JewelsPanel.NUMBER_OF_LINE; idLine++)
		{
			for(var idColumn = 0; idColumn < JewelsPanel.NUMBER_OF_COLUMN; idColumn++)
			{
				do{
					//Complete the array of jewel with a random jewelsType
					var jewelsType = this.jewelsType[Math.floor(Math.random()*5)];
					this.jewels[idLine][idColumn] = new Jewel(jewelsType);
					//Start the validation at this value
					var validAt = JewelsPanel.NB_JEWELS_ALIGNED - 2;
					if(idColumn > validAt)
					{
						var resultLine   = this.checkLine(idColumn, idLine);
					}

					if(idLine > validAt)
					{
						var resultColumn = this.checkColumn(idColumn, idLine);
					}
				}while(resultLine || resultColumn);

			}
		}
	}while(this.checkSolution() !== true);
}

JewelsPanel.prototype.checkSolution = function() {
	var tab_jewels_copy = this.createCopy();
	for(var idLine = 0; idLine < JewelsPanel.NUMBER_OF_LINE; idLine++)
	{
		for(var idColumn = 0; idColumn < JewelsPanel.NUMBER_OF_COLUMN; idColumn++)
		{
			if(idLine > 0)
			{
				this.swap(tab_jewels_copy[idLine][idColumn], tab_jewels_copy[idLine-1][idColumn], tab_jewels_copy);
				if(this.getJewelsInARow(tab_jewels_copy).length > 0)
				{
					//console.log('L-1      idLine :'+idLine+'          idColumn'+idColumn);
					return true;
				}
				this.swap(tab_jewels_copy[idLine][idColumn], tab_jewels_copy[idLine-1][idColumn], tab_jewels_copy);
			}
			if(idColumn > 0)
			{
				this.swap(tab_jewels_copy[idLine][idColumn], tab_jewels_copy[idLine][idColumn-1], tab_jewels_copy);
				if(this.getJewelsInARow(tab_jewels_copy).length > 0)
				{
					//console.log('C-1      idLine :'+idLine+'          idColumn'+idColumn);
					return true;
				}
				this.swap(tab_jewels_copy[idLine][idColumn], tab_jewels_copy[idLine][idColumn-1], tab_jewels_copy);
			}
		}
	}
	return false;
};

/**
 * return array with all jewel in a row
 */
JewelsPanel.prototype.getJewelsInARow = function(tab) {
	var j_delete_list = new Array();
	//Add aligned jewel on the same line
	for(var idLine = 0; idLine < JewelsPanel.NUMBER_OF_LINE; idLine++)
	{
		var j_type = tab[idLine][0].getType();
		var j_list = [];
		j_list.push(tab[idLine][0]);
		for(var idColumn = 1; idColumn < JewelsPanel.NUMBER_OF_COLUMN; idColumn++)
		{
			if(j_type == tab[idLine][idColumn].getType())
			{
				j_list.push(tab[idLine][idColumn]);
			}
			else
			{
				if( j_list.length >= JewelsPanel.NB_JEWELS_ALIGNED )
				{
					console.log('number of jewels in a row same line : '+j_list.length);
					for(var i = 0; i < j_list.length ; i++)
					{
						if( jQuery.inArray(j_list[i], j_delete_list) == -1 )
						{
							j_delete_list.push(j_list[i]);
						}	
					}
				}
				j_list.length = 0;
				j_type        = tab[idLine][idColumn].getType();
				j_list.push(tab[idLine][idColumn]);
			}
		}
		if( j_list.length >= JewelsPanel.NB_JEWELS_ALIGNED )
		{
			console.log('number of jewels in a row same column : '+j_list.length);
			for(var i = 0; i < j_list.length ; i++)
			{
				if( jQuery.inArray(j_list[i], j_delete_list) == -1 )
				{
					j_delete_list.push(j_list[i]);
				}
			}
		}
	}

	//add aligned jewel on the same column
	for(var idColumn = 0; idColumn < JewelsPanel.NUMBER_OF_COLUMN; idColumn++)
	{	
		var j_type = tab[0][idColumn].getType();
		var j_list = [];
		j_list.push(tab[0][idColumn]);
		for(var idLine = 1; idLine < JewelsPanel.NUMBER_OF_LINE; idLine++)
		{
			if(j_type == tab[idLine][idColumn].getType())
			{
				j_list.push(tab[idLine][idColumn]);
			}
			else
			{
				if( j_list.length >= JewelsPanel.NB_JEWELS_ALIGNED )
				{
					console.log('number of jewels in a row same column : '+j_list.length);
					for(var i = 0; i < j_list.length ; i++)
					{
						if( jQuery.inArray(j_list[i], j_delete_list) == -1 )
						{
							j_delete_list.push(j_list[i]);
						}	
					}
				}
				j_list.length = 0;
				j_type        = tab[idLine][idColumn].getType();
				j_list.push(tab[idLine][idColumn]);
			}
		}
		if( j_list.length >= JewelsPanel.NB_JEWELS_ALIGNED )
		{
			console.log('number of jewels in a row same column : '+j_list.length);
			for(var i = 0; i < j_list.length ; i++)
			{
				if( jQuery.inArray(j_list[i], j_delete_list) == -1 )
				{
					j_delete_list.push(j_list[i]);
				}	
			}
		}
	}

	return j_delete_list;
};

JewelsPanel.prototype.createCopy = function() {
	var copy_jewels = new Array();
	for(var idLine = 0; idLine < JewelsPanel.NUMBER_OF_LINE; idLine++)
	{
		copy_jewels[idLine] = new Array();
		for(var idColumn = 0; idColumn < JewelsPanel.NUMBER_OF_COLUMN; idColumn++)
		{
			copy_jewels[idLine].push(new Jewel(this.jewels[idLine][idColumn].getType()));
		}
	}
	return copy_jewels;
};

JewelsPanel.prototype.removeJewels = function(array) {
	for(var i = 0; i < array.length; i++)
	{
		this.remove(array[i]);
	}
};

JewelsPanel.prototype.remove = function(jewel){
	var id = this.jewels.indexOf(jewel);
	this.jewels.remove(id);
};

JewelsPanel.prototype.swap = function(jewel1, jewel2, tab){
	
	var jewel1_L = this.getLine(jewel1, tab);
	var jewel1_C = this.getColumn(jewel1, tab);
	var jewel2_L = this.getLine(jewel2, tab);
	var jewel2_C = this.getColumn(jewel2, tab);

	tab[jewel1_L][jewel1_C] = jewel2;
	tab[jewel2_L][jewel2_C] = jewel1;
};

JewelsPanel.prototype.getLine = function(jewel, tab) {
	for(var idLine = 0; idLine < JewelsPanel.NUMBER_OF_LINE ; idLine++)
	{
		if(jQuery.inArray(jewel, tab[idLine]) != -1)
		{
			var line = idLine;
		}
	}
	return line;
};

JewelsPanel.prototype.getColumn = function(jewel, tab) {
	return tab[this.getLine(jewel, tab)].indexOf(jewel);
};


/**
 * checks if there are not three jewel of the same type in the previous cell in the same column
 */
JewelsPanel.prototype.checkColumn = function(idColumn, idLine){
	//We check the N previous ID if they are the same
	var nPreviousId = JewelsPanel.NB_JEWELS_ALIGNED - 1 ;
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
	var nPreviousId = JewelsPanel.NB_JEWELS_ALIGNED - 1 ;
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
JewelsPanel.prototype.showContent = function(tab) {
	for(var idLine = 0; idLine < JewelsPanel.NUMBER_OF_LINE; idLine++)
	{
		var stringContent = "";
		for(var idColumn = 0; idColumn < JewelsPanel.NUMBER_OF_COLUMN; idColumn++)
		{
			var type   = tab[idLine][idColumn].getType();

			//Complete the string type with space for a better display in console
			var length = tab[idLine][idColumn].getType().length;
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