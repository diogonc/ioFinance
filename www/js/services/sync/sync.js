angular.module('finance').factory('Sync', function ($ionicLoading, UserRepository, AccountSync, CategorySync, TransactionSync) {

	function importData() {
		var credentials = UserRepository.getAll()[0];
		var baseUrl = credentials.url;
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

	function exportData(callback) {
		var credentials = UserRepository.getAll()[0];
		var baseUrl = credentials.url;
		var username = credentials.login;
		var token = credentials.token;
		var propertyId = credentials.propertyId;

		mensagemDeCarregando();
		AccountSync.saveAccounts(username, token, propertyId, baseUrl, function(){
			CategorySync.saveCategories(username, token, propertyId, baseUrl, function(){
				TransactionSync.saveTransactions(username, token, propertyId, baseUrl, function(){
					excluirMensagemDeCarregando();
					callback();
				});
			});
		});
	}

	function update(){
		exportData(importData);
	}

	function mensagemDeCarregando(){
		$ionicLoading.show({
			template: 'Carregando...',
			duration : 50000
		});
	}

	function excluirMensagemDeCarregando(){
		 $ionicLoading.hide();
	}

	return {
		update: update
	};
});
