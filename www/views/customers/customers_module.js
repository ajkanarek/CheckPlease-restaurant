angular.module('views.customers', ['restaurant'])

// Home Controller
.controller('customersCtrl', ['$scope', '$state', 'restaurant', function($scope, $state, restaurant) {
	$scope.goBack = function() {
		window.history.back();
	}

	var menu_items_per_row = 4;
	var num_menu_items = 0; // num_menu_items = restaurant.getNumMenuItems();
	var row_changed = false;
	var prev_row = 1;
	$scope.addButton = function() {
		console.log("-----------------");
		restaurant.setNumMenuItems(10, ++num_menu_items);
		var curr_row = Math.floor(num_menu_items/menu_items_per_row) + 1; 
		console.log("current row: " + curr_row);
		console.log("number of menu items: " + num_menu_items);
		console.log("current row: " + curr_row);
		console.log("previous row: " + prev_row);
		if (curr_row != prev_row) {
			console.log("begin new row");
			var begin_row = angular.element( document.querySelector( '#customer-container' ) );
			begin_row.append('<div class="row customer-row" id="customer-row' + curr_row + '">');
			row_changed = true;
			prev_row = curr_row;
		}
		var element = angular.element( document.querySelector( '#customer-row' + curr_row ) );
		element.append('<button class="customer-button">Button#' + num_menu_items + '</button>'); 
		if (row_changed) {
			console.log("end row");
			row_changed = false;
		}
	}

}])