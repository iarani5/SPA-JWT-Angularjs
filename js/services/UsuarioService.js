angular.module('confesiones').service('UsuarioService', [ '$http', '$q', 
        function($http, $q) {
            this.listar_usuarios = function() {
                return $http.get('api/listar_usuarios.php');
            };
			this.crear = function(usuario) {
                return $http.post('api/crear_usuario.php', usuario);
            };
			this.getId = function(id) {
                return $http.get('api/datos_usuario.php?id=' + id);
            };
			 this.eliminar = function(id) {
                return $http.delete('api/eliminar_usuario.php?id=' + id);
            };
            this.editar = function(id, usuario) {
                return $http.put('api/editar_usuario.php?id=' + id, usuario);
            };
            this.login = function(usuario) {
                return $http.post('api/login.php', usuario);
            };
			this.getNombreEdad = function(id) {
				var defered = $q.defer();
				$http.get('api/nombre_edad_sexo_usuario.php?id=' + id)
					.success(function(data) {
						defered.resolve(data);
					})
					.error(function(err) {
						defered.reject(err)
					});
				return defered.promise;
            };
        }]);
