angular.module("finance").controller("UserListCtrl", function ($scope, $location, $window, UserRepository, CategoryRepository, AccountRepository, TransactionRepository, Sync) {
	$scope.itens = UserRepository.getAll();
	$scope.newItem = newItem;
	$scope.activate = activate;
	$scope.reset = reset;

	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.itens = UserRepository.getAll();
	});

	function newItem(){
		$location.path('app/users/0');
	};

	function reset(){
		UserRepository.updateAllData([]);
		CategoryRepository.updateAllData([]);
		AccountRepository.updateAllData([]);
		TransactionRepository.updateAllData([]);
	};

	function activate(item){
		Sync.exportData( function() {
			UserRepository.activate(item);	

			Sync.importData( function(){
				Sync.excluirMensagemDeCarregando();
				$window.location.reload();
			});
		});
	}
});
