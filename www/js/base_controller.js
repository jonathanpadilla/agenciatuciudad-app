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

	app.controller('InicioCtrl', function(){
	});

}());