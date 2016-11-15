(function(){

	var app = angular.module('starter.ajustes_controller', ['ngCordova']);

	app.controller('AjustesCtrl', function($scope, $state, item_producto, $ionicLoading, $ionicPopup)
	{

		$scope.limpiarDb = function()
		{
			$ionicLoading.show({
	          	template: '<p>Cargando...</p><ion-spinner></ion-spinner>'
	        });

			item_producto.clear().then(
				function(){
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
			            title: 'Realizado',
			        });
				}, function(){
					$ionicLoading.hide();
					var alertPopup = $ionicPopup.alert({
			            title: 'Error interno',
			        });
				});
		}
	});

}());