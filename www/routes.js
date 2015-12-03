/* This file contains all the state and routing information for ALL VIEWS */
angular.module('checkplease')
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    /* Default is login screen */
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'views/home/home.html',
        controller: 'homeCtrl'
    });

    $stateProvider.state('tables', {
        url: '/tables',
        templateUrl: 'views/tables/tables.html',
        controller: 'tablesCtrl'
    });

    $stateProvider.state('customers', {
        url: '/customers/:customer_id',
        templateUrl: 'views/customers/customers.html',
        controller: 'customersCtrl'
    });

    $stateProvider.state('menu', {
        url: '/menu',
        templateUrl: 'views/menu/menu.html',
        controller: 'menuCtrl'
    });

    $stateProvider.state('analysis', {
        url: '/analysis',
        templateUrl: 'views/analysis/analysis.html',
        controller: 'analysisCtrl'
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
}]);
