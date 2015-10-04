angular.module("finance").factory("AccountRepository", function(){
	var repository = new Repository('account', storage);
				

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
		updateAllData: repository.updateAllData,
		clearDeleted: repository.clearDeleted
	}
});