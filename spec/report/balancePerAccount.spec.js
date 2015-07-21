var fs = require('fs');
var file = fs.readFileSync('www/js/services/util.js', 'utf-8');
eval(file);

var fs1 = require('fs');
var file1 = fs1.readFileSync('www/js/services/report/balancePerAccount.js', 'utf-8');
eval(file1);

var data = [
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
   "date":"2015-06-28T19:49:29.300Z",
   "value":444,
   "changed":true,
   "guid":"0c37fd68-7c9a-4771-9879-58ce7e540b75"}

 ];

var date = new Date(2015,07,28);

describe('teste do relatorio', function () {

  var report;

  beforeEach(function () {
    report = new Report();
  });

  it('should create report', function () {
    expect(report instanceof Report).toBe(true);
  });

  it('should group by account', function() {
    var list = report.getReport(data, date);
    expect(list.length).toBe(2);
  });

  it('should contain accout name', function () {
    var list = report.getReport(data, date);
    expect(list[0].account.name).toBe("Carteira Diogo");
  });

  it('account should be on list', function() {
    var data = [{"account":{"guid":"7","name":"Carteira Vanessa"}, "value": 0}];
    var posicao = report.findById("7",data);
    expect(0).toBe(posicao);
  });

  it('deve somar valor conta agrupada', function() {
    var list = report.getReport(data, date);

    expect(-3453).toBe(list[0].value);
    expect(0).toBe(list[1].value);
  });

  it('should show until date', function(){
    var date = new Date(2015,5,27);

    var list = report.getReport(data, date);

    expect(list[1].value).toBe(444);
  });
});
