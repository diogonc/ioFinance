angular.module('finance.controllers', []).controller('AppCtrl', function ($scope, $ionicModal, $timeout, Sync, UserRepository) {
	$scope.update = update;
	$scope.hasUser = hasUser;
	$scope.importData = importData;
	$scope.exportData = exportData;

	function update(){
		Sync.update();
	};

	function exportData(){
		Sync.exportData(Sync.excluirMensagemDeCarregando);
	}

	function importData(){
		Sync.importData(Sync.excluirMensagemDeCarregando);
	}
	
	function hasUser(){
		var users = UserRepository.getAll();
		return users.length > 0;
	}
});