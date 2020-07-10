angular.module('confesiones').service('ConfesionService', [ '$http',
        function($http) {
            this.listar_confesiones = function() {
                return $http.get('api/listar_confesiones.php');
            };
			this.crear_confesion = function(confesion) {
                return $http.post('api/crear_confesion.php', confesion);
            };
			this.getId = function(id) {
                return $http.get('api/datos_confesion.php?id=' + id);
            };
			this.eliminar = function(id) {
                return $http.delete('api/eliminar_confesion.php?id=' + id);
            };
            this.editar = function(id, confesion) {
                return $http.put('api/editar_confesion.php?id=' + id, confesion);
            };
            this.editarPanel = function(id, confesion) {
                return $http.put('api/editar_confesion_panel.php?id=' + id, confesion);
            };
        }
    ]);