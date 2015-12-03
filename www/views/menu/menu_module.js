angular.module('views.menu', [])

// Menu Controller
.controller('menuCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.goBack = function() {
		window.history.back();
	}

}])