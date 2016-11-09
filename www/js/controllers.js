(function(){

	var app = angular.module('starter.controller', []);

	app.controller('IngresoCtrl', function($scope, $state)
	{

		$scope.login = function()
		{
			$state.go('eventmenu.inicio');
		}
	});

	app.controller('InicioCtrl', function($scope, $ionicSideMenuDelegate){
		
		$scope.toggleLeft = function() {
		    $ionicSideMenuDelegate.toggleLeft();
		};
	});

}());