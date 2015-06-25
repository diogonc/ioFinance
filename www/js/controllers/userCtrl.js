angular.module("finance").controller("UserCtrl", function ($scope, $stateParams, $location,  UserRepository) {
	$scope.addItem = addItem;
	$scope.deleteItem = deleteItem;
	$scope.back = back;
	$scope.item = {};
	$scope.ehEdicao = false;
	$scope.valid = true;
	$scope.errors = [];

	$scope.$on('$ionicView.beforeEnter', function () {
		var guid = $stateParams.Id;
		if (guid !== '0') {
			var item = UserRepository.get(guid);
			$scope.item = item;
			$scope.ehEdicao = true;
		}
	});
	

	function addItem(newItem) {
		var item = new User(newItem);
		if (item.valid) {
			UserRepository.save(item);
			$scope.item = {};
			back();
		}
		$scope.valid = item.valid;
		$scope.errors = item.errors;		
	};

	function deleteItem(item) {
		UserRepository.delete(item);
		$scope.item = {};
		back();
	}

	function back() {
		$location.path('app/users');
	}
});
