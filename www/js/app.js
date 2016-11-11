(function(){

  var app = angular.module('starter', ['ionic', 'ngCordova', 'starter.routing', 'starter.controller', 'starter.services']);

  app.run(function($ionicPlatform, $rootScope, $state, $cordovaSQLite, $ionicLoading, item_producto) {

    $ionicPlatform.ready(function() {

      if(window.cordova && window.cordova.plugins.Keyboard) {

        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        cordova.plugins.Keyboard.disableScroll(true);
      }

      if(window.StatusBar) {
        StatusBar.styleDefault();
      }

      // agregar nueva cotizacion
      $rootScope.add_item_cotizacion = function(nuevo, producto, nivel, item, route) {

        $ionicLoading.show({
          template: '<p>Cargando...</p><ion-spinner></ion-spinner>'
        });

        // nueva cotizacion
        if(nuevo)
        {
          if(localStorage.getItem("item_activo") === null)
          {
            window.localStorage.setItem( 'item_activo', 1 );
          }else{
            var last_c = parseInt(localStorage.getItem("item_activo"));
            var new_c = last_c + 1;
            window.localStorage.setItem( 'item_activo', new_c );
          }
        }

        // validar si existe item
        item_producto.getByNivel(nivel).then(
          function(rs){
            
            if(rs.rows.length)
            {
              // actualizar item
              item_producto.update(rs.rows.item(0).id, item, 'comentario').then(
                function(rs){

                  if(rs.rowsAffected == 1)
                  {
                    $ionicLoading.hide();
                    $state.go(route);
                  }else{
                    $ionicLoading.hide();
                    console.log('Item no actualizado');
                  }

                }, function(err){

                  $ionicLoading.hide();
                  console.log(err);
                }
              );
            }else{
              // guardar item
              item_producto.set(producto, nivel, item, 'comentario').then(
                function(rs){
                  if(rs.rowsAffected == 1)
                  {
                    $ionicLoading.hide();
                    $state.go(route);
                  }else{
                    $ionicLoading.hide();
                    console.log('Item no guardado');
                  }
                }, function(err){
                  $ionicLoading.hide();
                  console.log(err);
                }
              );
            }

          }, function(err){
            $ionicLoading.hide();
            console.log(err);
          }
        );

        // item_producto.clear();
      }

      // base de datos
      if (window.cordova){$db = $cordovaSQLite.openDB({ name: "tuciudad.db", location: 1});} //device
      else{$db = window.openDatabase("tuciudad.db", '1', 'base de datos tuciudad', 2 * 1024 * 1024);} // browser

      var query = "CREATE TABLE item_producto("
                +"id INTEGER PRIMARY KEY AUTOINCREMENT, "
                +"pedido INTEGER, "
                +"producto INTEGER, "
                +"nivel INTEGER, "
                +"item INTEGER, "
                +"comentario TEXT)";

      // var query = "DROP TABLE item_producto";
                
      $cordovaSQLite.execute($db, query);
      $rootScope.db = $db;

    });

  })

}());