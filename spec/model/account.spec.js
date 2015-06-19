var fs = require('fs');
var file = fs.readFileSync('www/js/models/account.js','utf-8');
eval(file);

describe('Account test', function() {
         
  it('should create from item', function(){
    var item = {guid: '3', name: 'test'};
    
    var account = new Account(item);
  
    expect(account instanceof Account).toBe(true);  
    expect(account.name).toBe('test');
    expect(account.guid).toBe('3');
  });
  
  it('should validate blank name', function(){
    var item = {guid: '3', name: ''};
    
    var account = new Account(item);
    
    expect(account.errors[0]).toBe('Nome é obrigatório');
  }); 
});