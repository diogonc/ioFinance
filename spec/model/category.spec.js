var fs = require('fs');
var file = fs.readFileSync('www/js/models/category.js','utf-8');
eval(file);

describe('Category test', function() {
       
  
  it('should create from item', function(){
    var item = {guid: '3', name: 'test', type: 'credit'};
    
    var category = new Category(item);
  
    expect(category instanceof Category).toBe(true);  
    expect(category.name).toBe('test');
    expect(category.type).toBe('credit');
    expect(category.guid).toBe('3');
  }); 
  
  it('should validate blank name', function(){
    var item = {guid: '3', name: '', type: 'credit'};
    
    var category = new Category(item);
    
    expect(category.errors[0]).toBe('Nome é obrigatório');
  });
});