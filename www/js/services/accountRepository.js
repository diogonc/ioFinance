angular.module("finance").factory("AccountRepository", function(){
	var accountRepository = new Repository('account', storage);
				
	return {
		getAll: accountRepository.getAll,
		save: accountRepository.save,
		get: accountRepository.get,
		delete: accountRepository.delete,
		updateAllData: accountRepository.updateAllData
	}
});