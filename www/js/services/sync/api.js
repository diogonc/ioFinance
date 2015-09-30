angular.module('finance').factory('ApiSync', function ($http, toastr) {

  self = this;

  function init(baseUrl, auth, name, nickName, repository, converter){
    self.name = name;
    self.nickName = nickName;
    self.baseUrl = baseUrl;
    self.auth = auth;
    self.propertyFilter = '?where={"propertyUuid":"'+auth.propertyUuid+'"}';
    self.repository = repository;
    self.converter = converter;
    self.get = get;
    self.save = save;

    return self;
  };

  function get(callback) {
    return $http.get(self.baseUrl + self.name + self.propertyFilter, { headers: self.auth }).then(function (response) {
      if (response.data === 'usuário inválido'){
        callback();
        return;
      }

      var dataConverted = self.converter.convertFromServer(response.data);
      self.repository.updateAllData(dataConverted);
      toastr.success(self.nickName + ' atualizadas!');
      callback();
    });
  };

  function save(callback) {
    var data = self.converter.convertToServer(self.repository.getAll());
    var numberOfItens = data.length;
    var itensSaved = 0;

    if(numberOfItens === 0)
      deleteItens(callback);

    for (i = 0; i< numberOfItens; i++){
      var element = data[i];

      if(element.new){
        $http.post(self.baseUrl + self.name, element.data, { headers: self.auth }).then(function (response) {
          showMessage(element, response);
          
          itensSaved++;
          if(itensSaved === numberOfItens)
            deleteItens(callback);
        });
      }
      else{
        $http.put(self.baseUrl + self.name + '/' + element.data.uuid , element.data, { headers: self.auth })
        .then(function (response) 
        {
          showMessage(element, response);
          
          itensSaved++;
          if(itensSaved === numberOfItens)
            deleteItens(callback);
        });  
      }
    }
  };


  function deleteItens(callback) {
    var data = self.converter.convertToServer(self.repository.getAllDeleted());
    var numberOfItens = data.length;
    var itensSaved = 0;

    if(numberOfItens === 0)
      callback();

    for (i = 0; i< numberOfItens; i++){
      var element = data[i];

      $http.delete(self.baseUrl + self.name + '/' + element.data.uuid, { headers: self.auth })
      .then(function (response) {
        showMessage(element, response);
        
        itensSaved++;
        if(itensSaved === numberOfItens){
          self.repository.clearDeleted();
          callback();
        }
      });
    }    
  };

  function showMessage(element, response){
    if (response.status === 201 || response.status === 200){
      var text = element.data.name !== undefined ?  element.data.name :  element.data.description;
      toastr.success(self.nickName + ' ' + text + ' atualizada!');
    }else 
    toastr.warning(response.data.Message);
  };

  return {
    init: init,
    get: get,
    save: save
  };
});

