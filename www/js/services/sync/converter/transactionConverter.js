var transactionConverter = {};

transactionConverter.convertFromServer = function (serverData) {
	var result = [];
	var quantityOfItens = serverData.length;

	for (var i = 0; i < quantityOfItens; i++) {
		var serverItem = serverData[i];
		var item = convertItem(serverItem);
		result.push(item);
	}
	return result;

	function convertItem(serverItem) {
		return {
			guid: String(serverItem.uuid),
			description: serverItem.description,
			date: serverItem.date,
			value: serverItem.value,
			category: categoryConverter.convertItem(
				{	uuid: serverItem.categoryUuid, 
					name: serverItem.categoryName, 
					categoryType: serverItem.categoryType
				}	),
			account: accountConverter.convertItem(
				{	uuid: serverItem.accountUuid,
					name: serverItem.accountName
				})
		};
	}
};

transactionConverter.convertToServer = function (itens, propertyUuid) {
	var result = [];
	var quantityOfItens = itens.length;

	for (var i = 0; i < quantityOfItens; i++) {
		var localItem = itens[i];
		if (localItem.changed) {
			var item = this.convertItemToPost(localItem, propertyUuid);
			result.push(item);
		}
	}
	return result;
};

transactionConverter.convertItemToPost = function (item, propertyUuid) {
	return {
		data:{
			uuid: item.guid,
			description: (item.description == "")? "#" : item.description,
			date: item.date,
			value: String(item.value),
			categoryUuid: item.category.guid,
			categoryName: item.category.name,
			categoryType: categoryConverter.convertTypeToServer(item.category.type),
			accountUuid: item.account.guid,
			accountName: item.account.name,
			payed: 'true',
			propertyUuid: propertyUuid	
		},
		new: item.created === true		
	};
};

transactionConverter.convertToDelete = function(itens){
	var result = [];
	var quantityOfItens = itens.length;
	for (var i = 0; i < quantityOfItens; i++) {
		var localItem = itens[i];
		var item = this.convertItemToDelete(localItem);
		result.push(item);
	}
	return result;
};

transactionConverter.convertItemToDelete = function (item) {
	return {
		transactionId: item.guid
	};
};
