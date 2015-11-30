angular.module('views.tables', [])

// Tables Controller
.controller('tablesCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', function($scope, $state, $ionicSideMenuDelegate) {
	$scope.toggleMenu = function() {
		console.log("menu clicked");
		$ionicSideMenuDelegate.toggleRight();
	},
	$scope.goBack = function() {
		console.log("back button clicked");
		window.history.back();
	}

}])