angular.module('views.customers', ['restaurant'])

// Home Controller
.controller('customersCtrl', ['$scope', '$state', '$stateParams', '$ionicModal', 'restaurant', function($scope, $state, $stateParams, $ionicModal, restaurant) {

	$scope.restaurant = restaurant.getRestaurant();
	$scope.all_menu_items = restaurant.getAllMenuItems($scope.restaurant.id);
	$scope.curr_customer = restaurant.getCustomerById($stateParams.customer_id);
	$scope.copy = angular.copy($scope.curr_customer)


	$scope.goBack = function() {
		window.history.back();
	}

	$scope.incQ = function(menu_item) {
		var found = false;
		for (var i = 0; i < $scope.copy.menu_items.length; ++i) {

			if ($scope.copy.menu_items[i].id == menu_item.id) {
				$scope.copy.menu_items[i].quantity++;
				found = true;
				break;
			}
		}
		if (!found) {
			++menu_item.quantity;
			$scope.copy.menu_items.push(menu_item);
		}

		//restaurant.updateCustomerMenuItems($stateParams.customer_id, menu_item);
	}

	$scope.decQ = function(menu_item) {
		for (var i = 0; i < $scope.copy.menu_items.length; ++i) {
			if ($scope.copy.menu_items[i].id == menu_item.id && menu_item.quantity > 0) {
				$scope.copy.menu_items[i].quantity--;
				break;
			}
		}
			//restaurant.updateCustomerMenuItems($stateParams.customer_id, menu_item);

	}

	$scope.getPrice = function(menu_item) {

		return menu_item.price * menu_item.quantity;
	}

	$scope.getQ = function(menu_item) {
		
		// if menu item is in customer menu item list, 
		// return its quantity, otherwise it is 0
		for (var i = 0; i < $scope.copy.menu_items.length; ++i) {
			if ($scope.copy.menu_items[i].id == menu_item.id) {
				return $scope.copy.menu_items[i].quantity;
			}
		}
		return 0;
	}

	$scope.updateMenuItems = function() {
		$scope.curr_customer = angular.copy($scope.copy);
		$scope.modal.hide();
	}

	// cancel changes made to the copy of menu items
	$scope.cancelChanges = function() {
		$scope.copy = angular.copy($scope.curr_customer);
		$scope.modal.hide();
	}

	//returns menu item 

	$ionicModal.fromTemplateUrl('views/customers/modals/menu_modal.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
  	}).then(function(modal) {
    	$scope.modal = modal;
  	});

}])