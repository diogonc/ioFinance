var Category = function (newItem) {
	var self = this;
	self.valid = true;
	self.errors = [];

	if(typeof newItem === 'object'){
		validate(newItem);
		
		if(self.valid){
			self.guid = newItem.guid;
			self.name = newItem.name;
			self.type = newItem.type;	
			self.priority = newItem.priority;
		}			
	}
	else{	
		self.name =  '';
		self.type = 'debit';
		self.priority = 1;
	}	
	
	function validate(item) {
		if (typeof item.name === 'undefined' || item.name === '')
			self.errors.push("Nome é obrigatório");
		if (typeof item.type === 'undefined')
			self.errors.push("Tipo é obrigatório");
			
		self.valid = self.errors.length === 0;
	}
}


