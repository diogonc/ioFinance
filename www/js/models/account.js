var Account = function (newItem) {
	var self = this;
	self.valid = true;
	self.errors = [];
	
	validate(newItem);
	if(self.valid){
		self.guid = newItem.guid;
		self.name = newItem.name;
		self.priority = newItem.priority;
	}	
	
	function validate(item) {
		if (typeof item === 'undefined' || item === '')
			self.errors.push("Conta é obrigatório");
		else 
			if (typeof item.name === 'undefined' || item.name === '')
				self.errors.push("Nome é obrigatório");
			
		self.valid = self.errors.length === 0;
	}
}