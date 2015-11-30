angular.module('views.register', ['auth'])
.controller('registerCtrl', ['$scope', '$state', '$timeout', '$location', 'auth', function($scope, $state, $timeout, $location, auth) {
	/* User register credentials */
	$scope.restaurant = {
		username: "",
		password: "",
	};

	/* Helpful error message */
	$scope.error = "";

	$scope.registering = false;
	$scope.register = function() {
		/* Don't allow multiple requests */
		if($scope.registering) { return; }

		var restaurant = angular.copy($scope.restaurant);
		console.log(restaurant);

		/* Check that fields are not empty */
		if(restaurant.username.length == 0) { $scope.error = "Please enter a username"; return; }
		else if(restaurant.password.length == 0) { $scope.error = "Please enter a password"; return; }
		
		$scope.registering = true;

		/* Clear any old errors and send the user data */
		$scope.error = "";

		/* Register with the server */
		auth.register(restaurant).then(function() { /* Success */
			$scope.registering = false;
			$state.go('home');
		}, function(error) { /* Failure */
			console.log(error);
			$scope.error = error.mssg;
			$scope.registering = false;
		});
	};
}])