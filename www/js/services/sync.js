angular.module('finance').factory('Sync', function($http) {
   $http.defaults.headers.common.Authorization = 'login YmVlcDpi' ;
  var baseUrl = 'http://diogonc.azurewebsites.net/Sync/';
  //var baseUrl = 'http://localhost:50164/Sync/';  
    
  function getAccounts(username, token, propertyId) {
    var config = {
      headers :{
        user:username,
        token: token
    }};
    
    return $http.get(baseUrl + 'getAccounts?propertyId='+propertyId, config).then(function(response) {
      var data = response.data;
      data = [
            {
                "Name": "Cartão de crédito financiamento",
                "Property": {
                    "Name": "Piazza do Bosque",
                    "Id": 1
                },
                "Id": 12
            },
            {
                "Name": "Cartão de crédito inativo Diogo",
                "Property": {
                    "Name": "Piazza do Bosque",
                    "Id": 1
                },
                "Id": 6
            }
        ];
        return sync.convertAccount(data);
    });
  };
  
  return {
    getAccounts: getAccounts
  };
});
