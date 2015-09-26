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

categoryConverter.convertTypeFromServer = function (type){
	if(type === 'debit')
		return 'Débito';
	else if (type === 'credit')
		return 'Crédito';
	else if (type === 'creditTransfer')
		return 'Transferência de crédito';
	else if (type === 'debitTransfer')
		return 'Transferência de débito';
	else return 'Débito';
};

categoryConverter.convertItem = function(serverItem) {
		return {
			guid: String(serverItem.uuid),
			name: serverItem.name,
			type: this.convertTypeFromServer(serverItem.categoryType)
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

categoryConverter.convertTypeToServer = function (type){
		if(type === 'Débito')
			return 'debit';
		else if (type === 'Crédito')
			return 'credit';
		else if (type === 'Transferência de crédito')
			return 'creditTransfer';
		else if (type === 'Transferência de débito')
			return 'debitTransfer';
		else return 'debit';
};

categoryConverter.convertItemToPost = function (item) {
	return {
		data: {
			uuid: String(item.guid),
			name: item.name,
			categoryType: this.convertTypeToServer(item.type),
			propertyUuid: 1	
		},
		new: item.created === true		
	};
};

