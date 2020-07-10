angular.module('confesiones').service('SexoService', ['$http',
    function($http) {
		this.listar_sexos = function() {
            return $http.get('api/listar_sexos.php');
        };
        this.atexto = function(dts) {
			switch(dts){
				case "1":
					dts="Hombre";
				break;
				case "2":
					dts="Mujer";
				break;
				case "3":
					dts="Otro";
				break;
			}
			return dts;
        };
    }
]);