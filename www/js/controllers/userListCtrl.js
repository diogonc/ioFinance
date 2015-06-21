angular.module("finance").controller("UserListCtrl", function ($scope, $location, UserRepository) {
	$scope.itens = UserRepository.getAll();
	$scope.newItem = newItem;
	
	function newItem(){
		$location.path('app/users/0');
	};	
});