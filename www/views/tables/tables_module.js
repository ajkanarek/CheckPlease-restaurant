angular.module('views.tables', ['restaurant'])

// Tables Controller
.controller('tablesCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', '$compile', 'restaurant', function($scope, $state, $ionicSideMenuDelegate, $compile, restaurant) {


	

	$scope.curr_restaurant = restaurant.getRestaurant();
	$scope.customer_list = restaurant.getCustomerList($scope.curr_restaurant.id);

	sortByTable = function(a, b) {
		if (a.table_id < b.table_id) {
			return -1
		}
		if (a.table_id > b.table_id) {
			return 1;
		}
		return 0;
	}

	$scope.customer_list.sort(sortByTable);

	$scope.toggleMenu = function() {
		$ionicSideMenuDelegate.toggleLeft();
	},

	// takes a customer id as input and directs to view for that customer
	$scope.goToCustomer = function(new_id) {
		$state.go('customers', {customer_id: new_id});
	}

}])
