var storage = {
	getItem: function(key){
		var data = JSON.parse(localStorage.getItem(key));
		if (typeof data === 'undefined' || data === null)
			 data = [];
		return data;
		},
    setItem: function(key, value){
		return localStorage.setItem(key, angular.toJson(value));
	}
}