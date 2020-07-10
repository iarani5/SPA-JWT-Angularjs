angular.module('confesiones')
    .service('AuthService', [
        '$http',
        function($http) {
            var authData, token;
            function getToken() {
                return localStorage.getItem('token');
            }
            this.login = function (user) {
				return $http.post('api/login.php', user).then(
                    function (resp) {
                        var data = resp.data.data;
                        token = data.token;
                        localStorage.setItem('token', token);
                        localStorage.setItem('usuario', angular.toJson(data));
				 	    return resp;
                    },
                    function (resp) {
                        //console.log('Ups! Hubo un problema, intentelo más tarde');
                    }
                );
            };

            this.logout = function () {
                localStorage.removeItem('token');
                localStorage.removeItem('usuario');
				return $http.post('api/logout.php');
            };

            this.getAuthorizationHeader = function() {
                return {
                    'headers': {
                        'Auth-Token': getToken()
                    }
                };
            };

            this.getUsuario = function() {
                return localStorage.getItem('usuario');
            };

            this.isLogged = function() {
                return localStorage.getItem('token') != null;
            };
        }
    ]);