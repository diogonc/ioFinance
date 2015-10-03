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
		//TODO rever quando alterar uma informação e depois ativar outra conta
		UserRepository.activate(item);

		Sync.update(function(){
			$window.location.reload();	
		});		
	}
});
