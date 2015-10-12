angular.module("finance").controller("CategoryListCtrl", function ($scope, $location, CategoryRepository, Auth) {
	$scope.itens = [];
	$scope.newItem = newItem;
	
	function newItem(){
		$location.path('app/categories/0');
	};

	$scope.$on('$ionicView.beforeEnter', function() {
		Auth.verify();

		$scope.itens = CategoryRepository.getAll();
	});
});