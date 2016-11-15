(function(){

	var path = 'http://intranet.agenciatuciudad.com/app_dev.php/mobil/';
	var app = angular.module('starter.cotizar_controller', ['ngCordova']);

	app.controller('CotizarCtrl', function($ionicHistory, $scope, item_producto){

		item_producto.getLength().then(
			function(rs){
				$scope.total_productos = rs.rows.length;
				console.log(rs);
			}, function(err){
				$scope.total_productos = 0;
				console.log(err);
			});

		$ionicHistory.clearHistory();
	});

	app.controller('CotizarNuevoCtrl', function(){

	});

	app.controller('EnviarProductosCtrl', function($scope, $http, $ionicLoading, $ionicPopup, $ionicModal){
		// $ionicLoading.show({
  //         	template: '<p>Cargando...</p><ion-spinner></ion-spinner>'
  //       });

		// var alertPopup = $ionicPopup.alert({
  //           title: 'Error interno, intente nuevamente.',
  //       });
  //       $ionicLoading.hide();

  		$ionicModal.fromTemplateUrl('formulario', {
		    scope: $scope,
		    animation: 'slide-in-up'
		}).then(function(modal) {
		    $scope.modal = modal;
		});

		// $scope.openModal = function() {
		//     $scope.modal.show();
		//   };
		//   $scope.closeModal = function() {
		//     $scope.modal.hide();
		//   };
		//   // Cleanup the modal when we're done with it!
		//   $scope.$on('$destroy', function() {
		//     $scope.modal.remove();
		//   });
		//   // Execute action on hide modal
		//   $scope.$on('modal.hidden', function() {
		//     // Execute action
		//   });
		//   // Execute action on remove modal
		//   $scope.$on('modal.removed', function() {
		//     // Execute action
		//   });
	});

	app.controller('FinalizarCotizacionCtrl', function($http, $scope, $state, $stateParams, item_producto, $ionicHistory, $ionicLoading, $ionicPopup, $window){

		$ionicLoading.show({
          	template: '<p>Cargando...</p><ion-spinner></ion-spinner>'
        });

		item_producto.getByPedido().then(
			function(rs){

				if(rs.rows.length > 0)
				{
					var results = [];
					for(var i=0; i<rs.rows.length; i++){
				        results.push(rs.rows.item(i));
				    }

				    $http.post(path+'cotizacion/informacion-producto/', {producto: results }).then(
				    	function(cn){
				    		$scope.informacion = cn.data.result;
				    		$ionicLoading.hide();
				    		console.log(cn.data.result);
				    	}, function(err){
				    		$ionicLoading.hide();
				    		console.log(err);
				    	});
				}else{
					$ionicLoading.hide();
					$state.go('eventmenu.cotizar');
				}

			}, function(err){
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
		            title: 'Error interno, intente nuevamente.',
		        });
				console.log(err);
			});

		$scope.finalizar = function(btn){

			$ionicLoading.show({
	          	template: '<p>Cargando...</p><ion-spinner></ion-spinner>'
	        });

			var pedido = window.localStorage.getItem("item_activo");

			item_producto.finalizar(pedido).then(
				function(rs){
					// limpiar historial
					$ionicHistory.clearHistory();

					// limpiar pedido local storage
					window.localStorage.setItem( 'item_activo', 0 );

					$ionicLoading.hide();
					if(btn == 1)
					{
						$state.go('eventmenu.cotizar');
					}else{
						$state.go('eventmenu.cotizarNuevo');
					}

				}, function(err){
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
			            title: 'Error interno, intente nuevamente.',
			        });
					console.log();
				});

		};

	});

}());