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
		    	url: '/cotizar/letrero',
		    	cache: false,
		    	views: {
		    		'menuContent': {
		    			templateUrl: 'templates/cotizar/letreros/letrero.html'
		    		}
		    	}
		    });
		    sp.state('eventmenu.cotizarNuevoLetreroBacklightCaja', {
		    	url: '/cotizar/letrero/backlight/caja',
		    	cache: false,
		    	views: {
		    		'menuContent': {
		    			templateUrl: 'templates/cotizar/letreros/letrero_backlight_caja.html'
		    		}
		    	}
		    });
		    sp.state('eventmenu.cotizarNuevoLetreroBacklightCajaLuz', {
		    	url: '/cotizar/letrero/backlight/caja/luz',
		    	cache: false,
		    	views: {
		    		'menuContent': {
		    			templateUrl: 'templates/cotizar/letreros/letrero_backlight_caja_luz.html'
		    		}
		    	}
		    });

		    sp.state('eventmenu.finalizarCotizacion', {
		    	url: '/cotizar/finalizar',
		    	cache: false,
		    	views: {
		    		'menuContent': {
		    			templateUrl: 'templates/cotizar/finalizar_cotizacion.html'
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