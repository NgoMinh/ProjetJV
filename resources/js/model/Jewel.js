function Jewel(type){
	this.type = type;
}

Jewel.constructor = Jewel;

Jewel.prototype.getType = function() {
	return this.type;
};

