angular.module("finance").factory("TransactionRepository", function () {
	var transactionRepository = new Repository('transaction', storage);

	return {
		getAll: transactionRepository.getAll,
		save: transactionRepository.save,
		delete: transactionRepository.delete,
		get: transactionRepository.get,
		updateAllData: transactionRepository.updateAllData 
	}
});