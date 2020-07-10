DROP DATABASE IF EXISTS confesiones;
CREATE DATABASE confesiones;
USE confesiones;

-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-06-2016 a las 04:59:37
-- Versión del servidor: 10.1.13-MariaDB
-- Versión de PHP: 7.0.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `confesiones`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `confesion`
--

CREATE TABLE `confesion` (
  `ID` int(4) UNSIGNED NOT NULL,
  `TITULO` varchar(45) NOT NULL,
  `CONFESION` text NOT NULL,
  `FECHA_CREACION` datetime DEFAULT NULL,
  `FKUSUARIO` int(9) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `confesion`
--

INSERT INTO `confesion` (`ID`, `TITULO`, `CONFESION`, `FECHA_CREACION`, `FKUSUARIO`) VALUES
(1, 'Mi mejor amiga', 'Solo queria decirte que te volviste mas zorra de lo que eras maria c:', '2016-05-10 00:58:24', 1),
(2, 'mi secreto', 'cuando entre a la habitacion la prostituta me dijo "vos sos muy lindo para venir aca"... \nfue lo mas lindo que me dijeron en mucho tiempo', '2016-05-10 01:13:18', 2),
(3, 'Mi hermano mayor', 'A los cinco años un dia me desperté y resulta que mi hermano se me habia sentado en la cabeza y empezo a tirarse pedos... bueno, el tema es que me tenia inmovilizado y empece a gritar "mama, juampi me esta culeando" claro que yo no tenia ni idea lo que eso significaba. Nunca vi a mi vieja entrar tan rapido en mi habitacion!', '2016-05-10 01:16:14', 3),
(4, 'El gas pimienta', 'La cosa es así... Hace un tiempo mi viejo me compró un spray de esos que son anti-chorros porque decía que la calle estaba muy mal. Para mi era una chotada, hasta que un día un pibe vino con una navaja y me dijo que le diera el bolso. Le dije que iba a sacar los documentos y saqué mi super spray... lo abrí y en vez de tirarle en su cara lo tenia dado vuelta y me lo tiré tdo en los ojos... \nLa cosa es que el chorro me terminó ayudando a subir a un taxi y en agradecimiento le di mi bolso. \nClaro que nunca lo que paso, solo dije que me habia robado y que EL me había tirado el spray en los ojos. Soy una boluda...', '2016-05-10 01:19:08', 4),
(5, 'Me cagó a trompadas una mina.', 'Solo eso...', '2016-05-10 01:19:53', 2),
(6, 'ninja asesino', 'el otro dia fui al cine y me tire un ninja asesino (pedo silencioso pero letal) , me hice el boludo que buscaba algo abajo del asiento y tosia, desps me toca el hombro el pibe de atras y me dice, flaco , flaco, si estas buscando el pedo, lo tengo aca..', '2016-05-10 01:22:00', 5),
(9, 'En el baño', 'simpre que me paso el papel higienico, no lo tiro inmediatamente, primero lo miro para ver como viene la mano....', '2016-05-10 01:46:20', 3),
(10, 'secretos secretos', 'Cada vez que en una pelicula dicen algo como: "quedan 2 minutos antes de que estalle la bomba" o algo por el estilo, yo me pongo a contar los segundos a ver si la escena esta hecha en tiempo real o mandando bolazo...', '2016-05-10 01:51:19', 4),
(11, 'Mi hija', 'El otro dia mi hija de 8 años me pregunto si los negros tambien se enamoraban....\nyo me pregunto que estaré haciendo mal como padre', '2016-05-10 01:53:24', 5),
(12, 'La palanca', 'A veces simulo masturbar la palanca de cambio mientras espero que cambie la luz del semáforo', '2016-05-14 15:47:49', 1),
(18, 'Internet', 'Hubo veces en que lloré porque mi computadora no podía conectarse a Internet.', '2016-05-16 22:34:15', 2),
(19, 'Mi chanchito', 'Hace 2 años compre un chanchito chiquito para criarlo y comerlo en navidad, me encariñe con el chancho y no lo pude matar para comerlo y todavia lo tengo y cuando hace frio lo entro y duerme en la piesa conmigo', '2016-05-16 22:41:03', 3),
(21, 'El vendedor', 'bajo videos porno y los vendo en retiro haciendolos pasar por dvds de spiderman o el hombre araña o peliculas infantiles, \njaja me produce mucho morbo imaginarme la cara de los pibitos cuando ponen para ver la pelicula', '2016-05-16 22:46:28', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sexo`
--

CREATE TABLE `sexo` (
  `ID` int(1) NOT NULL,
  `SEXO` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `sexo`
--

INSERT INTO `sexo` (`ID`, `SEXO`) VALUES
(1, 'Hombre'),
(2, 'Mujer'),
(3, 'Otro');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `ID` int(9) UNSIGNED NOT NULL,
  `MAIL` varchar(45) NOT NULL,
  `USUARIO` varchar(15) NOT NULL,
  `CONTRASENIA` varchar(50) NOT NULL,
  `NIVEL` enum('admin','usuario') NOT NULL,
  `FECHA_NACIMIENTO` date NOT NULL,
  `FKSEXO` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID`, `MAIL`, `USUARIO`, `CONTRASENIA`, `NIVEL`, `FECHA_NACIMIENTO`, `FKSEXO`) VALUES
(1, 'marta@gmail.com', 'martita', '81dc9bdb52d04dc20036dbd8313ed055', 'usuario', '1995-05-19', 2),
(2, 'fede@gmail.com', 'el feduqui', '81dc9bdb52d04dc20036dbd8313ed055', 'usuario', '1997-06-07', 1),
(3, 'juan@gmail.com', 'juancha13', '81dc9bdb52d04dc20036dbd8313ed055', 'admin', '1995-09-12', 1),
(4, 'mariana@gmail.com', 'maria ana', '81dc9bdb52d04dc20036dbd8313ed055', 'usuario', '1990-10-01', 2),
(5, 'mati@gmail.com', 'mati55', '81dc9bdb52d04dc20036dbd8313ed055', 'usuario', '1983-05-30', 1),
(13, 'iara@hotmail.com', 'iara', '81dc9bdb52d04dc20036dbd8313ed055', 'admin', '1995-05-13', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `confesion`
--
ALTER TABLE `confesion`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FKUSUARIO` (`FKUSUARIO`);

--
-- Indices de la tabla `sexo`
--
ALTER TABLE `sexo`
  ADD PRIMARY KEY (`ID`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `MAIL` (`MAIL`),
  ADD UNIQUE KEY `USUARIO` (`USUARIO`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `confesion`
--
ALTER TABLE `confesion`
  MODIFY `ID` int(4) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT de la tabla `sexo`
--
ALTER TABLE `sexo`
  MODIFY `ID` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `ID` int(9) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `confesion`
--
ALTER TABLE `confesion`
  ADD CONSTRAINT `confesion_ibfk_1` FOREIGN KEY (`FKUSUARIO`) REFERENCES `usuario` (`ID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
