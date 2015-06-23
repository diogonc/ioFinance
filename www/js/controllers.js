angular.module('finance.controllers', []).controller('AppCtrl', function ($scope, $ionicModal, $timeout, Sync, UserRepository) {
	$scope.importData = importData;
	$scope.exportData = exportData;
	$scope.hasUser = hasUser;

	function importData(){
		Sync.importData();
	};
	
	function exportData(){
		Sync.exportData();
	};	
	
	function hasUser(){
		var users = UserRepository.getAll();
		return users.length > 0;
	}
});