angular.module("finance").factory("TransactionRepository", function () {
	var transactionRepository = new Repository('transaction', storage);

	var getAll = function (year, month, categoryGuid, accountGuid) {
		var filteredItens = [];
		var itens = transactionRepository.getAll();
		var length = itens.length;

		for (var index = 0; index < length; index++) {
			var transaction = itens[index];
			var date = new Date(transaction.date);
			var monthOfTransaction = date.getMonth();
			var yearOfTransaction = date.getFullYear();

			if 	((yearOfTransaction === year && monthOfTransaction === month - 1) &&
					((categoryGuid == 0 && accountGuid == 0) ||
					(accountGuid == 0 && String(transaction.category.guid) === categoryGuid) ||
					(categoryGuid == 0 && String(transaction.account.guid) === accountGuid) ||
					(String(transaction.category.guid) === categoryGuid && String(transaction.account.guid) === accountGuid))){
						filteredItens.push(transaction);
			}
		}

		var orderedItens = filteredItens.sort(function(item, anotherItem){
			return new Date(anotherItem.date) - new Date(item.date);
		});

		return orderedItens;
	};

	return {
		getAll: getAll,
		getAllDeleted: transactionRepository.getAllDeleted,
		getAllTransactions: transactionRepository.getAll,
		save: transactionRepository.save,
		delete: transactionRepository.delete,
		get: transactionRepository.get,
		updateAllData: transactionRepository.updateAllData,
		changeId: transactionRepository.changeId,
		clearDeleted: transactionRepository.clearDeleted
	}
});
