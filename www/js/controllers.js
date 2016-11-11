(function(){

	var app = angular.module('starter.controller', ['ngCordova']);

	app.controller('IngresoCtrl', function($scope, $state)
	{

		$scope.login = function()
		{
			
			$state.go('eventmenu.inicio');
		}
	});

	app.controller('InicioCtrl', function(){
		
	});

	app.controller('CotizarCtrl', function(){

	});

	app.controller('CotizarNuevoCtrl', function(){

	});

}());