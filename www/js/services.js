(function(){

	var app = angular.module('starter.services', ['ionic', 'ngCordova']);

	app.factory('item_producto', function($cordovaSQLite, $rootScope){

		return {
			set: function(producto, nivel, item, comentario)
			{
				var pedido = parseInt(localStorage.getItem("item_activo"));

      			var query = "INSERT INTO item_producto (pedido, producto, nivel, item, comentario) VALUES (?, ?, ?, ?, ?)";
                return $cordovaSQLite.execute($rootScope.db, query, [pedido, producto, nivel, item, comentario]);
			},
			getByNivel: function(nivel)
			{
				var pedido = parseInt(localStorage.getItem("item_activo"));

				var query = "SELECT * FROM item_producto WHERE nivel = ? AND pedido = ?";
                return $cordovaSQLite.execute($rootScope.db, query, [nivel, pedido]);
			},
			getAll: function()
			{

			},
			update: function(id, item, comentario)
			{
				var query = "UPDATE item_producto SET item = ?, comentario = ? where id = ?";
                return $cordovaSQLite.execute($rootScope.db, query, [item, comentario, id]);
			},
			clear: function()
			{
				var query = "DELETE FROM item_producto";
                return $cordovaSQLite.execute($rootScope.db, query);
			}
		}

	});

}());