angular.module('finance').factory('ApiSync', function ($http, toastr) {

  self = this;

  function init(baseUrl, auth, name, nickName, repository, converter){
    self.name = name;
    self.nickName = nickName;
    self.baseUrl = baseUrl;
    self.auth = auth;
    self.repository = repository;
    self.converter = converter;
    self.get = get;
    self.save = save;
    
    return self;
  };

  function get(callback) {
    
    return $http.get(self.baseUrl + self.name, { headers: self.auth }).then(function (response) {
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
      callback();

    for (i = 0; i< numberOfItens; i++){
      var element = data[i];

      if(element.new){
          $http.post(self.baseUrl + self.name, element.data, { headers: self.auth }).then(function (response) {
            itensSaved++;
            if (response.status === 201)
              toastr.success(self.nickName + ' ' + element.data.name + ' criada!');

            if(itensSaved === numberOfItens)
              callback();
          });
      }
      else{
       $http.put(self.baseUrl + self.name + '/' + element.data.uuid , element.data, { headers: self.auth })
                   .then(function (response) 
        {
          itensSaved++;
          if (response.status === 200)
            toastr.success(self.nickName + ' ' + element.data.name + ' atualizada!');

          if(itensSaved === numberOfItens)
            callback();
        });  
      }
    }
  };

  return {
    init: init,
    get: get,
    save: save
  };
});

