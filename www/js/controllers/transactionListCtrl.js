angular.module("finance").controller("TransactionListCtrl", function ($scope, $stateParams, $location, TransactionRepository) {
	$scope.itens = [];
	$scope.newItem = newItem;
	$scope.search = search;
	
	function newItem(){
		$location.path('app/transactions/0');
	};
	
	function search(item){
		$location.path('app/transactions').search({year: item.year, month: item.month});
	};
	
	$scope.$on('$ionicView.beforeEnter', function() {
		
		var hoje = new Date();
		var year = hoje.getFullYear();
		var month = hoje.getMonth() + 1;		
		
		if(typeof $stateParams.year !== 'undefined')
		 	year = parseInt($stateParams.year);
		if(typeof $stateParams.month !== 'undefined')
		 	month = parseInt($stateParams.month);		
		
		$scope.item = {year: year , month: month};
		
		$scope.itens = TransactionRepository.getAll($scope.item.year, $scope.item.month);
	});
});