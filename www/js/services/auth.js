angular.module("finance").factory("Auth", function($location, UserRepository){

	var verify = function(){
 		var user = UserRepository.getActive();

 		if(user === undefined)
 			$location.path('app/users/0');
	}

	return {
		verify: verify
	}
});