/* Responsible for keeping track of restaurant info */
angular.module('restaurant', ['socket', 'restaurant.config'])
.factory('restaurant', ['$rootScope', '$state', 'socket', function($rootScope, $state, socket) {

	/*****************************************************************
	**** THIS IS JUST DUMMY DATA. MUST RETRIEVE INFO FROM DB *********
	*****************************************************************/

	var restaurant = {
		num_tables: 8,
		name: "Ashley's"

	};
	var customer = {
		id: "10",
		num_items: 0,
		name: "charlie"
	};

	// gets the restaurant name from the server by the restaurant's ID
	function getRestaurantName(restaurant_id) {
		return "Ashley's";
	}

	function setCustomerByTable(customer_id, table_num) {
		return;
	}

	// gets the customer sitting at a table by the table id
	function getCustomerNameByTable(restaurant_id, table_num) { 
		if (table_num == 1) {
			return "Sally";
		}
		else if (table_num == 2) {
			return "Yasi";
		}
		else if (table_num == 3) {
			return "Jmo";
		}
		else if (table_num == 4) {
			return "Andrew";
		}
		else if (table_num == 5) {
			return "Sal";
		}
		else if (table_num == 6) {
			return "Yasmander";
		}
		else if (table_num == 7) {
			return "Jon";
		}
		else if (table_num == 8) {
			return "drew";
		}
		else {
			console.log("This table does not exist");
			return "";
		}
	}

	// gets the number of tables by restaurant id
	function getNumTables(restaurant_id) {
		return 8;
	}

	function getNumMenuItems(customer_id) {
		return customer.num_items;
	}

	function setNumMenuItems(customer_id, new_num_items) {
		customer.num_items = new_num_items;
	}

	return {
		getRestaurantName: function(restaurant_id) {
			return getRestaurantName(restaurant_id);
		},
		getCustomerName: function (restaurant_id, table_num) {
			return getCustomerNameByTable(restaurant_id, table_num);
		},
		getNumTables: function(restaurant_id) {
			return getNumTables(restaurant_id);
		},
		getNumMenuItems: function(customer_id) {
			return getNumMenuItems(customer_id);
		},
		setNumMenuItems: function(customer_id, new_num_items) {
			return setNumMenuItems(customer_id, new_num_items);
		}
	};
	

}]);