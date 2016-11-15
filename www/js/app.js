(function(){

  var app = angular.module('starter', ['ionic', 'ngCordova', 'starter.routing', 'starter.controller', 'starter.services']);

  app.run(function($ionicPlatform, $rootScope, $state, $cordovaSQLite, $ionicLoading, item_producto, $ionicPopup, $window) {

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
          if(window.localStorage.getItem("item_activo") == 0)
          {
            item_producto.getLast().then(
              function(rs){
                if(rs.rows.length)
                {
                  var last_c = parseInt(rs.rows.item(0).pedido);
                  var new_c = last_c + 1;
                  window.localStorage.setItem( 'item_activo', new_c );
                }else{
                  window.localStorage.setItem( 'item_activo', 1 );
                  console.log('Sin registros');
                }
                
              }, function(err){
                console.log(err);
              });
          }else{
            console.log('sumar 1 a item activo');
            var last_c = parseInt(window.localStorage.getItem("item_activo"));
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
                    $state.go(route, {}, {location: "replace", reload: true});
                  }else{
                    $ionicLoading.hide();
                    console.log('Item no actualizado');
                    var alertPopup = $ionicPopup.alert({
                      title: 'Información no actualizada.',
                    });
                  }

                }, function(err){

                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                    title: 'Error al actualizar información.',
                  });
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
                    $state.go(route, {}, {location: "replace", reload: true});
                  }else{
                    $ionicLoading.hide();
                    console.log('Item no guardado');
                    var alertPopup = $ionicPopup.alert({
                      title: 'Información no guardada.',
                    });
                  }
                }, function(err){
                  $ionicLoading.hide();
                  var alertPopup = $ionicPopup.alert({
                    title: 'Error al guardar información.',
                  });
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
                +"finalizado INTEGER, "
                +"comentario TEXT)";

      // var query = "DROP TABLE item_producto";
                
      $cordovaSQLite.execute($db, query);
      $rootScope.db = $db;

    });

  })

}());