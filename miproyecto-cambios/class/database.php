<?php
$server= 'localhost';
$user='root';
$pass='';
$db='crud-teclab';
//establezco la conexión con la librería de PHP PDO.
try{
$conexion= new PDO(
//donde esta el server/ driver/ db
"mysql:host=$server;dbname=$db",
$user,
$pass
);
#var_dump($respuesta);
}
catch(PDOException $error){
var_dump($error->getMessage());

}
#var_dump($gdb);
?>