angular.module('views.tables', ['restaurant'])

// Tables Controller
.controller('tablesCtrl', ['$scope', '$state', '$ionicSideMenuDelegate', '$compile', 'restaurant', function($scope, $state, $ionicSideMenuDelegate, $compile, restaurant) {

	var curr_restaurant = restaurant.getRestaurant(0); //0 is just temp number for testing
	console.log("number of tables: " + curr_restaurant.num_tables);
	console.log("name: " + curr_restaurant.name);

	//var temp_customer = restaurant.getCustomerByTable(1);
	/*
	console.log("----------------------------");
	var table_num = 1;
	var curr_customer = restaurant.getCustomerByTable(table_num);
	$scope.curr_customer = curr_customer;
	$scope.table_num = table_num;
*/

	var prev_row = 0;
	var row_changed = true;
	const TABLE_VIEWS_PER_ROW = 4;
	// format HTML view based on number of tables at a restaurant
	for (var i = 0; i < curr_restaurant.num_tables; ++i) {
		var curr_row = Math.floor(i / TABLE_VIEWS_PER_ROW) + 1; 
		if (curr_row != prev_row) {
			//console.log("begin new row");
			var begin_row = angular.element( document.querySelector( '#table-container' ) );
			begin_row.append('<div class="row table-row" id="table-row' + curr_row + '">');
			//var begin_row = '<div class="row table-row" id="table-row' + curr_row + '">';
			//angular.element(document.getElementById('container')).append($compile(begin_row)($scope));
			row_changed = true;
		}
		prev_row = curr_row;
		//console.log("current row: " + curr_row);
		$scope.table_num = i + 1; //table number is 1 greater than current iterator (0 indexed)
		var table_num = $scope.table_num;
		var curr_customer = restaurant.getCustomerByTable(table_num);
		if (curr_customer != null) { 
			$scope.curr_customer = curr_customer;
			var element = angular.element( document.querySelector( '#table-row' + curr_row ) );
			console.log("current customer id: " + $scope.curr_customer.id);
			element.append('<button class="table-button" ng-click="goToCustomer(' + curr_customer.id + ')"><div class="table-content"><p>Table Number: ' + table_num + '</p><p>Customer Name: ' + curr_customer.name + '</p><p>Status: Occupied</p></div></button>');
		}
		else {
			var element = angular.element( document.querySelector( '#table-row' + curr_row ) );
			element.append('<button class="table-button"><div class="table-content"><p>Table Number: ' + table_num + '</p><p>Status: Unoccupied</p></div></button>');
		}
		if (row_changed) { row_changed = false; }
	}

	$scope.toggleMenu = function() {
		console.log("menu clicked");
		$ionicSideMenuDelegate.toggleRight();
	},
	$scope.goBack = function() {
		window.history.back();
	},

	// takes a customer id as input and directs to view for that customer
	$scope.goToCustomer = function(new_id) {
		console.log("button clicked");
		$state.go('customers', {customer_id: new_id});
	}

}])
