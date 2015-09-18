angular.module('finance').factory('CategorySync', function ($http, toastr, CategoryRepository, ApiSync) {

  function getCategories(auth, baseUrl, callback) {
    var api = ApiSync.init(baseUrl, auth, 'category', 'categoria', CategoryRepository, categoryConverter);

    return api.get(callback);
  };

  function saveCategories(auth, baseUrl, callback) {
    var api = ApiSync.init(baseUrl, auth, 'category', 'categoria', CategoryRepository, categoryConverter);

    return api.save(callback);
  };
  
  return {
    getCategories: getCategories,
    saveCategories: saveCategories
  };
});
