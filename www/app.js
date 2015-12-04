angular.module('checkplease', ['ionic', 'ngCordova', 'auth', 'restaurant', 'socket', 'views'])
.run(['$ionicPlatform', '$cordovaSplashscreen', '$ionicSideMenuDelegate', '$state', '$compile', 'auth', 'restaurant', function($ionicPlatform, $cordovaSplashscreen, $ionicSideMenuDelegate, $state, $compile, auth, restaurant) {
    $ionicPlatform.ready(function() {
        /*
        auth.validateToken().then(function() { // Token is still valid 
            console.log('valid token');
            // Go to dashboard, close splashscreen 
            $state.go('home');
            $cordovaSplashscreen.hide();
        }, function() { // Token is invalid 
            console.log('invalid token');
            // Go to login, close splashscreen 
            $state.go('home');
            $cordovaSplashscreen.hide();
        });
    */
    $state.go('tables');
    });
}])
.config(function() {
    // Stripe.setPublishableKey('pk_test_rWwRxSPszJRNxUv0nYL1QWUR');
})
.controller('appCtrl', ['$scope', '$state', 'auth', function ($scope, $state, auth) {
    /* Logs a user out and returns them to the login screen */
    $scope.logout = function() {
        auth.logout();
    };
    /* Stubbed out. Don't put things here. */
}]);