angular.module('finance.controllers', []).controller('AppCtrl', function ($scope, $ionicModal, $timeout, Sync, UserRepository) {
	$scope.update = update;
	$scope.hasUser = hasUser;
	$scope.user = UserRepository.getActive();

	function update(){
		Sync.update();
	};

	function hasUser(){
		return currentUser().guid !== undefined;
	}

	function currentUser(){
		var	user = UserRepository.getActive();

		if(user !== undefined)
			return user;
		else
			return {};
	}
});