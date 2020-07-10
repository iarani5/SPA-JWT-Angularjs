angular.module('confesiones')
	.controller('menuCtrl', [
        '$scope',
        'AuthService',
        'MenuService',
        function ($scope, AuthService, MenuService) {
			MenuService.cargar(AuthService,$scope);
        }
    ])
	.controller('loginCtrl', [
        '$scope',
        '$location',
        'AuthService',
        'MenuService',
        function ($scope, $location, AuthService, MenuService) {
			if(!AuthService.isLogged()){
				$scope.title="Login";
				$scope.logeado = false;
				$scope.login = function (usuario) {
					$scope.mensaje_mail=false;
					$scope.mensaje_contrasenia=false;
					AuthService.login(usuario).then(function (res) {
							if(res.data.status==1){
								MenuService.cargar(AuthService,$scope);
								$location.url('/listado_confesiones');
							}
							else if(res.data.status==2){
								$scope.mensaje_mail=true;
								$scope.usuario_mensaje=res.data.mensaje;
							}
							else if(res.data.status==3){
								$scope.mensaje_contrasenia=true;
								$scope.contrasenia_mensaje=res.data.mensaje;
							}
							else{
								console.log($scope.mensaje);
								$scope.mensaje=res.data.mensaje;
							}
						}, 
						function (res) {
							$scope.mensaje='Ups! Hubo un problema, intentelo más tarde';
						});
				}
			}
			else{
				$location.url('/listado_confesiones');
			}
        }
    ])
    .controller('logoutCtrl', [
        '$scope',
        '$location',
        'AuthService',
        function ($scope, $location, AuthService) {
            AuthService.logout().then(
				function(rta){
					if(rta.data=="ok"){
						$location.url('/');
					}
					else{
						//mensaje error
					}
				},
				function(rta){
					//mensjae error
				}
			);
        }
    ])
	.controller('listado_confesionesCtrl', [
		'$scope',
		'$routeParams',
		'$location',
		'ConfesionService',
		'SexoService',
		'AuthService',
		'UsuarioService',
		function($scope, $routeParams, $location,  ConfesionService, SexoService, AuthService, UsuarioService) {
			if(AuthService.isLogged()){
				$scope.mensaje="";
				$scope.loading = true;
				$scope.crear_confesion = function(){
					$scope.mensaje_titulo=false;
					$scope.mensaje_confesion=false;
					ConfesionService.crear_confesion($scope.confesion).then(
						function(res){
							console.log(res);
							if(res.data.status==2){
								$scope.mensaje_titulo=true;
								$scope.titulo_mensaje=res.data.mensaje;
							}
							else if(res.data.status==3){
								$scope.mensaje_confesion=true;
								$scope.confesion_mensaje=res.data.mensaje;
							}
							else if(res.data.status==1){
								//res.data.message;
								$location.url('/listado_confesiones/'+angular.fromJson(AuthService.getUsuario()).ID);
							}
							else{
								//res.data.message;
							}
						},
					    function(res){
							
						}
					);
				}
				ConfesionService.listar_confesiones().then(
					function(rta) {
						$scope.elementos=[];
						for(var i in rta.data){
							$scope.elementos.push(UsuarioService.getNombreEdad(rta.data[i]["FKUSUARIO"])
							.then(function(data) {
								for(var j in rta.data){
									if(rta.data[j]["FKUSUARIO"]==data["FKUSUARIO"]){
										rta.data[j]["USUARIO"]=data["USUARIO"];
										rta.data[j]["EDAD"]=data["FECHA_NACIMIENTO"];
										rta.data[j]["SEXO"]=SexoService.atexto(data["FKSEXO"]);
									}
								}
							}));
						}
						if($routeParams.id){
							if(angular.fromJson(AuthService.getUsuario())!=null&&angular.fromJson(AuthService.getUsuario()).ID==$routeParams.id){
								$scope.mias=true;
								$scope.array=[];
								for(var i in rta.data){
									if($routeParams.id==rta.data[i]["FKUSUARIO"]){
										$scope.array.push(rta.data[i]);
									}
								}
								$scope.confesiones=$scope.array.reverse();
							}
							else{
								//console.log("no tenes permiso");
								$scope.confesiones=rta.data.reverse();
							}
						}
						else{
							$scope.mias=false;
							$scope.confesiones=rta.data.reverse();
						}
						$scope.loading = false;
						/*if(mensaje!=undefined){
							$scope.mensaje=mensaje;
						}*/
					}, 
					function(rta) {
						$scope.mensaje='Ups! Hubo un problema, intentelo más tarde';
					}
				);
			}
			else{
				console.log("no logeado");
				//$location.path('/');
			}
		}
	])
	.controller('listadoCtrl', [
		'$scope',
		'$location',
		'UsuarioService',
		'SexoService',
		'AuthService',
		function($scope, $location, UsuarioService, SexoService, AuthService) {
			$scope.mensaje="";
			if(angular.fromJson(AuthService.getUsuario())!=null&&angular.fromJson(AuthService.getUsuario()).NIVEL=="admin"){
				$scope.usuarios = [];
				$scope.loading = true;
				UsuarioService.listar_usuarios().then(
					function(rta) {
						//if(rta.data.status==200){
							for(var i=0;i<rta.data.length;i++){
								rta.data[i]["SEXO"]=SexoService.atexto(rta.data[i]["FKSEXO"]);
							}
							$scope.usuarios_listado=rta.data;
							$scope.loading = false;
							/*if(mensaje!=undefined){
								$scope.mensaje=mensaje;
							}*/
						/*}
						else{
							//mensaje no tenes permiso=rta.data.message;
						}*/
					}, 
					function(rta) {
						$scope.mensaje='Ups! Hubo un problema, intentelo más tarde';
					}
				);
			}
			else{
				$location.path('/');
				//mensaje no logeado;
			}
		}
	])
	.controller('nuevoCtrl', [
		'$scope', 
		'UsuarioService',
		'AuthService',
		'SexoService', 
		'$location', 
		function($scope, UsuarioService, AuthService, SexoService, $location) {
            $scope.title = "Crear nuevo Usuario";
            $scope.usuario = {};
			if(angular.fromJson(AuthService.getUsuario())!=null&&angular.fromJson(AuthService.getUsuario()).NIVEL=="admin"){
				$scope.nivel=true;
			}
			else{
				$scope.nivel=false;
			}
			SexoService.listar_sexos().then(
				function(rta) {
					$scope.sexos=rta.data;
					/*if(mensaje!=undefined){
						$scope.mensaje=mensaje;
					}*/
				}, 
				function(rta) {
					//$scope.mensaje='Ups! Hubo un problema, intentelo más tarde';
				}
			);
			
			$scope.crear = function() {
				$scope.mensaje_usuario=false;
				$scope.mensaje_mail=false;
				$scope.mensaje_contrasenia=false;
				$scope.mensaje_sexo=false;
				$scope.mensaje_fecha=false;
				$scope.mensaje_nivel=false;
                UsuarioService.crear($scope.usuario).then(
				    function(res){ 
					console.log(res);
					if(res.data.status==1){
							   if(angular.fromJson(AuthService.getUsuario())!=null&&angular.fromJson(AuthService.getUsuario()).NIVEL=="admin"){
									$location.path("/usuarios");
								}
								else{
									// mensaje = res.data.message; Ya estar registrado, logueate
									$location.path("/login");
									
								}
							}
							else if(res.data.status==2){
								$scope.mensaje_usuario=true;
								$scope.usuario_mensaje=res.data.mensaje;
							}
							else if(res.data.status==3){
								$scope.mensaje_mail=true;
								$scope.mail_mensaje=res.data.mensaje;
							}
							else if(res.data.status==4){
								$scope.mensaje_contrasenia=true;
								$scope.contrasenia_mensaje=res.data.mensaje;
							}
							else if(res.data.status==5){
								$scope.mensaje_sexo=true;
								$scope.sexo_mensaje=res.data.mensaje;
							}
							else if(res.data.status==6){
								$scope.mensaje_fecha=true;
								$scope.fecha_mensaje=res.data.mensaje;
							}
							else if(res.data.status==7){
								$scope.mensaje_nivel=true;
								$scope.nivel_mensaje=res.data.mensaje;
							}
							else{
								$scope.mensaje=res.data.mensaje;
							}
                    }, 
					function(res) {
                        $scope.mensaje='Ups! Hubo un problema, intentelo más tarde';
                    });
            }
		}
	])
	.controller('verCtrl', [
		'$scope',
		'$location',
		'$routeParams',
		'UsuarioService',
		'AuthService',
		'SexoService',
		function($scope, $location, $routeParams, UsuarioService, AuthService, SexoService) {
			if(angular.fromJson(AuthService.getUsuario())!=null&&angular.fromJson(AuthService.getUsuario()).NIVEL=="admin"){
				$scope.title = "Registro de usuario";
				$scope.usuario = {};
				$scope.loading = true;
				UsuarioService.getId($routeParams.id).then(
					function(rta) {
						if(rta.data.usuario){
							rta.data.usuario["SEXO"]=SexoService.atexto(rta.data.usuario.FKSEXO);
							$scope.usuario=rta.data.usuario;
							$scope.loading = false;
						}
						else{
							$location.path("/");
						}
					}, 
					function(rta) {
						
					}
				);
			}
			else{
				$location.path("/");
			}
		}
	])
	.controller('listado_confesiones_panel_verCtrl', [
		'$scope',
		'$location',
		'$routeParams',
		'ConfesionService',
		'UsuarioService',
		'SexoService',
		'AuthService',
		function($scope, $location, $routeParams, ConfesionService, UsuarioService, SexoService, AuthService) {
			if(angular.fromJson(AuthService.getUsuario())!=null&&angular.fromJson(AuthService.getUsuario()).NIVEL=="admin"){
				$scope.title = "VER DETALLE DE CONFESION";
				$scope.confesion = {};
				$scope.loading = true;
				ConfesionService.getId($routeParams.id).then(
					function(rta) {
						$scope.confesion=rta.data.confesion;
						$scope.loading = false;
					}, 
					function(rta) {
						//MENSAJE DE ERROR
					}
				);
			}
			else{
				//no tens permiso
				$location.path("/");
			}
		}
	])
	.controller('eliminarCtrl', [
		'$scope',
		'$routeParams',
		'$timeout',
		'$location',
		'UsuarioService',
		'AuthService',
		function($scope, $routeParams, $timeout, $location, UsuarioService, AuthService) {
			if(angular.fromJson(AuthService.getUsuario())!=null&&angular.fromJson(AuthService.getUsuario()).NIVEL=="admin"){
				$scope.title = "Eliminar Usuario?";
				$scope.eliminando = true;
				$scope.eliminarCompletado = false;
				$scope.usuario = {};
				$scope.loading = true;
				UsuarioService.getId($routeParams.id).then(
					function(rta) {
						if(rta.data.usuario!=null){
							$scope.usuario = rta.data.usuario;
							$scope.loading = false;
						}
						else{
							$location.path("/usuarios");
							//usuario inexistente
						}
					}, 
					function(rta) {
						
					}
				);
				$scope.eliminar = function(id) {
					UsuarioService.eliminar(id).then(
						function (rta) {
							$scope.eliminarCompletado = true;
							$scope.estadoStatus = rta.data.status;
							$scope.estadoTexto = rta.data.message;
							if(rta.data.status == 1) {
								$timeout(function () {
									//mensaje="Usuario Eliminado";
									$location.path('/usuarios');
								}, 1000);
							}
						},
						function (rta) {
							$scope.eliminarCompletado = false;
						}
					);
				}
			}
			else{
				$location.path("/");
			}
		}
	])
	.controller('listado_confesiones_eliminarCtrl', [
		'$scope',
		'$routeParams',
		'$timeout',
		'$location',
		'UsuarioService',
		'ConfesionService',
		'AuthService',
		function($scope, $routeParams, $timeout, $location, UsuarioService, ConfesionService, AuthService) {
			$scope.title = "Eliminar confesion?";
			$scope.eliminando = true;
			if(AuthService.isLogged()){
				if(!$routeParams.fk&&AuthService.getUsuario()!=null&&angular.fromJson(AuthService.getUsuario()).NIVEL=="admin"){
					$scope.esadmin=true;
				}
				else{
					$scope.esadmin=false;
				}
				$scope.eliminarCompletado = false;
				$scope.confesion = {};
				$scope.loading = true;
				ConfesionService.getId($routeParams.id).then(
					function(rta) {
						if(!rta.data.status){
							//rta.data.message
							$location.path("/");
						}
						else{
							$scope.confesion = rta.data.confesion;
							$scope.loading = false;
						}
					}, 
					function(rta) {
						
					}
				);
				$scope.eliminar = function(id) {
					ConfesionService.eliminar(id).then(
						function (rta) {
							$scope.eliminarCompletado = true;
							$scope.estadoStatus = rta.data.status;
							$scope.estadoTexto = rta.data.message;
							if(rta.data.status == 1) {
								$timeout(function () {
									//mensaje="Confesion Eliminado";
									if(!$routeParams.fk){
										$location.path('/listado_confesiones/todas');
									}
									else{
										$location.path('/listado_confesiones/'+angular.fromJson(AuthService.getUsuario()).ID);
									}
								}, 1000);
							}
						},
						function (rta) {
							$scope.eliminarCompletado = false;
						}
					);
				}
			}
			else{
				$location.url("/");
				//no tenes permiso
			}
		}
	])
	.controller('editarCtrl', [
		'$scope',
		'$routeParams',
		'UsuarioService',
		'SexoService',
		'AuthService',
		'$location',
		function($scope, $routeParams, UsuarioService, SexoService, AuthService, $location) {
			if($routeParams.id&&AuthService.getUsuario()!=null&&angular.fromJson(AuthService.getUsuario()).NIVEL=="admin"){
				$scope.title = "Editar Usuario";
				$scope.usuario = {};
				SexoService.listar_sexos().then(
					function(rta) {
						$scope.sexos=rta.data;
					}, 
					function(rta) {
						//$scope.mensaje='Ups! Hubo un problema, intentelo más tarde';
					}
				);
				UsuarioService.getId($routeParams.id).then(
					function(rta) {
						rta.data.usuario['FECHA_NACIMIENTO']=new Date(rta.data.usuario['FECHA_NACIMIENTO']);
						rta.data.usuario['CONTRASENIA']="";
						$scope.usuario = rta.data.usuario;
						$scope.loading = false;
					}, 
					function(rta) {
						$scope.mensaje="Ups! Hubo un error";
					}
				);

				$scope.editar = function() {
					$scope.mensaje_usuario=false;
					$scope.mensaje_mail=false;
					$scope.mensaje_contrasenia=false;
					$scope.mensaje_sexo=false;
					$scope.mensaje_fecha=false;
					$scope.mensaje_nivel=false;
					UsuarioService.editar($routeParams.id, $scope.usuario).then(
						function(res) {
							console.log(res);
							if(res.data.status==1){
							   // mensaje = res.data.message; usuario creado
									$location.path("/usuarios");
							}
							else if(res.data.status==2){
								$scope.mensaje_usuario=true;
								$scope.usuario_mensaje=res.data.mensaje;
							}
							else if(res.data.status==3){
								$scope.mensaje_mail=true;
								$scope.mail_mensaje=res.data.mensaje;
							}
							else if(res.data.status==4){
								$scope.mensaje_contrasenia=true;
								$scope.contrasenia_mensaje=res.data.mensaje;
							}
							else if(res.data.status==5){
								$scope.mensaje_sexo=true;
								$scope.sexo_mensaje=res.data.mensaje;
							}
							else if(res.data.status==6){
								$scope.mensaje_fecha=true;
								$scope.fecha_mensaje=res.data.mensaje;
							}
							else if(res.data.status==7){
								$scope.mensaje_nivel=true;
								$scope.nivel_mensaje=res.data.mensaje;
							}
							else{
								$scope.mensaje=res.data.mensaje;
							}
						}, 
						function(res) {
							$scope.mensaje="Ups! Hubo un error";
						});
				}
			}
			else{
				$location.path("/");
			}
		}
	])
	.controller('listado_confesiones_editarCtrl', [
		'$scope',
		'$routeParams',
		'ConfesionService',
		'AuthService',
		'$location',
		function($scope, $routeParams, ConfesionService, AuthService, $location) {
			if(AuthService.isLogged()){
				$scope.confesion = {};
					ConfesionService.getId($routeParams.id).then(
						function(rta) {
							$scope.loading = false;
							$scope.confesion=rta.data.confesion;
						}, 
						function(rta) {
							$scope.mensaje="Ups! Hubo un error.";
						}
					);

					$scope.editar = function() {
						$scope.mensaje_titulo=false;
						$scope.mensaje_confesion=false;
						ConfesionService.editar($routeParams.id, $scope.confesion).then(
							function(res) {
								if(res.data.status==2){
									$scope.mensaje_titulo=true;
									$scope.titulo_mensaje=res.data.mensaje;
								}
								else if(res.data.status==3){
									$scope.mensaje_confesion=true;
									$scope.confesion_mensaje=res.data.mensaje;
								}
							    else if(res.data.status==1){
								   // mensaje = res.data.message;
								   $location.path('/listado_confesiones/'+angular.fromJson(AuthService.getUsuario()).ID);
							   }
							    else{
								   $location.path("/listado_confesiones");
								   //n otenes permiso
								   // mensaje = res.data.message;
							    }
							}, 
							function(res) {
								$scope.mensaje="Ups! Hubo un error";
							}
						);
					}
				}
				else{
					//mensaje sin permiso
					$location.url("/");
				}
			/*}
			else{
				$location.url("/");
			}*/
		}
	])	
	.controller('listado_confesiones_panel_editarCtrl', [
		'$scope',
		'$routeParams',
		'ConfesionService',
		'UsuarioService',
		'AuthService',
		'$location',
		function($scope, $routeParams, ConfesionService, UsuarioService, AuthService, $location) {
			if($routeParams.id&&AuthService.getUsuario()!=null&&angular.fromJson(AuthService.getUsuario()).NIVEL=="admin"){
				$scope.confesion = {};
				$scope.title = "Editar confesion";
				ConfesionService.getId($routeParams.id).then(
					function(rta) {
						$scope.loading = false;
						rta.data.confesion['FECHA_CREACION_DATE']=new Date(rta.data.confesion['FECHA_CREACION']);
						rta.data.confesion['FECHA_CREACION_TIME']=new Date(rta.data.confesion['FECHA_CREACION']);
						UsuarioService.listar_usuarios().then(
							function(rta){
								$scope.usuarios=rta.data;
							},
							function(rta){
								
							}
						);
						$scope.confesion=rta.data.confesion;
					}, 
					function(rta) {
						$scope.mensaje="Ups! Hubo un error.";
					}
				);

				$scope.editar = function() {
					ConfesionService.editarPanel($routeParams.id, $scope.confesion).then(
						function(res) {
							if(res.data.status==2){
								$scope.mensaje_titulo=true;
								$scope.titulo_mensaje=res.data.mensaje;
							}
							else if(res.data.status==3){
								$scope.mensaje_confesion=true;
							    $scope.confesion_mensaje=res.data.mensaje;
							}
							else if(res.data.status==4){
								$scope.mensaje_fkusuario=true;
							    $scope.fkusuario_mensaje=res.data.mensaje;
							}
							else if(res.data.status==5){
								$scope.mensaje_fecha=true;
							    $scope.fecha_mensaje=res.data.mensaje;
							}
						    else if(res.data.status==1){
							   // mensaje = res.data.message;
								$location.path('/listado_confesiones/todas');
						    }
						    else{
							   // mensaje = res.data.message;
						    }
						}, 
						function(res) {
							$scope.mensaje="Ups! Hubo un error";
						}
					);
				}
			}
			else{
				$location.path("/");
			}
		}
	])	
	.controller('listado_confesiones_panelCtrl', [
		'$scope',
		'$routeParams',
		'$location',
		'ConfesionService',
		'SexoService',
		'AuthService',
		'UsuarioService',
		function($scope, $routeParams, $location,  ConfesionService, SexoService, AuthService, UsuarioService) {
			if(AuthService.isLogged()&&angular.fromJson(AuthService.getUsuario())!=null&&angular.fromJson(AuthService.getUsuario()).NIVEL=="admin"){
				$scope.mensaje="";
				$scope.loading = true;
				$scope.crear_confesion = function(){
					ConfesionService.crear_confesion($scope.confesion).then(
						function(res){
							if(res.data.status){
								//res.data.message;
								$location.url('/listado_confesiones/'+angular.fromJson(AuthService.getUsuario()).ID);
							}
							else{
								//res.data.message;
							}
						},
					    function(res){
							
						}
					);
				}
				ConfesionService.listar_confesiones().then(
					function(rta) {
						$scope.elementos=[];
						for(var i in rta.data){
							$scope.elementos.push(UsuarioService.getNombreEdad(rta.data[i]["FKUSUARIO"])
							.then(function(data) {
								for(var j in rta.data){
									if(rta.data[j]["FKUSUARIO"]==data["FKUSUARIO"]){
										rta.data[j]["USUARIO"]=data["USUARIO"];
										rta.data[j]["EDAD"]=data["FECHA_NACIMIENTO"];
										rta.data[j]["SEXO"]=SexoService.atexto(data["FKSEXO"]);
									}
								}
							}));
						}
						if($routeParams.id){
							$scope.mias=true;
							$scope.array=[];
							for(var i in rta.data){
								if($routeParams.id==rta.data[i]["FKUSUARIO"]){
									$scope.array.push(rta.data[i]);
								}
							}
							$scope.confesiones=$scope.array.reverse();
						}
						else{
							$scope.mias=false;
							$scope.confesiones=rta.data.reverse();
						}
						$scope.loading = false;
						/*if(mensaje!=undefined){
							$scope.mensaje=mensaje;
						}*/
					}, 
					function(rta) {
						$scope.mensaje='Ups! Hubo un problema, intentelo más tarde';
					}
				);
			}
			else{
				$location.path('/');
			}
		}
	]);


