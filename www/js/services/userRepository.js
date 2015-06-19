angular.module("finance").factory("UserRepository", function(){
	var userRepository = new Repository('user', storage);
				
	return {
		getAll: userRepository.getAll,
		save: userRepository.save,
		get: userRepository.get,
		delete: userRepository.delete
	}
});