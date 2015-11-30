angular.module('views.analysis', [])

// Home Controller
.controller('analysisCtrl', ['$scope', '$state', function($scope, $state) {
	$scope.goBack = function() {
		console.log("back button clicked");
		window.history.back();
	}
}])