var transactionSync = {};

transactionSync.convertTransaction = function (serverData) {
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
			guid: String(serverItem.Id),
			description: serverItem.Description,
			date: convertDate(serverItem.Date),
			value: serverItem.Value,
			category: categorySync.convertItem(serverItem.Category),
			account: accountSync.convertItem(serverItem.Account)
		};

		function convertDate(serverDate) {
			var dateInNumbers = parseInt(serverDate.match(/\d+/)[0]);
			return new Date(dateInNumbers);
		}
	}
};

transactionSync.convertToPost = function (itens) {
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

transactionSync.convertItemToPost = function (item) {
	return {
		Id: item.guid,
		Description: item.description,
		Date: convertDate(item.date),
		Value: String(item.value),
		CategoryId: item.category.guid,
		AccountId: item.account.guid
	};

	function convertDate(localDate) {
		var date = new Date(localDate);
		var serverDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		return serverDate;
	}
};

transactionSync.convertToDelete = function(itens){
	var result = [];
	var quantityOfItens = itens.length;

	for (var i = 0; i < quantityOfItens; i++) {
		var localItem = itens[i];
		if (localItem.changed) {
			var item = this.convertItemToDelete(localItem);
			result.push(item);
		}
	}
	return result;
};

transactionSync.convertItemToDelete = function (item) {
	return {
		Id: item.guid
	};
};

