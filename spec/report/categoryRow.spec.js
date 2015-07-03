var fs = require('fs');
var file = fs.readFileSync('www/js/services/util.js', 'utf-8');
eval(file);

var fs1 = require('fs');
var file1 = fs1.readFileSync('www/js/services/report/categoryRow.js', 'utf-8');
eval(file1);

var data = [{
    "valid": true,
    "errors": [],
    "description": "34535",
    "category": {
      "guid": "3",
      "name": "Alice",
      "type": "Débito"
    },
    "account": {
      "guid": "1",
      "name": "Carteira Diogo"
    },
    "date": "2015-06-27T19:38:56.342Z",
    "value": 3453,
    "changed": true,
    "guid": "d63bb1a6-dcce-4965-87ae-2f168e8edcb5"
  },

  {
    "valid": true,
    "errors": [],
    "description": "34343",
    "category": {
      "guid": "1003",
      "name": "Salário",
      "type": "Crédito"
    },
    "account": {
      "guid": "1",
      "name": "Carteira Diogo"
    },
    "date": "2015-07-27T19:39:29.300Z",
    "value": 444,
    "changed": true,
    "guid": "0c37fd68-7c9a-4771-9879-58ce7e540b74"
  },

  {
    "valid": true,
    "errors": [],
    "description": "34343",
    "category": {
      "guid": "1002",
      "name": "Carro",
      "type": "Débito"
    },
    "account": {
      "guid": "7",
      "name": "Carteira Vanessa"
    },
    "date": "2015-06-27T19:49:29.300Z",
    "value": 444,
    "changed": true,
    "guid": "0c37fd68-7c9a-4771-9879-58ce7e540b75"
  }
];

var dates = ['6/15', '7/15'];

describe('Category row', function() {

  var categoryRow;
  it('should create a CategoryRow', function() {
    categoryRow = new CategoryRow();
    expect(categoryRow instanceof CategoryRow).toBe(true);
  });

  it('should create with category', function() {
    var transaction = data[0];

    categoryRow = new CategoryRow(transaction.category, dates);
    categoryRow.addTransaction(transaction);

    expect(categoryRow.category.guid).toBe(transaction.category.guid);
    expect(categoryRow.balance.length).toBe(2);
    expect(categoryRow.average()).toBe(transaction.value/2);
    expect(categoryRow.sum).toBe(transaction.value);
 });

  it('should create a balance per month', function() {
    var transaction = data[0];

    categoryRow = new CategoryRow(transaction.category, dates);
    categoryRow.addTransaction(transaction);

    expect(categoryRow.balance[0].date).toBe('6/15');
    expect(categoryRow.balance[0].value).toBe(transaction.value);
  });

  it('should add transaction', function() {
    var transaction = data[0];

    categoryRow = new CategoryRow(transaction.category, dates);
    categoryRow.addTransaction(transaction);
    categoryRow.addTransaction(transaction);

    expect(categoryRow.balance[0].date).toBe('6/15');
    expect(categoryRow.balance[0].value).toBe(transaction.value * 2);
  });

  it('should create all dates on creating', function(){
    var transaction = data[0];
    var dates = ['4/15', '5/15', '6/15', '7/15'];

    categoryRow = new CategoryRow(transaction.category, dates);

    expect(categoryRow.balance[0].date).toBe('4/15');
    expect(categoryRow.balance[3].date).toBe('7/15');
  });

  it('should split by month', function(){
    var transaction = data[0];
    var transactionFromAnotherMonth = data[1];

    categoryRow = new CategoryRow(transaction.category, dates);
    categoryRow.addTransaction(transaction);
    categoryRow.addTransaction(transaction);
    categoryRow.addTransaction(transactionFromAnotherMonth);

    expect(categoryRow.balance[1].date).toBe('7/15');
    expect(categoryRow.balance[1].value).toBe(transactionFromAnotherMonth.value);
  });
});
