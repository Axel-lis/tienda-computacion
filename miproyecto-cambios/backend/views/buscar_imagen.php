<?php
 include '../../class/database.php';
 //Lo que hacemos es cargar la imagen en un directorio especificado y el nombre de la imagen almacenarlo en la base de datos. Entonces aqui debemos recuperar el nombre de la imagen de la base de datos para enviarlo al ajax como parametro.


$id= $_POST['pid'];

$query="SELECT nombre_img FROM productos WHERE productos.id = '{$id}'";
foreach($conexion->query($query) as $row){
  $file = fopen("mi_imagen.jpg","w");
  fwrite($file, base64_decode($row['imagen']));
  fclose($file);
}
