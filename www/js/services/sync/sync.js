angular.module('finance').factory('Sync', function ($ionicLoading, UserRepository, AccountSync, CategorySync, TransactionSync) {

	function importData(callback) {
		var credentials = UserRepository.getAll()[0];
		var baseUrl = credentials.url;
		var username = credentials.login;
		var token = credentials.token;
		var propertyId = credentials.propertyId;

		mensagemDeCarregando();
		AccountSync.getAccounts(username, token, propertyId, baseUrl, function(){
			CategorySync.getCategories(username, token, propertyId, baseUrl, function(){
				TransactionSync.getTransactions(username, token, propertyId, baseUrl, function(){
					callback();
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
					callback();
				});
			});
		});
	}

	function update(){
		exportData( function() {
			importData(excluirMensagemDeCarregando);
		});
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
		update: update,
		exportData : exportData,
		importData: importData,
		excluirMensagemDeCarregando: excluirMensagemDeCarregando
	};
});
