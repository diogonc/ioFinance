angular.module("finance").factory("CategoryRepository", function(){
	var repository = new Repository('category', storage);
				
	return {
		getAll: repository.getAll,
		getAllDeleted: repository.getAllDeleted,
		save: repository.save,
		get: repository.get,
		delete: repository.delete, 
		updateAllData : repository.updateAllData,
		clearDeleted: repository.clearDeleted
	}
});