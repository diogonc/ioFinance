angular.module('finance').factory('Sync', function ($ionicLoading, UserRepository, AccountSync, CategorySync, TransactionSync) {
	var baseUrl = 'http://diogonc.azurewebsites.net/Sync/';
	//var baseUrl = 'http://localhost:50164/Sync/';

	function importData() {
		var credentials = UserRepository.getAll()[0];
		var username = credentials.login;
		var token = credentials.token;
		var propertyId = credentials.propertyId;

		mensagemDeCarregando();
		AccountSync.getAccounts(username, token, propertyId, baseUrl, function(){
			CategorySync.getCategories(username, token, propertyId, baseUrl, function(){
				TransactionSync.getTransactions(username, token, propertyId, baseUrl, function(){
					excluirMensagemDeCarregando();
				});
			});
		});
	};

	function exportData() {
		var credentials = UserRepository.getAll()[0];
		var username = credentials.login;
		var token = credentials.token;
		var propertyId = credentials.propertyId;

		mensagemDeCarregando();
		AccountSync.saveAccounts(username, token, propertyId, baseUrl, function(){
			CategorySync.saveCategories(username, token, propertyId, baseUrl, function(){
				TransactionSync.saveTransactions(username, token, propertyId, baseUrl, function(){
					excluirMensagemDeCarregando();
				});
			});
		});
	}

	function mensagemDeCarregando(){
		$ionicLoading.show({
			template: 'Carregando...'
		});
	}

	function excluirMensagemDeCarregando(){
		 $ionicLoading.hide();
	}

	return {
		importData: importData,
		exportData: exportData
	};
});
