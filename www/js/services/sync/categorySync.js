angular.module('finance').factory('CategorySync', function ($http, toastr, CategoryRepository) {


  function getCategories(username, token, propertyId, baseUrl) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    return $http.get(baseUrl + 'getCategories', { headers: params }).then(function (response) {
      if (response.data === 'usuário inválido')
        return;

      var dataConverted = categoryConverter.convertCategory(response.data);
      CategoryRepository.updateAllData(dataConverted);
      toastr.success('categorias atualizadas!');
    });
  };

  function saveCategories(username, token, propertyId, baseUrl) {
    var params = {
      login: username,
      token: token,
      propertyId: propertyId
    };
    var data = categoryConverter.convertToPost(CategoryRepository.getAll());
    data.forEach(function (element) {
      return $http.post(baseUrl + 'SaveCategory', element, { headers: params }).then(function (response) {
        if (response.data === 'OK')
          toastr.success('categoria ' + element.Name + ' salva!');
      });
    }, this);
  };
  return {
    getCategories: getCategories,
    saveCategories: saveCategories
  };
});
