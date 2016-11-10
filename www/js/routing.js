(function(){

	var app = angular.module('starter.routing', []);

	app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider){
		$ionicConfigProvider.backButton.previousTitleText(false).text('');

		var sp = $stateProvider;
			sp.state('ingreso', {
				url:'/ingreso',
		    	cache: false,
		    	templateUrl: 'templates/ingreso.html',
				controller: 'IngresoCtrl'
			});
			sp.state('eventmenu.inicio', {
		    	url: '/inicio',
		    	cache: false,
		    	views: {
		    		'menuContent': {
		    			templateUrl: 'templates/inicio.html',
			          	controller: 'InicioCtrl'
		    		}
		    	}
		    });
		    // INICIO COTIZAR
		    sp.state('eventmenu.cotizar', {
		    	url: '/cotizar',
		    	cache: false,
		    	views: {
		    		'menuContent': {
		    			templateUrl: 'templates/cotizar/cotizar.html',
			          	controller: 'CotizarCtrl'
		    		}
		    	}
		    });
		    // cotizar nuevo
		    sp.state('eventmenu.cotizarNuevo', {
		    	url: '/cotizar-nuevo',
		    	cache: false,
		    	views: {
		    		'menuContent': {
		    			templateUrl: 'templates/cotizar/cotizar_nuevo.html',
			          	controller: 'CotizarNuevoCtrl'
		    		}
		    	}
		    });
		    sp.state('eventmenu.cotizarNuevoLetrero', {
		    	url: '/cotizar-nuevo-letrero',
		    	cache: false,
		    	views: {
		    		'menuContent': {
		    			templateUrl: 'templates/cotizar/letreros/letrero.html'
		    		}
		    	}
		    });
		    sp.state('eventmenu.cotizarNuevoLetreroBacklight', {
		    	url: '/cotizar-nuevo-letrero-caja',
		    	cache: false,
		    	views: {
		    		'menuContent': {
		    			templateUrl: 'templates/cotizar/letreros/letrero_backlight.html'
		    		}
		    	}
		    });
		    // FIN COTIZAR
		    // MENU LATERAL IZQUIERDO
			sp.state('eventmenu', {
		    	url: '/event',
	      		abstract: true,
	      		templateUrl: 'templates/menu.html'
	    	});

		$urlRouterProvider.otherwise('/ingreso');
	});

}());