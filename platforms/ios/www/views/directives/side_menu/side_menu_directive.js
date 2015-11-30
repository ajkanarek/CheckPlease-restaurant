angular.module('views.directives.side_menu', [])
.directive('sideMenu', function() {
	return {
		restrict: 'E',
		templateUrl: "views/directives/side_menu/side_menu.html"
	}
});