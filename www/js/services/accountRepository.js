angular.module("finance").factory("AccountRepository", function(){
	var repository = new Repository('account', storage);
				
	return {
		getAll: repository.getAll,
		getAllDeleted: repository.getAllDeleted,
		save: repository.save,
		get: repository.get,
		delete: repository.delete,
		updateAllData: repository.updateAllData,
		clearDeleted: repository.clearDeleted
	}
});