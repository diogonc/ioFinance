angular.module("finance").controller("CategoryListCtrl", function ($scope, $location, CategoryRepository) {
	$scope.itens = [];
	$scope.newItem = newItem;
	
	function newItem(){
		$location.path('app/categories/0');
	};

	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.itens = CategoryRepository.getAll();
	});
});