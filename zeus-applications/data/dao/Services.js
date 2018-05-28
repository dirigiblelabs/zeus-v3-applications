var daoApi = require('db/v3/dao');
var dao = daoApi.create({
	'table': 'ZEUS_APPLICATION_SERVICES',
	'properties': [
		{
			'name':  'Id',
			'column': 'ZAS_ID',
			'type':'INTEGER',
			'id': true,
			'required': true
		},		{
			'name':  'Name',
			'column': 'ZAS_NAME',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Type',
			'column': 'ZAS_TYPE',
			'type':'VARCHAR',
			'id': false,
			'required': true
		},		{
			'name':  'Port',
			'column': 'ZAS_PORT',
			'type':'INTEGER',
			'id': false,
			'required': true
		},		{
			'name':  'Application',
			'column': 'ZAS_APPLICATION',
			'type':'INTEGER',
			'id': false,
			'required': true
		}]
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