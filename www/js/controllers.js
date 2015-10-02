angular.module('finance.controllers', []).controller('AppCtrl', function ($scope, $ionicModal, $timeout, Sync, UserRepository) {
	$scope.update = update;
	$scope.hasUser = hasUser;
	$scope.user = UserRepository.getActive();

	function update(){
		Sync.update();
	};

	function hasUser(){
		var users = UserRepository.getAll();
		return users.length > 0;
	}

	function currentUser(){
		var	user = UserRepository.getActive();

		if(user.guid !== undefined)
			return user;
		else
			return {login: 'teste'};
	}
});