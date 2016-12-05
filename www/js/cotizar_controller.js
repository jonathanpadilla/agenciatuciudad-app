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

	app.controller('CotizarNuevoCtrl', function($scope){

		// var lista_json = {"1":{"nombre":"Letrero","imagen":"placeholder.png","visible":true,"valor":0,"next":"seleccionarItem(1)","sub":{"1":{"nombre":"Backlight","imagen":"placeholder.png","visible":true,"valor":0,"next":"seleccionarItem(1)","sub":{"4":{"nombre":"Con caja","imagen":"placeholder.png","visible":true,"valor":0,"next":"seleccionarItem(4)","sub":{"6":{"nombre":"Con luz","imagen":"placeholder.png","visible":true,"valor":0,"next":"seleccionarItem(6)"},"7":{"nombre":"Sin luz","imagen":"placeholder.png","visible":false,"valor":0,"next":"seleccionarItem(7)"}}},"5":{"nombre":"Sin caja","imagen":"placeholder.png","visible":false,"valor":0,"next":"seleccionarItem(5)"}}},"2":{"nombre":"Pendon","imagen":"placeholder.png","visible":true,"valor":0,"next":"seleccionarItem(2)"},"3":{"nombre":"Acrilico","imagen":"placeholder.png","visible":true,"valor":0,"next":"seleccionarItem(3)"}}},"2":{"nombre":"P\u00e1ginas web","imagen":"placeholder.png","visible":true,"valor":0,"next":"seleccionarItem(2)"},"3":{"nombre":"Papeleria","imagen":"placeholder.png","visible":true,"valor":0,"next":"seleccionarItem(3)"},"4":{"nombre":"Intranet","imagen":"placeholder.png","visible":true,"valor":0,"next":"seleccionarItem(4)"},"5":{"nombre":"Branding","imagen":"placeholder.png","visible":true,"valor":0,"next":"seleccionarItem(5)"},"6":{"nombre":"Campa\u00f1as","imagen":"placeholder.png","visible":true,"valor":0,"next":"seleccionarItem(6)"}};

		// // console.log(lista_json);

		// // var buscar = lista_json;
		// // console.log(buscar[1].sub[1].sub[4].sub);

		// $scope.productos = lista_json;

		// $scope.seleccionarItem = function(id)
		// {
		// 	// console.log(x);
		// 	$scope.productos = $scope.productos[id].sub;
		// }
	});

	app.controller('EnviarProductosCtrl', function($scope, $state, $http, $ionicLoading, $ionicPopup, $ionicModal, item_producto){
		$ionicLoading.show({
          	template: '<p>Cargando...</p><ion-spinner></ion-spinner>'
        });

  		$ionicModal.fromTemplateUrl('formulario', {
		    scope: $scope,
		    animation: 'slide-in-up'
		}).then(function(modal) {
		    $scope.modal = modal;
		});

		item_producto.getAll().then(
			function(rs){

				if(rs.rows.length > 0)
				{
					var results = [];
					for(var i=0; i<rs.rows.length; i++){
				        results.push(rs.rows.item(i));
				    }

				    $http.post(path+'cotizacion/informacion-producto-total/', {producto: results }).then(
				    	function(cn){
				    		$scope.productos = cn.data.result;
				    		$scope.valor_total = cn.data.total;
				    		$ionicLoading.hide();
				    		console.log(cn.data.result);
				    	}, function(err){
				    		$ionicLoading.hide();
				    		var alertPopup = $ionicPopup.alert({
					            title: 'Error de servidor.',
					        });
				    		console.log(err);
				    	});
				}else{
					$ionicLoading.hide();
					$state.go('eventmenu.cotizar');
				}

			}, function(err){
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
		            title: 'Error interno.',
		        });
				console.log(err);
			});        

		$scope.eliminar = function(pedido)
		{
			console.log(pedido);
			item_producto.cancelProducto(pedido).then(
				function(rs){
					$state.reload(true);
					console.log(rs);
				}, function(err){
					console.log(err)
				});
		}

		// formulario
		$scope.form = {
			nombre: '',
			organizacion: '',
			correo: '',
			telefono: '',
			observacion: ''
		};

		$scope.enviarCotizacion = function()
		{
			$ionicLoading.show({
	          	template: '<p>Enviando...</p><ion-spinner></ion-spinner>'
	        });

			var cotizacion = {
				form: $scope.form,
				productos: $scope.productos
			}

			if(cotizacion.form.nombre != '' && cotizacion.form.correo != '' && cotizacion.form.telefono != '')
			{
				$http.post(path+'cotizacion/enviar/', {cotizacion: cotizacion }).then(
			    	function(cn){
			    		if(cn.data.result)
			    		{
			    			console.log(cn);	

			    			$scope.form = {
								nombre: '',
								organizacion: '',
								correo: '',
								telefono: '',
								observacion: ''
							};

							item_producto.clear().then(
								function(clear){
									$ionicLoading.hide();
									$scope.modal.hide();
									$state.go('eventmenu.cotizar');
									// $state.reload(true);

								}, function(err){
									$ionicLoading.hide();
									var alertPopup = $ionicPopup.alert({
							            title: 'Error al limpiar la base de datos.',
							        });
									console.log(err)
								});
							

			    		}else{
			    			$ionicLoading.hide();
			    			var alertPopup = $ionicPopup.alert({
					            title: 'Error de servidor, informar a soporte.',
					        });
			    		}

			    	}, function(err){
			    		$ionicLoading.hide();
			    		var alertPopup = $ionicPopup.alert({
				            title: 'Error de servidor.',
				        });
			    		console.log(err);
			    	});

			}else{
				$ionicLoading.hide();
				var alertPopup = $ionicPopup.alert({
		            title: 'Información requerida',
		        });
				console.log('falta información');
			}
		}
	});

	app.controller('FinalizarCotizacionCtrl', function($http, $scope, $state, $stateParams, item_producto, $ionicHistory, $ionicLoading, $ionicPopup, $window){

		$ionicLoading.show({
          	template: '<p>Cargando...</p><ion-spinner></ion-spinner>'
        });

        $scope.tipo = 1;

        $scope.form = {
        	alto: 1,
        	largo: 1,
        	comentario: ''
        };

        // this.actualizar_total();

        $scope.actualizar_total = function(){
        	$scope.total_producto = ($scope.form.alto * $scope.form.largo) * $scope.total;
        }

		item_producto.getByPedido().then(
			function(rs){

				if(rs.rows.length > 0)
				{
					var results = [];
					for(var i=0;i < rs.rows.length; i++){
				        results.push(rs.rows.item(i));
				    }

				    $http.post(path+'cotizacion/informacion-producto/', {producto: results }).then(
				    	function(cn){
				    		$scope.informacion = cn.data.result;

				    		$scope.total = 0;
				    		angular.forEach($scope.informacion, function(value, key){
				    			$scope.total += value.valor;
				    		});

				    		$scope.total_producto = ($scope.form.alto * $scope.form.largo) * $scope.total;

				    		$ionicLoading.hide();
				    		// console.log(cn.data.result);
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

			item_producto.finalizar(pedido, $scope.form.comentario, $scope.form.alto, $scope.form.largo).then(
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