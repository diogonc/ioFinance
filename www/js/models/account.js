var Account = function (newItem) {
	var self = this;
	self.valid = true;
	self.errors = [];

	if(typeof newItem === 'object'){
		validate(newItem);
		
		if(self.valid){
			self.guid = newItem.guid;
			self.name = newItem.name;
		}			
	}
	else{	
		self.name =  '';
	}	
	
	function validate(item) {
		if (typeof item.name === 'undefined' || item.name === '')
			self.errors.push("Nome é obrigatório");
			
		self.valid = self.errors.length === 0;
	}
}