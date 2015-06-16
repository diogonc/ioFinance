angular.module("finance").factory("AccountRepository", function(){
	var accountRepository = new Repository('account', store);
				
	return {
		getAll: accountRepository.getAll,
		save: accountRepository.save,
		get: accountRepository.get,
		delete: accountRepository.delete,
		updateAllData: accountRepository.updateAllData
	}
});