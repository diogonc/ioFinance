angular.module("finance").controller("CategoryListCtrl", function ($scope, $location, CategoryRepository) {
	$scope.itens = CategoryRepository.getAll();
	$scope.newItem = newItem;
	
	function newItem(){
		$location.path('app/categories/0');
	};
});