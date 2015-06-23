angular.module('finance.controllers', []).controller('AppCtrl', function ($scope, $ionicModal, $timeout, Sync) {
	$scope.importData = importData;
	$scope.exportData = exportData;

	function importData(){
		Sync.importData();
	};
	
	function exportData(){
		Sync.exportData();
	};	
});