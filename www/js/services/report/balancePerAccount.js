var Report = function () {
  var self = this;

  self.gerarRelatorio = function (lista) {
    var newLista = [];

    lista.forEach(function (element) {
      var posicao = self.estaNaLista(element.account.guid, newLista);
      var multiplicador = 1;
      if(element.category.type === "Débito")
        multiplicador = -1;

      if (posicao != -1) {
        var conta = newLista[posicao];
        conta.value += (element.value * multiplicador);
        newLista[posicao] = conta;
      } else {

        var newConta = {"account": element.account, "value": element.value * multiplicador};
        newLista.push(newConta);
      }
    });

    return newLista;
  };

  self.estaNaLista = function (id,lista){
    var posicao = -1;
    for(var i=0; i < lista.length ; i++) {
      if(lista[i].account.guid  === id){
        return i;
      }
    }
    return posicao;

  };
};
