angular.module('confesiones').service('MenuService', [
    function() {
        this.cargar = function (AuthService,$scope) {
            if(AuthService.isLogged()){
				$scope.user=AuthService.getUsuario();
				$scope.menu=[];
				$scope.item={
					"nombre" : "Home",
					"ruta" : "listado_confesiones"
				};
				$scope.menu.push($scope.item);
				$scope.item={
					"nombre" : "Mias",
					"ruta" : "listado_confesiones/"+angular.fromJson($scope.user)["ID"]
				};
				$scope.menu.push($scope.item);
				if(angular.fromJson($scope.user).NIVEL=="admin"){
					$scope.item={
						"nombre" : "Todas",
						"ruta" : "listado_confesiones/todas"
					};
					$scope.menu.push($scope.item);
					$scope.item={
						"nombre" : "Usuarios",
						"ruta" : "usuarios"
					};
					$scope.menu.push($scope.item);
				}
				$scope.item={
					"nombre" : "Logout",
					"ruta" : "logout"
				};
				$scope.menu.push($scope.item);
			}
			else{
				$scope.menu=[];
				$scope.item={
					"nombre" : "Registro",
					"ruta" : "usuarios/nuevo"
				};
				$scope.menu.push($scope.item);
				$scope.item={
					"nombre" : "Login",
					"ruta" : "login"
				};
				$scope.menu.push($scope.item);
				$scope.item={
					"nombre" : "About",
					"ruta" : "about"
				};
				$scope.menu.push($scope.item);
			}
			return $scope.menu;
        }
    }
]);