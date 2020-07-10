angular.module('confesiones', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
			var authResolveBlock = {
            'auth': ['$q', 'AuthService', function($q, AuthService) {
					return $q(function (resolve, reject) {
						if (AuthService.isLogged()) {
							resolve(AuthService.getUsuario());
						} 
						else {
							reject({
								'status': 0,
								'error': 'Login incorrecto'
							});
						}
					});
				}]
			};
			$routeProvider
				.when('/', {
					'templateUrl': 'views/welcome.html',
					'controller': 'menuCtrl'
				})
				.when('/about', {
					'templateUrl': 'views/about.html'
				})
				.when('/login', {
					'templateUrl': 'views/login.html',
					'controller': 'loginCtrl'
				})
				.when('/logout', {
					'template': '<p>Cerrando sesión...</p>',
					'controller': 'logoutCtrl'
				})
				.when('/listado_confesiones', {
					'templateUrl': 'views/listado_confesiones.html',
					'controller': 'listado_confesionesCtrl'
				})
				.when('/listado_confesiones/todas', {
					'templateUrl': 'views/listado_confesiones_panel.html',
					'controller': 'listado_confesiones_panelCtrl'
				})
				.when('/listado_confesiones/:id', {
					'templateUrl': 'views/listado_confesiones.html',
					'controller': 'listado_confesionesCtrl'
				})
			    .when('/listado_confesiones/todas/:id', {
					'templateUrl': 'views/ver_confesion.html',
					'controller': 'listado_confesiones_panel_verCtrl'
				})
			    .when('/listado_confesiones/todas/:id/editar', {
					'templateUrl': 'views/editar_confesion_panel.html',
					'controller': 'listado_confesiones_panel_editarCtrl'
				})
			    .when('/listado_confesiones/todas/:id/eliminar', {
					'templateUrl': 'views/eliminar_confesion.html',
					'controller': 'listado_confesiones_eliminarCtrl'
				})
				.when('/listado_confesiones/:id/:fk/eliminar', {
					'templateUrl': 'views/eliminar_confesion.html',
					'controller': 'listado_confesiones_eliminarCtrl'
				})
				.when('/listado_confesiones/:id/:fk/editar', {
					'templateUrl': 'views/editar_confesion.html',
					'controller': 'listado_confesiones_editarCtrl'
				})
				.when('/usuarios', {
					'templateUrl': 'views/listado_usuarios.html',
					'controller': 'listadoCtrl'
				})
				.when('/usuarios/nuevo', {
					'templateUrl': 'views/nuevo_usuario.html',
					'controller': 'nuevoCtrl'
				})
				.when('/usuarios/:id', {
					'templateUrl': 'views/ver_usuario.html',
					'controller': 'verCtrl'
				})
				.when('/usuarios/:id/editar', {
					'templateUrl': 'views/editar_usuario.html',
					'controller': 'editarCtrl'
				})
				.when('/usuarios/:id/eliminar', {
					'templateUrl': 'views/eliminar_usuario.html',
					'controller': 'eliminarCtrl'
				})
				.otherwise('/');
		}
	])
	
    .run(['$rootScope', '$location', function($rootScope, $location) {
        $rootScope.$on('$routeChangeSuccess', function (data) {
        });
        $rootScope.$on('$routeChangeError', function (event, current, previous, rejectData) {
            $location.url('/'); 
        });
    }]);