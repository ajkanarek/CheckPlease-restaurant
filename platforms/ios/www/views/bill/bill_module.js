/* This view is nominalas to provide a controller for the barcode */
angular.module('views.bill', ['ngCordova', 'restaurants'])
.controller('billCtrl', ['$scope', '$stateParams', 'restaurants', function($scope, $stateParams, restaurants) {
    $scope.restaurant = {
        id: 0,
        table_id: 0,
        name: "",
        description: "",
        img: ""
    };

    /* List of items on the bill, mocked for now */
    $scope.items = [
        {name: "Bacon Burger", price: 6.89},
        {name: "Sweet Potato Fries", price: 3.99},
        {name: "Coke 20oz", price: 1.79},
        {name: "Loaded Potato Wedges", price: 4.99},
        {name: "Caesar Salad", price: 3.99},
        {name: "Chocolate Milkshake", price: 2.99},
        {name: "Sweet release of death", price: 0},
    ];

    /* Calculates the total cost of all items */
    $scope.getTotal = function() {
        var total = 0;
        for(var i = 0; i < $scope.items.length; i++)
        {
            var item = $scope.items[i];
            total += item.price;
        }
        return total;
    };  

    var restaurant_id = $stateParams.restaurant_id;
    console.log(restaurant_id);

    /* Load the restaurant the patron is dining at */
    restaurants.lookup(restaurant_id).then(function(restaurant) {
        $scope.restaurant = restaurant;
        console.log($scope.restaurant);
    });

    /* Creates a Stripe Token for the user */
    /* Make this into a direcitve/reusable thing */
    $scope.pay = function() {
        var handler = StripeCheckout.configure({
            key: 'pk_test_rWwRxSPszJRNxUv0nYL1QWUR',
            image: 'views/bill/imgs/default_user.png',
            locale: 'auto',
            token: function(token) {
                console.log('token');
                console.log(token);
            }
        });

        handler.open({
            name: 'Tab',
            description: 'A Delicious Meal',
            amount: $scope.getTotal() * 100
        });

        $(window).on('popstate', function() {
            handler.close();
        });
    };

}])
/* Sets the background of the header to a blurred version of the restaurants 
 * image. Triky because it needs to add a new style that overwrites the :before
 * pseudo element styling for best effect.
 */
.directive('billBackgroundImg', function($timeout) {
    return {
        restrict: 'A',
        scope: {
            img_url: '&billBackgroundImg'
        },
        link: function(scope, elem, attrs) {

            function setImage() {
                if(scope.img_url() && scope.img_url.length)
                {
                    document.styleSheets[0].addRule('#bill #'+attrs.id + ':before', "background-image: url('" + scope.img_url() + "')!important");
                }
            };

            /* Call it once */
            $timeout(setImage);

            /* Watch for changes */
            scope.$watch(function() { return scope.img_url(); }, setImage);
        }
    }
})
/* This should be made global eventually */
.filter( 'dollar', function() {
    return function(input) {
        input = Number(input);
        if(input === 0) { return "FREE"; }

        input = input.toFixed(2);
        input = "$" + input;
        return input;
    }
});











