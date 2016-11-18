(function(){

	var app = angular.module('starter.base_controller', ['ngCordova']);

	app.controller('IngresoCtrl', function($scope, $state)
	{

		$scope.login = function()
		{
			window.localStorage.setItem( 'item_activo', 0 );
			$state.go('eventmenu.inicio');
		}
	});

	app.controller('InicioCtrl', function($scope){
		$scope.lista = {
			0: {
				nombre: 'Item1',
				foto: 'foto1',
				funcion: 'click(1)'
			},
			1: {
				nombre: 'Item2',
				foto: 'foto1',
				funcion: 'click(2)'
			}
		}

		$scope.click = function(x)
		{
			console.log(x);

			$scope.lista = {
			0: {
				nombre: 'Item3',
				foto: 'foto1',
				funcion: 'click(1)'
			},
			1: {
				nombre: 'Item4',
				foto: 'foto1',
				funcion: 'click(2)'
			}
		}
		}
	});

}());