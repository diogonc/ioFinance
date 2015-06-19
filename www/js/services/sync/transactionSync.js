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

		function convertDate(serverDate){
			var dateInNumbers = parseInt(serverDate.match(/\d+/)[0]);
			return new Date(dateInNumbers);
		}
	}
};