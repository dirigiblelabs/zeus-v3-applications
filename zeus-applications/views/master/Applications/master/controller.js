angular.module('page', []);
angular.module('page').controller('PageController', function ($scope, $http) {

	var api = '/services/v3/js/zeus-applications/api/Applications.js';
	var templateOptionsApi = '/services/v3/js/zeus-templates/api/Templates.js';
	var clusterOptionsApi = '/services/v3/js/zeus-accounts/api/Clusters.js';

	$scope.templateOptions = [];

	$scope.clusterOptions = [];

	$http.get(templateOptionsApi)
	.success(function(data) {
		$scope.templateOptions = data;
	});

	$http.get(clusterOptionsApi)
	.success(function(data) {
		$scope.clusterOptions = data;
	});

	function load() {
		$http.get(api)
		.success(function(data) {
			$scope.data = data;
		});
	}
	load();

	$scope.openNewDialog = function() {
		$scope.actionType = 'new';
		$scope.entity = {};
		toggleEntityModal();
	};

	$scope.openEditDialog = function(entity) {
		$scope.actionType = 'update';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.openDeleteDialog = function(entity) {
		$scope.actionType = 'delete';
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		load();
		toggleEntityModal();
	};

	$scope.create = function() {
		$http.post(api, JSON.stringify($scope.entity))
		.success(function(data) {
			load();
			toggleEntityModal();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
			
	};

	$scope.update = function() {
		$http.put(api + '/' + $scope.entity.Id, JSON.stringify($scope.entity))

		.success(function(data) {
			load();
			toggleEntityModal();
		}).error(function(data) {
			alert(JSON.stringify(data));
		})
	};

	$scope.delete = function() {
		$http.delete(api + '/' + $scope.entity.Id)
		.success(function(data) {
			load();
			toggleEntityModal();
		}).error(function(data) {
			alert(JSON.stringify(data));
		});
	};

	$scope.templateOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.templateOptions.length; i ++) {
			if ($scope.templateOptions[i].Id === optionKey) {
				return $scope.templateOptions[i].Name;
			}
		}
		return null;
	};
	$scope.clusterOptionValue = function(optionKey) {
		for (var i = 0 ; i < $scope.clusterOptions.length; i ++) {
			if ($scope.clusterOptions[i].Id === optionKey) {
				return $scope.clusterOptions[i].Name;
			}
		}
		return null;
	};

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});