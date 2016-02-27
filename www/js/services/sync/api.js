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

  function get(callback, show) {
    return $http.get(self.baseUrl + self.name + self.propertyFilter, { headers: self.auth }).then(
      function (response) {
        if (response.data === 'usuário inválido'){
          callback();
          return;
        }
        var dataConverted = self.converter.convertFromServer(response.data);
        self.repository.updateAllData(dataConverted);
        
        if(show)
          toastr.success(self.nickName + ' atualizados!');
        
        callback();
      }, 
      function (error){
        console.log(error);
        if(error.status === 403){
          toastr.error('usuario ou senha invalidos');
          return;
        }
      });
  };

  function save(callback) {
    var data = self.converter.convertToServer(self.repository.getAll(), self.auth.propertyUuid);
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
        }, 
        function (error){
          if(error.status === 400 ){
              tratarEnvioQueJaEstaSalvo(error, function(){deleteItens(callback)}, function(descricao){
              toastr.error('Erro ao processar ' + descricao);
            });
          }
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
        },function (error){
          if(error.status === 400 ){
            toastr.error('Erro ao processar ' + element.data.description);
            return;
          }
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
      }, function (error){
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
      toastr.success(self.nickName + ' ' + text + ' atualizado!');
    }else 
    toastr.warning(response.data.Message);
  };

  function tratarEnvioQueJaEstaSalvo(error, callbackSucesso, callbackErro){
    var uuid = error.config.data.uuid;
    var descricao = (error.config.data.name === undefined) ? error.config.data.description : error.config.data.name

    var query = '?where={"propertyUuid":"'+self.auth.propertyUuid+'", "uuid": "'+ uuid +'"}';

    return $http.get(self.baseUrl + self.name + query, { headers: self.auth }).then(
      function (response) {
        if(response.data.length >= 1){
          console.log("registro ja existe: ", uuid, descricao);
          callbackSucesso();
        }else
          callbackErro(descricao);
      });    
  }

  
  return {
    init: init,
    get: get,
    save: save
  };
});

