var User = function (newItem) {
	var self = this;
	self.valid = true;
	self.errors = [];

	if (typeof newItem === 'object') {
		validate(newItem);

		if (self.valid) {
			self.guid = newItem.guid;
			self.login = newItem.login;
			self.token = hash(newItem.password);
			self.password = newItem.password;
			self.url = newItem.url !== undefined ? newItem.url : 'http://financeserver-diogonc.rhcloud.com/';
			self.propertyId = newItem.propertyId;
			self.active = false;

			self.propertyId = fixPropertyId(self.login);
		}
	}
	else {
		self.login = '';
		self.token = '';
		self.password = '';
		self.url = '';
		self.propertyId = 0;
		self.active = false;
	}

	function validate(item) {
		if (typeof item.login === 'undefined' || item.login === '')
			self.errors.push("Login é obrigatório");	

		if (typeof item.password === 'undefined' || item.password === '')
			self.errors.push("Senha é obrigatória");

		self.valid = self.errors.length === 0;
	}

	function hash(text) {
		var shaObj = new jsSHA("SHA-1", "TEXT");
		shaObj.update(text);
		return shaObj.getHash("HEX");
	}

	function fixPropertyId(login){
		if(login === 'cervinho')
			return 1002;
		if(login === 'laranjeira')
			return 1003
	}
}
