var Report = function() {
  var self = this;
  self.list = [];

  self.getReport = function(list, date) {
    self.list = [];
    var length = list.length;

    for(i=0; i< length; i++){
      var element = list[i];

      if(util.usToDate(element.date) > date)
        continue;

      var position = self.findById(element.account.guid, self.list);
      var multiplier = self.getMultiplier(element.category.type);

      if (position != -1) {
        var account = self.list[position];
        account.value += (element.value * multiplier);
        self.list[position] = account;
      } else {
        var newConta = {
          "account": element.account,
          "value": element.value * multiplier
        };
        self.list.push(newConta);
      }
    }

    return self.list;
  };

  self.getTotal = function () {
    var total = 0;
    var length = self.list.length;
    for (var i = 0; i < length; i++) {
      total += self.list[i].value;
    }
    return total;
  }

  self.findById = function(id, list) {
    for (var i = 0; i < list.length; i++) {
      if (list[i].account.guid === id) {
        return i;
      }
    }
    return -1;
  };

  self.getMultiplier = function(type){
    var multiplier = 1;
    if(type === "Débito" || type === "Transferência de débito")
      multiplier = -1;
    return multiplier;
  }
};
