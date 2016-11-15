(function(){

	var app = angular.module('starter.services', ['ionic', 'ngCordova']);

	app.factory('item_producto', function($cordovaSQLite, $rootScope){

		return {
			set: function(producto, nivel, item, comentario)
			{
				var pedido = parseInt(localStorage.getItem("item_activo"));

      			var query = "INSERT INTO item_producto (pedido, producto, nivel, item, finalizado, comentario) VALUES (?, ?, ?, ?, ?, ?)";
                return $cordovaSQLite.execute($rootScope.db, query, [pedido, producto, nivel, item, 0, comentario]);
			},
			getByNivel: function(nivel)
			{
				var pedido = parseInt(localStorage.getItem("item_activo"));

				var query = "SELECT * FROM item_producto WHERE nivel = ? AND pedido = ?";
                return $cordovaSQLite.execute($rootScope.db, query, [nivel, pedido]);
			},
			getByPedido: function()
			{
				var pedido = parseInt(localStorage.getItem("item_activo"));

				var query = "SELECT * FROM item_producto WHERE pedido = ?";
                return $cordovaSQLite.execute($rootScope.db, query, [pedido]);
			},
			getLast: function()
			{
				var query = "SELECT * FROM item_producto ORDER BY id DESC LIMIT 1";
                return $cordovaSQLite.execute($rootScope.db, query);
			},
			getLength: function()
			{
				var query = "SELECT * FROM item_producto WHERE finalizado = ? GROUP BY pedido";
                return $cordovaSQLite.execute($rootScope.db, query, [1]);
			},
			update: function(id, item, comentario)
			{
				var query = "UPDATE item_producto SET item = ?, comentario = ? where id = ?";
                return $cordovaSQLite.execute($rootScope.db, query, [item, comentario, id]);
			},
			finalizar: function(pedido)
			{
				var query = "UPDATE item_producto SET finalizado = ? where pedido = ?";
                return $cordovaSQLite.execute($rootScope.db, query, [1, pedido]);
			},
			clear: function()
			{
				var query = "DELETE FROM item_producto";
                return $cordovaSQLite.execute($rootScope.db, query);
			}
		}

	});

}());