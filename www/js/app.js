// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('finance', ['ionic', 'finance.controllers','ngAnimate', 'toastr' ])

  .run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.users', {
    url: "/users",
    views: {
      'menuContent': {
        templateUrl: "templates/userList.html",
        controller: 'UserListCtrl'
      }
    }
  })

    .state('app.user', {
    url: "/users/:Id",
    views: {
      'menuContent': {
        templateUrl: "templates/user.html",
        controller: 'UserCtrl'
      }
    }
  })

    .state('app.accounts', {
    url: "/accounts",
    views: {
      'menuContent': {
        templateUrl: "templates/accountList.html",
        controller: 'AccountListCtrl'
      }
    }
  })

    .state('app.account', {
    url: "/accounts/:Id",
    views: {
      'menuContent': {
        templateUrl: "templates/account.html",
        controller: 'AccountCtrl'
      }
    }
  })

  .state('app.categories', {
    url: "/categories",
    views: {
      'menuContent': {
        templateUrl: "templates/categoryList.html",
        controller: 'CategoryListCtrl'
      }
    }
  })

    .state('app.category', {
    url: "/categories/:Id",
    views: {
      'menuContent': {
        templateUrl: "templates/category.html",
        controller: 'CategoryCtrl'
      }
    }
  })

  .state('app.transactions', {
    url: "/transactions?year&month&categoryGuid",
    views: {
      'menuContent': {
        templateUrl: "templates/transactionList.html",
        controller: 'TransactionListCtrl'
      }
    }
  })

    .state('app.transaction', {
    url: "/transactions/:Id",
    views: {
      'menuContent': {
        templateUrl: "templates/transaction.html",
        controller: 'TransactionCtrl'
      }
    }
  })

  .state('app.balancePerAccount', {
    url: "/balance-per-account",
    views: {
      'menuContent': {
        templateUrl: "templates/balance-per-account.html",
        controller: 'BalancePerAccountCtrl'
      }
    }
  })

  .state('app.balancePerMonth', {
    url: "/balance-per-month?months",
    views: {
      'menuContent': {
        templateUrl: "templates/balance-per-month.html",
        controller: 'BalancePerMonthCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/transactions/0');
});
