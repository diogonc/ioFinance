var Repository = function (keyName, storage) {
  var self = this;
  var deletedKey = keyName + '-deleted';
  self.key = keyName;

  self.getAll = function () {
    return storage.getItem(keyName);
  };

  self.getAllDeleted = function () {
    return storage.getItem(deletedKey);
  };

  self.save = function (item) {
    var itemToAdd = copy(item);
    var itens = self.getAll();
    itemToAdd.changed = true;
    if (typeof itemToAdd.guid === 'undefined') {
      itemToAdd.guid = generateGuid();
      itens.push(itemToAdd);
    }
    else {
      var index = findIndex(itemToAdd.guid);
      itens.splice(index, 1, itemToAdd);
    }
    storage.setItem(self.key, itens);
    return copy(itemToAdd);
  };

  self.changeId = function (guid, id) {
    var itens = self.getAll();
    var index = findIndex(guid);
    var item = itens[index];
    item.guid = id;
    item.changed = false;
    storage.setItem(self.key, itens);
  };

  self.delete = function (item) {
    var itens = self.getAll();
    var index = findIndex(item.guid);

    if (index >= 0) {
      var deleted = self.getAllDeleted();
      deleted.push(copy(itens[index]));
      itens.splice(index, 1);
      storage.setItem(deletedKey, deleted);
      storage.setItem(self.key, itens);
    }
  };

  self.get = function (guid) {
    var itens = self.getAll();
    var index = findIndex(guid);
    return itens[index];
  };

  self.updateAllData = function (serverData) {
    var itens = self.getAll();
    var data = copy(serverData);
    itens = data;
    storage.setItem(self.key, itens);
    storage.setItem(deletedKey, []);
  };

  self.clearDeleted = function () {
    storage.setItem(deletedKey, []);
  };

  function findIndex(guid) {
    var itens = self.getAll();
    var length = itens.length;
    for (var i = 0; i < length; i++) {
      if (itens[i].guid === guid)
        return i;
    }
    return -1;
  };

  function copy(originalItem) {
    return JSON.parse(JSON.stringify(originalItem));
  };

  function generateGuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    return s.join("");
  };
};
