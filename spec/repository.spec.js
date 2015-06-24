var fs = require('fs');
var repositoryFile = fs.readFileSync('www/js/services/repository.js','utf-8');
eval(repositoryFile);

var Storage =  function(){
  this.itens = [];
  this.getItem = function(key){
     if (typeof this.itens[key] === 'undefined' || this.itens[key] === null)
			 this.itens[key] = [];
       
     return this.itens[key];
  };
  this.setItem = function(key, value){ this.itens[key] = JSON.parse(JSON.stringify(value));};
};

describe('Repository', function() {
  var repository;
  var storage;  
      
  beforeEach(function () {    
    storage = new Storage();               
    repository = new Repository('repoName', storage);    
  });
  
  it('should create repository', function() {    
    expect(repository instanceof Repository).toBe(true);
  });
  
  it('should create with a name', function(){
    expect(repository.key).toBe('repoName');
  });
  
  it('should add an item', function(){
    var item = {name:'test'};
    
    var repoItem = repository.save(item);
       
    expect(repoItem.Guid !== 'undefined').toBe(true);
    expect(repoItem.name).toBe(item.name);
  });    
  
  it('should get all itens', function(){
    var item = {name:'test'};
    var item2 = {name:'test 2'};
    
    repository.save(item);
    repository.save(item2);
    
    expect(repository.getAll().length).toBe(2);
  });
  
  it('should delete an item', function(){
    var item = {name: 'test'};
    repository.save(item);
    var itemToDelete = repository.getAll()[0];

    repository.delete(itemToDelete);
    
    expect(repository.getAll().length).toBe(0);
  });
  
  it('should update an item', function(){
    var item = {name: 'test'}
    item = repository.save(item);
        
    item.name = 'new name';    
    var itemFromList = repository.save(item);
    
    expect(itemFromList.name).toBe('new name');    
  });
  
  it('should update all data', function(){
    var data = [{guid:4, name:3}, {guid:3, name:4}];
    
    repository.updateAllData(data);
    var repositoryData = repository.getAll();
    data[0].guid = 1;
    
    expect(repositoryData[0].guid).toBe(4);
    expect(repositoryData.length).toBe(2);    
  });
  
});



