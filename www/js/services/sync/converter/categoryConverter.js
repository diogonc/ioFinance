var categoryConverter = {};

categoryConverter.convertFromServer = function(serverData) {
	var result = [];
	var quantityOfItens = serverData.length;

	for (var i = 0; i < quantityOfItens; i++) {
		var serverItem = serverData[i];
		var item = this.convertItem(serverItem);
		result.push(item);
	}
	return result;
};

categoryConverter.convertItem = function(serverItem) {
		return {
			guid: String(serverItem.uuid),
			name: serverItem.name,
			type: convertType(serverItem.categoryType)
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
	};
};

categoryConverter.convertToServer = function (itens) {
	var result = [];
	var quantityOfItens = itens.length;

	for (var i = 0; i < quantityOfItens; i++) {
		var localItem = itens[i];
		if (localItem.changed) {
			var item = this.convertItemToPost(localItem);
			result.push(item);
		}
	}
	return result;
};

categoryConverter.convertItemToPost = function (item) {
	return {
		data: {
			uuid: String(item.guid),
			name: item.name,
			categoryType: convertType(item.type),
			propertyUuid: 1	
		},
		new: item.created === true
		
	};
	
	function convertType(type){
		if(type === 'Débito')
			return 'debit';
		else if (type === 'Crédito')
			return 'credit';
		else if (type === 'Transferência de crédito')
			return 'creditTransfer';
		else if (type === 'Transferência de débito')
			return 'debitTransfer';
		else return 'debit';
	}
};

