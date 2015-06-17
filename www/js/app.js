// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('finance', ['ionic', 'finance.controllers'])

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

    .state('app.categorie', {
    url: "/categories/:Id",
    views: {
      'menuContent': {
        templateUrl: "templates/category.html",
        controller: 'CategoryCtrl'
      }
    }
  })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/accounts');
});
