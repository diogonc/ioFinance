angular.module('finance').factory('ApiSync', function ($http, toastr) {

  self = this;

  function init(baseUrl, auth, name, repository, converter){
    self.name = name;
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
      toastr.success('contas atualizadas!');
      callback();
    });
  };

  function save(callback) {
    var data = self.converter.convertToServer(self.repository.getAll());
    var numberOfItens = data.length;
    var itensSaved = 0;

    if(numberOfItens === 0)
      callback();

    for (i = 0; i<= numberOfItens; i++){
      var element = data[i];

      if(element.new){
          return $http.post(self.baseUrl + self.name, element.data, { headers: self.auth }).then(function (response) {
            itensSaved++;
            if (response.status === 201)
              toastr.success('conta ' + element.data.name + ' salva!');

            if(itensSaved === numberOfItens)
              callback();
          });
      }
      else{
       return $http.put(self.baseUrl + self.name + '/' + element.data.uuid , element.data, { headers: self.auth })
                   .then(function (response) 
        {
          itensSaved++;
          if (response.status === 201)
            toastr.success('conta ' + element.data.name + ' salva!');

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

