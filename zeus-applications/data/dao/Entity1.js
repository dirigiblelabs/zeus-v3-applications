var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	"table": "ENTITY1",
	"properties": [
		{
			"name": "id",
			"column": "ENTITY1ID",
			"type":"INTEGER",
			"id": true,
			"required": true
	}	]
});

exports.list = function(settings) {
	return dao.list(settings);
};

exports.get = function(id) {
	return dao.find(id);
};

exports.create = function(entity) {
	return dao.insert(entity);
};

exports.update = function(entity) {
	return dao.update(entity);
};

exports.delete = function(id) {
	dao.remove(id);
};