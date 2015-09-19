angular.module("finance").factory("TransactionRepository", function () {
	var repository = new Repository('transaction', storage);

	var getAllWithFilters = function (year, month, categoryGuid, accountGuid) {
		var filteredItens = [];
		var itens = repository.getAll();
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
		getAll: repository.getAll,
		getAllDeleted: repository.getAllDeleted,
		getAllWithFilters: getAllWithFilters,
		save: repository.save,
		delete: repository.delete,
		get: repository.get,
		updateAllData: repository.updateAllData,
		clearDeleted: repository.clearDeleted
	}
});
