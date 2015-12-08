/* Responsible for keeping track of restaurant info */
angular.module('restaurant', ['socket', 'restaurant.config', 'auth'])
.factory('restaurant', ['$rootScope', '$state', '$q', 'socket', 'auth', function($rootScope, $state, $q, socket, auth) {

	

	var restaurant = {
		num_tables: "",
		name: "",
		img: ""
	};

	var customer_menu_item = {
		id: "",
		name: "",
		price: "",
		quantity: "",
		img: ""
	};

	customer = {
			id: "",
			name: "",
			menu_items: [],
			table_id: ""
	};


	/*************************************************************************
	********************** DUMMY DATA **************************************
	************************************************************************/

	set_restaurant(10, "Ashley's");
	//var temp_menu_list = [new set_customer_menu_item("Beef Salad", 20), new set_customer_menu_item("Chicken", 20), 
						  //set_customer_menu_item("Broccoli", 20), set_customer_menu_item("Desser", 20)];

	var customer_menu_item1 = {
		id: 1,
		name: "Beef Salad",
		price: 20,
		quantity: 1,
		img: ""
	};

	var customer_menu_item2 = {
		id: 2,
		name: "Chicken",
		price: 12,
		quantity: 1,
		img: ""
	};

	var customer_menu_item3 = {
		id: 3,
		name: "Broccoli",
		price: 5,
		quantity: 1,
		img: ""
	};

	var customer_menu_item4 = {
		id: 4,
		name: "Dessert",
		price: 10,
		quantity: 1,
		img: ""
	};

	var customer_menu_item5 = {
		id: 5,
		name: "Shrimp",
		price: 18,
		quantity: 0,
		img: ""
	};

	var customer_menu_item6 = {
		id: 6,
		name: "Turkey",
		price: 14,
		quantity: 0,
		img: ""
	};

	var customer_menu_item7 = {
		id: 7,
		name: "Whale",
		price: 140,
		quantity: 0,
		img: ""
	};

	var customer_menu_item8 = {
		id: 8,
		name: "Fishies",
		price: 15,
		quantity: 0,
		img: ""
	};


	var temp_menu_list = [customer_menu_item1, customer_menu_item2, customer_menu_item3, customer_menu_item4];

	var all_menu_items = [customer_menu_item1, customer_menu_item2, customer_menu_item3, customer_menu_item4, 
					    customer_menu_item5, customer_menu_item6, customer_menu_item7, customer_menu_item8];

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
			table_id: 8
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

		return customer_list;
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

	// returns array of the customers current menu items
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
		var curr_customer = getCustomerById(customer_id); 
		console.log(curr_customer);
		return curr_customer.menu_items;
		
	}

	// returns customer from local list by ID
	function getCustomerById(customer_id) {

		for (var i = 0; i < customer_list.length; ++i) { 
			if (customer_list[i].id == customer_id) { 
				return customer_list[i];
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
				return customer_list[i];
			}
		}
		//console.log("No users at this table!!");
		return null;

	}

	function getNumMenuItems() {
		return customer_list.menu_items.length;
	}

	// increases quantity of customer menu item
	// adds it to customer menu item list if ti deosn't exist
	function updateCustomerMenuItems(customer_id, menu_item) {
		var temp_customer = getCustomerById(customer_id);
		var item_exists = false;
		for (var i = 0; i < temp_customer.menu_items.length; ++i) {
			if (temp_customer.menu_items[i].id == menu_item.id) {
				temp_customer.menu_items[i].quantity = menu_item.quantity;
				item_exists = true;
			}
		}
		if (!item_exists) {
			temp_customer.menu_items.push(menu_item);
		}
	}

	// checks if the menu item is in the customers menu item 
	// returns quantity if it exists
	// returns 0 if it doesn't exist
	function getQuantityById(customer_id, menu_item) {
		var temp_customer = getCustomerById(customer_id);
		for (var i = 0; i < temp_customer.menu_items.length; ++i) {
			if (temp_customer.menu_items[i].id == menu_item.id) {
				return menu_item.quantity;
				item_exists = true;
			}
		}
		return 0;
	}

	/*************************************
	****** MENU FUNCTIONS *********
	**************************************/

	function getAllMenuItems(restaurant_id) {
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
		return all_menu_items;
	}

	function getMenuItemById(menu_id) {
		for (var i = 0; i < all_menu_items.length; ++i) {
			if (all_menu_items[i].id == menu_id) {
				return all_menu_items[i];
			}
		}
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
		},
		getCustomerList: function(restaurant_id) {
			return getCustomerList(restaurant_id);
		},
		getCustomerMenuItems: function(restaurant_id, customer_id) {
			return getCustomerMenuItems(restaurant_id, customer_id);
		},
		getAllMenuItems: function(restaurant_id) {
			return angular.copy(getAllMenuItems(restaurant_id));
		},
		getMenuItemById: function(menu_id) {
			return getMenuItemById(menu_id);
		},
		updateCustomerMenuItems: function(customer_id, menu_item) {
			return updateCustomerMenuItems(customer_id, menu_item);
		},
		getQuantityById: function(customer_id, menu_items) {
			return getQuantityById(customer_id, menu_items);
		},
		getCustomerById: function(customer_id) {
			return getCustomerById(customer_id);
		}
	};
	

}]);