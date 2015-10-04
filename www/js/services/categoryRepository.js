angular.module("finance").factory("CategoryRepository", function(){
	var repository = new Repository('category', storage);
				
	var getCreditTransfer = function(){
		var categories = repository.getAll();

		return categories.find(function(category){
			return category.type === 'Transferência de crédito';
		});
	};

	var getDebitTransfer = function(){
		var categories = repository.getAll();

		return categories.find(function(category){
			return category.type === 'Transferência de débito';
		});
	};

	var getAll = function (){
		var categories = repository.getAll();

		var orderedItens = categories.sort(function(item, anotherItem){
			return anotherItem.priority - item.priority;
		});

		return orderedItens;
	};

	return {
		getAll: getAll,
		getAllDeleted: repository.getAllDeleted,
		save: repository.save,
		get: repository.get,
		delete: repository.delete, 
		updateAllData : repository.updateAllData,
		clearDeleted: repository.clearDeleted,
		getCreditTransfer: getCreditTransfer,
		getDebitTransfer: getDebitTransfer
	}
});