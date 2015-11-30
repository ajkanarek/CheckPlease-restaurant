/* This file contains all the state and routing information for ALL VIEWS */
angular.module('checkplease')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    /* Default is login screen */
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home/home.html',
        controller: 'HomeCtrl'
    });

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/login/login.html',
        controller: 'loginCtrl'
    });

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'views/register/register.html',
        controller: 'registerCtrl'
    });

    $stateProvider.state('restaurants', {
        url: '/restaurants',
        templateUrl: 'views/restaurants/restaurants.html',
        controller: 'RestaurantsCtrl'
    });

    $stateProvider.state('tip', {
        url: '/tip',
        templateUrl: 'views/tip/tip.html',
        controller: 'TipCtrl'
    });

    $stateProvider.state('scan', {
        url: '/scan',
        templateUrl: 'views/scan/scan.html',
        controller: 'scanCtrl'
    });

    $stateProvider.state('bill', {
        url: '/bill/:restaurant_id',
        templateUrl: 'views/bill/bill.html',
        controller: 'billCtrl'
    });

    $stateProvider.state('orders', {
        url: '/orders',
        templateUrl: 'views/orders/orders.html',
        controller: 'OrdersCtrl'
    });

    $stateProvider.state('profile', {
        url: '/profile',
        templateUrl: 'views/profile/profile.html',
        controller: 'ProfileCtrl'
    });
}]);
