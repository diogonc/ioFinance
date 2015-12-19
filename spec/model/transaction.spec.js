var fs = require('fs');
var file = fs.readFileSync('www/js/models/transaction.js', 'utf-8');
eval(file);



describe('Transaction', function () {
  var date = new Date();
  var item;

  beforeEach(function () {
    item = {
      description: 'test',
      account: { guid: 3, name: 'accountName' },
      category: { guid: 1, name: 'categoryName', type: 'debit' },
      date: date,
      value: 1.34
    };
  });


  it('should crate a transaction from item', function () {

    var transaction = new Transaction(item);

    expect(transaction instanceof Transaction).toBe(true);
    expect(transaction.description).toBe(item.description);
    expect(transaction.account).toBe(item.account);
    expect(transaction.category).toBe(item.category);
    expect(transaction.date).toBe(item.date);
    expect(transaction.value).toBe(item.value);
  });

  it('should validate a transaction without date', function () {
    item.date = null;

    var transaction = new Transaction(item);

    expect(transaction.valid).toBe(false);
    expect(transaction.errors[0]).toBe('Data é obrigatória');
  });

  it('should validate a transaction without value', function () {
    item.value = null;

    var transaction = new Transaction(item);

    expect(transaction.valid).toBe(false);
    expect(transaction.errors[0]).toBe('Valor é obrigatório');
  });

  it('should validate a transaction without account', function () {
    item.account = null;

    var transaction = new Transaction(item);

    expect(transaction.valid).toBe(false);
    expect(transaction.errors[0]).toBe('Conta é obrigatória');
  });

  it('should validate a transaction without category', function () {
    item.category = null;

    var transaction = new Transaction(item);

    expect(transaction.valid).toBe(false);
    expect(transaction.errors[0]).toBe('Categoria é obrigatória');
  });

  it('shoult treat value with comma', function(){
    item.value = '2,34';

    var transaction = new Transaction(item);

    expect(transaction.value).toBe(2.34);
  });

  it('shoult treat value with comma and period', function(){
    item.value = '2.232,34';

    var transaction = new Transaction(item);

    expect(transaction.value).toBe(2232.34);
  })
});