/* This view is nominalas to provide a controller for the barcode */
angular.module('views.scan', ['ngCordova', 'restaurants'])
.controller('scanCtrl', ['$scope', '$cordovaBarcodeScanner', '$state', 'restaurants', function($scope, $cordovaBarcodeScanner, $state, restaurants) {
    /* Holds the restaurant data collected from the QR Code */
    $scope.restaurant = {
        id: 0,
        table_id: 0,
        name: "",
        description: "",
        img: ""
    };

    $scope.scan = function() {
        $cordovaBarcodeScanner.scan().then(function(data) {
            if(data.format != "QR_CODE") { return; }
            if(data.text.length != 11) { return; }

            /* Barcode text is in the format #######:### (restaurant id:table id) */
            var temp = data.text.split(":");
            $scope.restaurant.id = parseInt(temp[0]);

            /* Look the restaurant up, and set it to controllers variable */
            restaurants.lookup($scope.restaurant.id).then(function(restaurant) {
                if(restaurant) 
                { 
                    $scope.restaurant = restaurant;
                    $scope.restaurant.table_id = parseInt(temp[1]);
                }
            });
        });
    };

    /* Goes to the main tab page */
    $scope.goToTab = function() {
        $state.go('bill', {restaurant_id: $scope.restaurant.id});
        console.log('clicked go button');
    };

    /* Start on the scan view */
    $scope.scan();

}]);