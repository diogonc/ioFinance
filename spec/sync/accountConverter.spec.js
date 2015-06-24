var fs = require('fs');
var file = fs.readFileSync('www/js/models/account.js', 'utf-8');
eval(file);
var fs1 = require('fs');
var file1 = fs1.readFileSync('www/js/services/sync/converter/accountConverter.js', 'utf-8');
eval(file1);

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

describe('account sync test', function () {

  it('should convert data', function () {
    var result = accountConverter.convertAccount(serverData);

    expect(result[0].guid).toBe(serverData[0].Id);
    expect(result[0].name).toBe(serverData[0].Name);
    expect(result.length).toBe(2);
  });

  it('should convert data to post', function () {
    var account = new Account({ name: 'nome', guid: '3' });

    var result = accountConverter.convertAccount(serverData);

    expect(result[0].guid).toBe(serverData[0].Id);
    expect(result[0].name).toBe(serverData[0].Name);
    expect(result.length).toBe(2);
  });
});