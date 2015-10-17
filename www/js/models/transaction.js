var Transaction = function (newItem) {
	var self = this;
	self.valid = true;
	self.errors = [];

	if(typeof newItem === 'object'){
		validate(newItem);
		
		if(self.valid){
			self.guid = newItem.guid;
			self.description = newItem.description == undefined ? '' : newItem.description;
			self.category = newItem.category;
			self.account = newItem.account;
			self.date = newItem.date;
			self.value = newItem.value;	
		}			
	}
	else{	
		self.category =  0;
		self.account =  0;
		self.date = new Date();			
	}	

	if(self.date instanceof Date)
		self.date.setHours(0,0,0,0)
	
	function validate(item) {
		if (typeof item.date === 'undefined' || item.date == null)
			self.errors.push("Data é obrigatória");
		if (typeof item.value === 'undefined' || item.value == null ||  item.value <= 0)
			self.errors.push("Valor é obrigatório");
		if (item.account === 0 || item.account == null || item.account.guid <= 0)
			self.errors.push("Conta é obrigatória");
		if (item.category === 0 || item. category == null || item.category.guid <= 0)
			self.errors.push("Categoria é obrigatória");
			
		self.valid = self.errors.length === 0;
	}
}


