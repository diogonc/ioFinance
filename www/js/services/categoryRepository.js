angular.module("finance").factory("CategoryRepository", function(){
	var categoryRepository = new Repository('category', storage);
				
	return {
		getAll: categoryRepository.getAll,
		save: categoryRepository.save,
		get: categoryRepository.get,
		delete: categoryRepository.delete, 
		updateAllData : categoryRepository.updateAllData
	}
});