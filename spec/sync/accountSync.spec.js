var fs = require('fs');
var file = fs.readFileSync('www/js/services/sync/accountSync.js','utf-8');
eval(file);

var serverData = [
          {   
             "Name": "Cartão de crédito financiamento",
              "Property": {
                  "Name": "Piazza do Bosque",
                  "Id": 1
              },
              "Id": '12'
          },
          {
              "Name": "Cartão de crédito inativo Diogo",
              "Property": {
                  "Name": "Piazza do Bosque",
                  "Id": 1
              },
              "Id": 6
          }
      ];

describe('account sync test', function() {
  
  it('should convert data', function() {    
    var result = sync.convertAccount(serverData); 
    
     expect(result[0].guid).toBe(serverData[0].Id);
     expect(result[0].name).toBe(serverData[0].Name);
     expect(result.length).toBe(2);
  });
});