angular.module("finance").controller("AccountListCtrl", function ($scope, $location, AccountRepository) {
	
	$scope.$on('$ionicView.enter', function() {
		console.log('list opened!');
	});
	
	$scope.itens = AccountRepository.getAll();
	$scope.newItem = newItem;

	function newItem(){
		$location.path('app/accounts/0');
	};
});