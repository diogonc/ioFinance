angular.module("finance").factory("UserRepository", function(){
	var userRepository = new Repository('user', storage);
				
	var activate = function (item){
		var users = userRepository.getAll();

		for (var i = users.length - 1; i >= 0; i--) {
			var user = users[i];

			user.active = (item.guid === user.guid)			
		};

		userRepository.updateAllData(users)
	}

	var getActive = function(){
		var users = userRepository.getAll();
		var user = {};


		for (var i = users.length - 1; i >= 0; i--) {
			if(users[i].active)
				user = users[i];
		};
		return user;
	}

	return {
		getAll: userRepository.getAll,
		save: userRepository.save,
		get: userRepository.get,
		delete: userRepository.delete,
		updateAllData: userRepository.updateAllData,
		activate: activate,
		getActive: getActive
	}
});