angular.module('views.login', ['auth'])

// Login Controller
.controller('loginCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth) {
	/* User login credentials */
	$scope.restaurant = {
		username: "",
		password: ""
	};

	/* Error message if the user fails validation */
	$scope.error = "";

	$scope.validate = function() {
		$state.go('home');

		/* Don't allow multiple requests */
		if($scope.logging_in) { return; }

		var restaurant = angular.copy($scope.restaurant);
		
		console.log(restaurant);

		/* Check that fields are not empty */
		if(restaurant.username.length == 0) { $scope.error = "Please enter a username"; return; }
		else if(restaurant.password.length == 0) { $scope.error = "Please enter a password"; return; }

		$scope.logging_in = true;

		auth.login(restaurant).then(function() { /* Success */
			$scope.logging_in = false;
			$scope.error = "";
			$state.go('home');
		}, function(error) { /* Failure */
			$scope.error = error.mssg;
			$scope.logging_in = false;
		});
	};
}])