angular.module('views.tables', ['restaurant'])

// Tables Controller
.controller('tablesCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', '$compile', 'restaurant', function($scope, $state, $ionicSideMenuDelegate, $compile, restaurant) {

	curr_restaurant = {
		name: restaurant.getRestaurantName(),
		numTables: restaurant.getNumTables()
	}

	var prev_row = 0;
	var row_changed = true;
	// format HTML view based on number of tables at a restaurant
	for (var i = 0; i < curr_restaurant.numTables; ++i) {
		var table_views_per_row = 4;
		var curr_row = Math.floor(i/table_views_per_row) + 1; 
		if (curr_row != prev_row) {
			//console.log("begin new row");
			var begin_row = '<div class="row table-row" id="table-row' + curr_row + '">';
			angular.element(document.getElementById('container')).append($compile(begin_row)($scope));
			row_changed = true;
		}
		prev_row = curr_row;
		//console.log("current row: " + curr_row);
		$scope.table_num = i + 1; //table number is 1 greater than current iterator (0 indexed)
		var table_num = $scope.table_num;
		var customer_name = restaurant.getCustomerName(0, table_num);
		var element =   '<button class="col table-button" ng-click="goToCustomer({{ table_num }})"><div class="table-content"><p>Table Number: ' + table_num + '</p><p>Customer Name: ' + customer_name + '</p><p>Status: </p></div></button>';
		angular.element(document.getElementById('table-row' + curr_row)).append($compile(element)($scope));
		if (row_changed) {
			//console.log("end row");
			var end_row = '</div>';
			row_changed = false;
		}
	}



	$scope.toggleMenu = function() {
		console.log("menu clicked");
		$ionicSideMenuDelegate.toggleRight();
	},
	$scope.goBack = function() {
		window.history.back();
	},

	$scope.goToCustomer = function(table_num) {
		$state.go('customers', {table_id: table_num});
	}

}])
