var fs = require('fs');
var file = fs.readFileSync('www/js/services/util.js', 'utf-8');
eval(file);

var fs1 = require('fs');
var file1 = fs1.readFileSync('www/js/services/report/categoryRow.js', 'utf-8');
eval(file1);

var fs2 = require('fs');
var file2 = fs2.readFileSync('www/js/services/report/balancePerMonth.js', 'utf-8');
eval(file2);

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
      "guid": "7",
      "name": "Carteira Vanessa"
    },
    "date": "2015-06-27T19:39:29.300Z",
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

describe('Balance per month report', function() {

  var report;

  beforeEach(function() {
    report = new BalancePerMonthReport();
  });

  it('should create report', function() {
    expect(report instanceof BalancePerMonthReport).toBe(true);
  });

  it('should add a month', function() {
    var today = new Date('2015-01-15');
    var date = report.addMonths(today, 1);

    expect(date.getFullYear()).toBe(2015);
    expect(date.getMonth()).toBe(1);
  });

  it('should add two months', function() {
    var today = new Date('2015-01-15');
    var date = report.addMonths(today, 2);

    expect(date.getFullYear()).toBe(2015);
    expect(date.getMonth()).toBe(2);
  });

  it('should add minus one month', function() {
    var today = new Date('2015-01-15');
    var date = report.addMonths(today, -1);

    expect(date.getFullYear()).toBe(2014);
    expect(date.getMonth()).toBe(11);
  });

  it('should show months', function() {
    var dates = report.getDates(2015, 6);

    expect(dates[0]).toBe('1/15');
    expect(dates[4]).toBe('5/15');
  });

  it('should return -1 if item is not in the list', function() {
    var data = [];

    var index = report.findCategoryIndex(3, data)

    expect(index).toBe(-1);
  });

  it('should return index if item is in the list', function() {
    var data = [{
      category: {
        guid: 2,
        name: 'test',
        type: 'Crédito'
      },
      balance: ['04/2015']
    }];

    var index = report.findCategoryIndex(2, data)

    expect(index).toBe(0);
  });

  it('should create credit if it doesnt exist', function() {
    var transaction = data[0];
    report.addItem(transaction, report.creditCategories);
    var credits = report.creditCategories;

    expect(credits[0].category.guid).toBe('3');
    expect(credits.length).toBe(1);
  });

  it('shouldnt create credit if it already exist', function() {
    var transaction = data[0];
    report.addItem(transaction, report.creditCategories);
    report.addItem(transaction, report.creditCategories);
    var credits = report.creditCategories;

    expect(credits[0].category.guid).toBe('3');
    expect(credits.length).toBe(1);
  });

  it('should group credits by month', function() {
    var result = report.GetBalancePerMonth(data);

    expect(result.creditCategories[0].category.name).toBe('Salário');
    expect(result.debitCategories[0].category.name).toBe('Alice');
    expect(result.debitCategories[1].category.name).toBe('Carro');
  });
});
