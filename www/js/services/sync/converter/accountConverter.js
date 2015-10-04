var accountConverter = {};

accountConverter.convertFromServer = function (serverData) {
	var result = [];
	var quantityOfItens = serverData.length;

	for (var i = 0; i < quantityOfItens; i++) {
		var serverItem = serverData[i];
		var item = this.convertItem(serverItem);
		result.push(item);
	}
	return result;
};

accountConverter.convertItem = function (serverItem) {
	return {
		guid: String(serverItem.uuid),
		name: serverItem.name,
		priority: serverItem.priority
	};
};

accountConverter.convertToServer = function (itens, propertyUuid) {
	var result = [];
	var quantityOfItens = itens.length;

	for (var i = 0; i < quantityOfItens; i++) {
		var localItem = itens[i];
		if (localItem.changed) {
			var item = this.convertItemToPost(localItem, propertyUuid);
			result.push(item);
		}
	}
	return result;
};

accountConverter.convertItemToPost = function (item, propertyUuid) {
	return {
		data: {
			uuid: String(item.guid),
			name: item.name,
			propertyUuid: propertyUuid,
			priority: item.priority
		},
		new: item.created === true
	};
};