angular.module('finance').factory('Sync', function ($ionicLoading, UserRepository, AccountSync, CategorySync, TransactionSync) {

	function importData(callback) {
		var credentials = UserRepository.getActive();
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
		var credentials = UserRepository.getActive();
		if(credentials === undefined)
			return callback();

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
					if( typeof callback === 'function')
						callback();
					else
						excluirMensagemDeCarregando();
				});
			});
		});
	}

	function update(callback){
		exportData( function() {
			importData( function(){
				excluirMensagemDeCarregando();

				if( typeof callback === 'function')
					callback();
			});
		});
	}

	function mensagemDeCarregando(){
		$ionicLoading.show({
			template: 'Carregando...',
			duration : 5000
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
