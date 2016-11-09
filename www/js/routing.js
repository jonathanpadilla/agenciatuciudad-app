(function(){

	var app = angular.module('starter.routing', []);

	app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){
		$ionicConfigProvider.backButton.previousTitleText(false).text('');

		$stateProvider
			.state('ingreso', {
				url:'/ingreso',
		    	cache: false,
		    	templateUrl: 'templates/ingreso.html',
				controller: 'IngresoCtrl'
			})
			.state('eventmenu.inicio', {
		    	url: '/inicio',
		    	cache: false,
		    	views: {
		    		'menuContent': {
		    			templateUrl: 'templates/inicio.html',
			          	controller: 'InicioCtrl'
		    		}
		    	}
		    })
			.state('eventmenu', {
		    	url: '/event',
	      		abstract: true,
	      		templateUrl: 'templates/menu.html'
	    	});

		$urlRouterProvider.otherwise('/ingreso');
	});

}());