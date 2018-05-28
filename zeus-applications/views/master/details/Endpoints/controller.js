angular.module('page', []);
angular.module('page')
.factory('$messageHub', [function(){
	var messageHub = new FramesMessageHub();

	var message = function(evtName, data){
		messageHub.post({data: data}, 'zeus.zeus-applications.Endpoints.' + evtName);
	};

	var on = function(topic, callback){
		messageHub.subscribe(callback, topic);
	};

	return {
		message: message,
		on: on,
		onApplicationsSelected: function(callback) {
			on('zeus.zeus-applications.Applications.selected', callback);
		},
		messageEntityModified: function() {
			message('modified');
		}
	};
}])
.controller('PageController', function ($scope, $http, $messageHub) {

	var api = '/services/v3/js/zeus-applications/api/Endpoints.js';

	function load() {
		$http.get(api + '?Application=' + $scope.masterEntityId)
		.success(function(data) {
			$scope.data = data;
		});
	}

	$scope.openInfoDialog = function(entity) {
		$scope.entity = entity;
		toggleEntityModal();
	};

	$scope.close = function() {
		load();
		toggleEntityModal();
	};



	$messageHub.onApplicationsSelected(function(event) {
		$scope.masterEntityId = event.data.id
		load();
	});

	function toggleEntityModal() {
		$('#entityModal').modal('toggle');
	}
});