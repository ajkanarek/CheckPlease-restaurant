angular.module('views.register', ['auth'])
.controller('registerCtrl', ['$scope', '$state', '$timeout', '$location', 'auth', function($scope, $state, $timeout, $location, auth) {
	/* User register credentials */
	$scope.user = {
		email: "",
		password: "",
	};

	/* Helpful error message */
	$scope.error = "";

	$scope.registering = false;
	$scope.register = function() {
		/* Don't allow multiple requests */
		if($scope.registering) { return; }

		var user = angular.copy($scope.user);
		console.log(user);

		/* Check that fields are not empty */
		if(user.email.length == 0) { $scope.error = "Please enter an email"; return; }
		else if(user.password.length == 0) { $scope.error = "Please enter a password"; return; }
		
		$scope.registering = true;

		/* Clear any old errors and send the user data */
		$scope.error = "";

		/* Register with the server */
		auth.register(user).then(function() { /* Success */
			$scope.registering = false;
			$state.go('scan');
		}, function(error) { /* Failure */
			console.log(error);
			$scope.error = error.mssg;
			$scope.registering = false;
		});
	};
}])