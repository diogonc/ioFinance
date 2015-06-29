var fs1 = require('fs');
var file1 = fs1.readFileSync('www/js/services/report/balancePerMonth.js', 'utf-8');
eval(file1);

var dados = [
  {"valid":true,
   "errors":[],
   "description":"34535",
   "category":{"guid":"3","name":"Alice","type":"Débito"},
   "account":{"guid":"1","name":"Carteira Diogo"},
   "date":"2015-06-27T19:38:56.342Z",
   "value":3453,
   "changed":true,
   "guid":"d63bb1a6-dcce-4965-87ae-2f168e8edcb5"},

   {"valid":true,
   "errors":[],
   "description":"34343",
   "category":{"guid":"1003","name":"Salário","type":"Crédito"},
   "account":{"guid":"7","name":"Carteira Vanessa"},
   "date":"2015-06-27T19:39:29.300Z",
   "value":444,
   "changed":true,
   "guid":"0c37fd68-7c9a-4771-9879-58ce7e540b74"},

   {"valid":true,
   "errors":[],
   "description":"34343",
   "category":{"guid":"1002","name":"Carro","type":"Débito"},
   "account":{"guid":"7","name":"Carteira Vanessa"},
   "date":"2015-06-27T19:49:29.300Z",
   "value":444,
   "changed":true,
   "guid":"0c37fd68-7c9a-4771-9879-58ce7e540b75"}

 ];

describe('Balance per month report', function () {

  var report;

  beforeEach(function () {
    report = new balancePerMonthReport();
  });

  it('should create report', function () {

    expect(report instanceof balancePerMonthReport).toBe(true);
  });
});
