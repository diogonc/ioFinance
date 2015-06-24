angular.module('finance').factory('Sync', function ($ionicLoading, UserRepository, AccountSync, CategorySync, TransactionSync) {
	var baseUrl = 'http://diogonc.azurewebsites.net/Sync/';
	//var baseUrl = 'http://localhost:50164/Sync/';  
    
	function importData() {
		var credentials = UserRepository.getAll()[0];
		var username = credentials.login;
		var token = credentials.token;
		var propertyId = 1;

		mensagemDeCarregando();
		AccountSync.getAccounts(username, token, propertyId, baseUrl);
		CategorySync.getCategories(username, token, propertyId, baseUrl);
		TransactionSync.getTransactions(username, token, propertyId, baseUrl);
	};

	function exportData() {
		var credentials = UserRepository.getAll()[0];
		var username = credentials.login;
		var token = credentials.token;
		var propertyId = 1;

		mensagemDeCarregando();
		AccountSync.saveAccounts(username, token, propertyId, baseUrl);
		CategorySync.saveCategories(username, token, propertyId, baseUrl);
		TransactionSync.saveTransactions(username, token, propertyId, baseUrl);
	}

	function mensagemDeCarregando(){
		$ionicLoading.show({
			template: 'Carergando...',
			duration: 2000
		});
	}

	return {
		importData: importData,
		exportData: exportData
	};
});
