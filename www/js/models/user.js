var User = function (newItem) {
	var self = this;
	self.valid = true;
	self.errors = [];

	if (typeof newItem === 'object') {
		validate(newItem);

		if (self.valid) {
			self.guid = newItem.guid;
			self.login = newItem.login;
			self.password = hash(newItem.password);
			self.property = newItem.property;
		}
	}
	else {
		self.login = '';
		self.password = '';
		self.property = 0;
	}

	function validate(item) {
		if (typeof item.login === 'undefined' || item.login === '')
			self.errors.push("Login é obrigatório");

		if (typeof item.password === 'undefined' || item.password === '')
			self.errors.push("Senha é obrigatória");

		if (typeof item.property === 'undefined' || item.property === 0)
			self.errors.push("Propriedade é obrigatória");

		self.valid = self.errors.length === 0;
	}
	
	function hash(text){
		var shaObj = new jsSHA("SHA-1", "TEXT");
		shaObj.update(text);
		return shaObj.getHash("HEX");
	}
}


