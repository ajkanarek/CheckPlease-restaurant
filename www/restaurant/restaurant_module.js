/* Responsible for keeping track of restaurant info */
angular.module('restaurant', ['socket', 'restaurant.config', 'auth'])
.factory('restaurant', ['$rootScope', '$state', 'socket', 'auth', function($rootScope, $state, socket, auth) {

	

	var restaurant = {
		num_tables: "",
		name: "",
		img: ""
	};

	var customer_menu_item = {
		name: "",
		price: "",
		img: ""
	};

	customer = {
			id: "",
			name: "",
			menu_items: [customer_menu_item],
			table_id: ""
	};

	var allMenuItems = [];

	/*************************************************************************
	********************** DUMMY DATA **************************************
	************************************************************************/

	set_restaurant(10, "Ashley's");
	var temp_menu_list = [new set_customer_menu_item("Beef Salad", 20), new set_customer_menu_item("Chicken", 20), 
						  set_customer_menu_item("Broccoli", 20), set_customer_menu_item("Desser", 20)];

	customer1 = {
			id: 0,
			name: "Charlie",
			menu_items: temp_menu_list,
			table_id: 4
	};
	customer2 = {
			id: 3,
			name: "Harold",
			menu_items: temp_menu_list,
			table_id: 5
	};
	customer3 = {
			id: 4,
			name: "Peter",
			menu_items: temp_menu_list,
			table_id: 3
	};
	customer4 = {
			id: 1,
			name: "John",
			menu_items: temp_menu_list,
			table_id: 2
	};
	customer5 = {
			id: 2,
			name: "Paul",
			menu_items: temp_menu_list,
			table_id: 1
	};
	customer6 = {
			id: 5,
			name: "Tony",
			menu_items: temp_menu_list,
			table_id: 6
	};

	var customer_list = [customer1, customer2, customer3, customer4, customer5, customer6];
	

	function printCustomerNames() {
		for (var i = 0; i < customer_list.length; ++i) {
			console.log("customer table id: " + customer_list[i].table_id );
			console.log("customer name: " + customer_list[i].name);
			console.log("customer id: " + customer_list[i].id);
		}
	}


	/*************************************
	****** RESTAURANT FUNCTIONS *********
	**************************************/

	//constructor for restaurant
	function set_restaurant(new_num_tables, new_name) {
		restaurant = {
			num_tables: new_num_tables,
			name: new_name
		}
	} 

	//contructor for menu_item
	function set_customer_menu_item(new_name, new_price) {
		customer_menu_item = {
			name: new_name,
			price:new_price
		}
	} 

	//constructor for customer
	function set_customer(new_id, new_name, menu_items_list, new_table_id) {
		customer = { 
			id: new_id,
			name: new_name,
			menu_items: menu_items_list,
			table_id: new_table_id
		};
	}


	function getRestaurant() {
		return restaurant;
		//send token to server
		//receive restaurant object if success
		//auth.getToken()
		var deferred = $q.defer();
		var token = auth.getToken();

		socket.emit('token', token, function(error, new_restaurant) {
			if(error)
			{
				console.log("There was an error");
				console.error('Error retrieving restaurant object from server in: ' + error);
				deferred.reject(error);
			}
			else { 
				console.log(new_restaurant); 
				console.log(getToken()); 
				restaurant = new_restaurant; // sets local restaurant array to DB restaurant array
				deferred.resolve(); 
			}
		});
		return deferred.promise;
	}

	// gets the restaurant name from the server by the restaurant's ID
	function getRestaurantName(restaurant_id) {
		return restaurant.name;
	}

	// gets the number of tables by restaurant id
	function getNumTables() {
		return restaurant.num_tables;
	}


	/*************************************
	****** CUSTOMER FUNCTIONS *********
	**************************************/

	function getCustomerList(restaurant_id) {
		//send restaurant_id to server
		//returns array of customers
		// sort by table_num
		var deferred = $q.defer();

		socket.emit('restaurant_id', restaurant_id, function(error, new_customers) {
			if(error)
			{
				console.log("There was an error");
				console.error('Error retrieving cutomers object array from server in: ' + error);
				deferred.reject(error);
			}
			else { 
				console.log(customer_list);
				customer_list = new_customers; //sets local customer array to DB customer array
				deferred.resolve(); 
			}
		});
		return deferred.promise;
	}


	function addMenuCustomerItem(restaurant_id, customer_id, new_menu_item) {
		// menu_items.push(new_menu_item)
		var deferred = $q.defer();

		socket.emit('add_menu_item', restaurant_id, customer_id, new_menu_item, function(error) {
			if(error)
			{
				console.log("There was an error");
				console.error('Error sending menu item object from server in: ' + error);
				deferred.reject(error);
			}
			else { 
				// add menu item to local array of menu items for current customer
				var temp_customer = getCustomerById(customer_id);
				if (temp_customer != null) { temp_customer.push(new_menu_item); }
				deferred.resolve(); 
			}
		});
		return deferred.promise;
	}

	function getCustomerMenuItems(restaurant_id, customer_id) {
		var deferred = $q.defer();

		socket.emit('get_cutomer_menu_items', restaurant_id, customer_id, function(error, new_menu_items) {
			if(error)
			{
				console.log("There was an error");
				console.error('Error retrieving menu_items object array from server in: ' + error);
				deferred.reject(error);
			}
			else { 
				console.log(new_menu_items);
				var temp_customer = getCustomerById(customer_id);
				if (temp_customer != null) { temp_customer.menu_items = new_menu_items } //sets local customer array to DB customer array
				deferred.resolve(); 
			}
		});
		return deferred.promise;
		
	}

	// returns customer from local list by ID
	function getCustomerById(customer_id) {
		for (var temp_cust in customer_list) { 
			if (temp_cust.id === customer_id) { 
				return temp_cust;
			}
		}
		return null;
	}


	// gets the customer sitting at a table by the table number
	// returns null if not customers at that table
	function getCustomerByTable(table_num) { 
		//console.log("table number: " + table_num);
		for (var i = 0; i < customer_list.length; ++i) {
			//console.log("customer name: " + temp_customer.name);
			//console.log("customer table id: " + customer_list[i].table_id);
			if (customer_list[i].table_id == table_num) {
				return angular.copy(customer_list[i]);
			}
		}
		//console.log("No users at this table!!");
		return null;

	}

	function getNumMenuItems() {
		return customer_list.menu_items.length;
	}

	/*************************************
	****** MENU FUNCTIONS *********
	**************************************/

	function getAllMenuItem() {
		var deferred = $q.defer();

		socket.emit('get_all_menu_items', restaurant_id, function(error, menu_items) {
			if(error)
			{
				console.log("There was an error");
				console.error('Error retrieving menu_items object array from server in: ' + error);
				deferred.reject(error);
			}
			else { 
				console.log(menu_items);
				temp_customer.menu_items = new_menu_items; //sets local menu to DB customer array
				deferred.resolve(); 
			}
		});
		return deferred.promise;
	}


	return {
		getRestaurant: function(token) {
			return getRestaurant(token);
		},
		getRestaurantName: function(restaurant_id) {
			return getRestaurantName(restaurant_id);
		},
		getCustomerByTable: function (table_num) {
			return getCustomerByTable(table_num);
		},
		getNumTables: function(restaurant_id) {
			return getNumTables(restaurant_id);
		},
		getNumMenuItems: function(customer_id) {
			return getNumMenuItems(customer_id);
		},
		printCustomerNames: function() {
			printCustomerNames();
		}
	};
	

}]);