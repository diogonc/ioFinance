angular.module('finance').factory('AccountSync', function ($http, toastr, AccountRepository) {

  function getAccounts(auth, baseUrl, callback) {
    
    return $http.get(baseUrl + 'account', { headers: auth }).then(function (response) {
      if (response.data === 'usuário inválido'){
        callback();
        return;
      }

      var dataConverted = accountConverter.convertAccount(response.data);
      AccountRepository.updateAllData(dataConverted);
      toastr.success('contas atualizadas!');
      callback();
    });
  };

  function saveAccounts(auth, baseUrl, callback) {
    var data = accountConverter.convertToPost(AccountRepository.getAll());
    var numberOfItens = data.length;
    var itensSaved = 0;
    if(numberOfItens === 0)
      callback();

    data.forEach(function (element) {
      console.log(element);
      if(element.new)
      {
        return $http.post(baseUrl + 'account', element.data, { headers: auth }).then(function (response) {
          itensSaved++;
          if (response.status === 201)
            toastr.success('conta ' + element.data.name + ' salva!');

          if(itensSaved === numberOfItens)
            callback();
        });
      }
      else{
       return $http.put(baseUrl + 'account/' + element.data.uuid , element.data, { headers: auth }).then(function (response) {
          itensSaved++;
          if (response.status === 201)
            toastr.success('conta ' + element.data.name + ' salva!');

          if(itensSaved === numberOfItens)
            callback();
        }); 
      }
    }, this);
  };

  return {
    getAccounts: getAccounts,
    saveAccounts: saveAccounts
  };
});
