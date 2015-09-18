var transactionConverter = {};

transactionConverter.convertTransaction = function (serverData) {
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
			category: categoryConverter.convertItem(serverItem.Category),
			account: accountConverter.convertItem(serverItem.Account)
		};

		function convertDate(serverDate) {
			return new Date(serverDate+'T12:00:00.000Z');
		}
	}
};

transactionConverter.convertToPost = function (itens) {
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

transactionConverter.convertItemToPost = function (item) {
	return {
		uuid: item.guid,
		description: item.description,
		date: item.date,
		value: String(item.value),
		category: item.category.guid,
		account: item.account.guid,
		payed: 'true',
		propertyUuid: 1
	};

	function convertDate(localDate) {
		var date = new Date(localDate);
		var serverDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		return serverDate;
	}
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
