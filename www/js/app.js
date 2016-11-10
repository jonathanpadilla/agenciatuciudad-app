(function(){

  var app = angular.module('starter', ['ionic', 'starter.routing', 'starter.controller']);

  app.run(function($ionicPlatform, $rootScope, $state) {

    $ionicPlatform.ready(function() {

      if(window.cordova && window.cordova.plugins.Keyboard) {

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        cordova.plugins.Keyboard.disableScroll(true);
      }

      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

    });

    // agregar nueva cotizacion
    $rootScope.add_item_cotizacion = function(route) {
      $state.go(route);
    }

  })

}());