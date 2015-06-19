var accountSync = {};

accountSync.convertAccount = function (serverData) {
	var result = [];
	var quantityOfItens = serverData.length;

	for (var i = 0; i < quantityOfItens; i++) {
		var serverItem = serverData[i];
		var item = this.convertItem(serverItem);
		result.push(item);
	}
	return result;
};

accountSync.convertItem = function(serverItem) {
	return {
		guid: String(serverItem.Id),
		name: serverItem.Name
	};
};
