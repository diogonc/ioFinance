var BalancePerMonthReport = function() {
  var self = this;

  self.GetBalancePerMonth = function(data) {
    var dates = self.GetDates();
  };

  self.GetDates = function() {
    var dates = [];
    var date = new Date();
    var numberOfMonths = 5;
    self.addMonths(date, (numberOfMonths * -1) + 1);

    for (month = 1; month <= numberOfMonths; month++) {
      self.addMonths(date, 1);
      dates.push(self.formatDate(date));
    }
    return dates;
  }

  self.addMonths = function(date, numberOfMonths) {
    date.setDate(1);
    date.setMonth(date.getMonth() + numberOfMonths);
    return date;
  }

  self.formatDate = function(date) {
    var year = String(date.getFullYear()).substring(2);
    return (date.getMonth() + 1) + '/' + year;
  }

  self.estaNaLista = function(id, lista) {
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].account.guid === id) {
        return i;
      }
    }
    return -1;
  };
};
