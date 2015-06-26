angular.module('finance').factory('CategorySync', function ($http, toastr, CategoryRepository) {

  function getCategories(username, token, propertyId, baseUrl, callback) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    return $http.get(baseUrl + 'getCategories', { headers: params }).then(function (response) {
      if (response.data === 'usuário inválido'){
        callback();
        return;
      }
      var dataConverted = categoryConverter.convertCategory(response.data);
      CategoryRepository.updateAllData(dataConverted);
      toastr.success('categorias atualizadas!');
      callback();
    });
  };

  function saveCategories(username, token, propertyId, baseUrl, callback) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = categoryConverter.convertToPost(CategoryRepository.getAll());
    var numberOfItens = data.length;
    var itensSaved = 0;
    if(numberOfItens === 0)
      callback();

    data.forEach(function (element) {
      return $http.post(baseUrl + 'SaveCategory', element, { headers: params }).then(function (response) {
        if (response.data === 'OK')
          toastr.success('categoria ' + element.Name + ' salva!');

        if(itensSaved === numberOfItens)
            callback();
      });
    }, this);
  };
  return {
    getCategories: getCategories,
    saveCategories: saveCategories
  };
});
