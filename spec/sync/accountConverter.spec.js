var fs = require('fs');
var file = fs.readFileSync('www/js/models/account.js', 'utf-8');
eval(file);
var fs1 = require('fs');
var file1 = fs1.readFileSync('www/js/services/sync/converter/accountConverter.js', 'utf-8');
eval(file1);

var serverData = [
  {
    "name": "Cartão de crédito financiamento",
    "property": {
      "name": "Piazza do Bosque",
      "uuid": 1
    },
    "uuid": '12'
  },
  {
    "name": "Cartão de crédito inativo Diogo",
    "property": {
      "name": "Piazza do Bosque",
      "uuid": 1
    },
    "uuid": 6
  }
];

describe('account sync test', function () {

  it('should convert data', function () {
    var result = accountConverter.convertFromServer(serverData);
    
    expect(result[0].guid).toBe(serverData[0].uuid);
    expect(result[0].name).toBe(serverData[0].name);
    expect(result.length).toBe(2);
  });

  it('should convert data to post', function () {
    var account = new Account({ name: 'nome', guid: '3' });

    var result = accountConverter.convertFromServer(serverData);

    expect(result[0].guid).toBe(serverData[0].uuid);
    expect(result[0].name).toBe(serverData[0].name);
    expect(result.length).toBe(2);
  });
});