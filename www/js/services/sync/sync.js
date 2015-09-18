angular.module('finance').factory('Sync', function ($ionicLoading, UserRepository, AccountSync, CategorySync, TransactionSync) {

	function importData(callback) {
		var credentials = UserRepository.getAll()[0];
		var baseUrl = credentials.url;
		var username = credentials.login;
		var token = credentials.token;
		var propertyId = credentials.propertyId;

		var authParams = {
	      username: username,
	      token: token,
	      propertyUuid: propertyId
	    };

		mensagemDeCarregando();
		AccountSync.getAccounts(authParams, baseUrl, function(){
			CategorySync.getCategories(authParams, baseUrl, function(){
				TransactionSync.getTransactions(authParams, baseUrl, function(){
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

		var authParams = {
	      username: username,
	      token: token,
	      propertyUuid: propertyId
	    };

		mensagemDeCarregando();
		AccountSync.saveAccounts(authParams, baseUrl, function(){
			CategorySync.saveCategories(authParams, baseUrl, function(){
				TransactionSync.saveTransactions(authParams, baseUrl, function(){
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
