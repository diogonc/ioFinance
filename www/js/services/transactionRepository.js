angular.module("finance").factory("TransactionRepository", function () {
	var transactionRepository = new Repository('transaction', store);

	return {
		getAll: transactionRepository.getAll,
		save: transactionRepository.save,
		delete: transactionRepository.delete
	}
});