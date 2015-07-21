var Report = function() {
  var self = this;

  self.getReport = function(list, date) {
    var newlist = [];
    var length = list.length;

    for(i=0; i< length; i++){
      var element = list[i];

      if(util.usToDate(element.date) > date)
        continue;

      var position = self.findById(element.account.guid, newlist);
      var multiplier = self.getMultiplier(element.category.type);

      if (position != -1) {
        var account = newlist[position];
        account.value += (element.value * multiplier);
        newlist[position] = account;
      } else {
        var newConta = {
          "account": element.account,
          "value": element.value * multiplier
        };
        newlist.push(newConta);
      }
    }

    return newlist;
  };

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
