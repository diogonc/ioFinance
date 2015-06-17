var sync = {};

sync.convertAccount = function (serverData) {
	var result = [];
	var quantityOfItens = serverData.length;

	for (var i = 0; i < quantityOfItens; i++) {
		var serverItem = serverData[i];
		var item = convertItem(serverItem);
		result.push(item);
	}

console.log(result);
	return result;

	function convertItem(serverItem) {
		return {
			guid: String(serverItem.Id),
			name: serverItem.Name
		};
	}
}