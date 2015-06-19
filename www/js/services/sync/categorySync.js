var categorySync = {};

categorySync.convertCategory = function(serverData) {
	var result = [];
	var quantityOfItens = serverData.length;

	for (var i = 0; i < quantityOfItens; i++) {
		var serverItem = serverData[i];
		var item = this.convertItem(serverItem);
		result.push(item);
	}
	return result;
};

categorySync.convertItem = function(serverItem) {
		return {
			guid: String(serverItem.Id),
			name: serverItem.Name,
			type: convertType(serverItem.TransactionType)
		};

		function convertType(type){
		if(type === 0)
			return 'Débito';
		else if (type === 1)
			return 'Crédito';
		else if (type === 2)
			return 'Transferência de crédito';
		else if (type === 3)
			return 'Transferência de débito';
		else return 'Débito';
	}
};

	