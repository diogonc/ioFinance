angular.module("finance").controller("AccountListCtrl", function ($scope, $location, AccountRepository, Auth) {
	$scope.itens = [];
	$scope.newItem = newItem;

	function newItem(){
		$location.path('app/accounts/0');
	};

	$scope.$on('$ionicView.beforeEnter', function() {
		Auth.verify();
		
		$scope.itens = AccountRepository.getAll();
	});
});
