angular.module('finance.controllers', []).controller('AppCtrl', function ($scope, $ionicModal, $timeout, toastr, Sync, UserRepository, TransactionRepository) {
	$scope.importData = importData;
	$scope.exportData = exportData;

	function importData() {
		var credentials = UserRepository.getAll()[0];
		var username = credentials.login;
		var token = credentials.token;
		var propertyId = 1;

		Sync.getAccounts(username, token, propertyId);
		Sync.getCategories(username, token, propertyId);
		Sync.getTransactions(username, token, propertyId);
	};

	function exportData() {
		var credentials = UserRepository.getAll()[0];
		var username = credentials.login;
		var token = credentials.token;
		var propertyId = 1;

		Sync.saveAccounts(username, token, propertyId);
		Sync.saveCategories(username, token, propertyId);
		Sync.saveTransactions(username, token, propertyId, onSaveTransaction);
	}

	function onSaveTransaction(element, response) {
		console.log(response.data);
				
		if (response.data.Status === 'OK')
		{
			toastr.success(response.data.Message);
			TransactionRepository.changeId(element.Id, String(response.data.Item.Id));
		}
		else{
			toastr.warning(response.data.Message);
		}		  
	}
});