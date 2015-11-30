angular.module('views.login', ['auth'])

// Login Controller
.controller('loginCtrl', ['$scope', '$state', 'auth', function($scope, $state, auth) {
	/* User login credentials */
	$scope.user = {
		email: "",
		password: ""
	};

	/* Error message if the user fails validation */
	$scope.error = "";

	$scope.validate = function() {
		/* Don't allow multiple requests */
		if($scope.logging_in) { return; }

		var user = angular.copy($scope.user);
		
		console.log(user);

		/* Check that fields are not empty */
		if(user.email.length == 0) { $scope.error = "Please enter an email"; return; }
		else if(user.password.length == 0) { $scope.error = "Please enter a password"; return; }

		$scope.logging_in = true;

		auth.login(user).then(function() { /* Success */
			$scope.logging_in = false;
			$scope.error = "";
			$state.go('scan');
		}, function(error) { /* Failure */
			$scope.error = error.mssg;
			$scope.logging_in = false;
		});
	};
}])