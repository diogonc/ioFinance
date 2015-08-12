angular.module('finance.controllers', []).controller('AppCtrl', function ($scope, $ionicModal, $timeout, Sync, UserRepository) {
	$scope.update = update;
	$scope.hasUser = hasUser;

	function update(){
		Sync.update();
	};	
	
	function hasUser(){
		var users = UserRepository.getAll();
		return users.length > 0;
	}
});