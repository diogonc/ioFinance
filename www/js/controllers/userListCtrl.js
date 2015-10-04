angular.module("finance").controller("UserListCtrl", function ($scope, $location, $window, UserRepository, Sync) {
	$scope.itens = UserRepository.getAll();
	$scope.newItem = newItem;
	$scope.activate = activate;

	function newItem(){
		$location.path('app/users/0');
	};

	$scope.$on('$ionicView.beforeEnter', function() {
		$scope.itens = UserRepository.getAll();
	});

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
