<?php
 include '../../class/database.php';
 
 class Respuesta {
    public $exito;
    public $textoerror;
    public $idgenerado;
 }
 $respuesta = new Respuesta();
//listar busca todo de productos de la BdD y lo devuelve en un array
function listar($conexion){
    $sentencia= $conexion->query("SELECT * FROM productos");
    $productos= $sentencia->fetchAll(PDO::FETCH_ASSOC);
    //y aca lo transforma el array en un jsonecho json_encode($productos);
    echo json_encode($productos);
}
//Funcion guardar
function guardar($conexion,$nom,$des,$pre, $cat,$respuesta){
    $sql = "INSERT INTO productos (nombre, descripcion,precio, categoria_id) VALUES ('{$nom}','{$des}','{$pre}','{$cat}')";
    $sql = $conexion->prepare($sql);
    $sql->execute();
    
    $respuesta->exito = "S";
    $respuesta->textoerror = "el prod ha sido guardado";
    $respuesta->idgenerado = $conexion->lastInsertId();
    echo json_encode($respuesta);
}
//Funcion eliminar
function eliminar($conexion,$id){
  $sql = "DELETE FROM productos WHERE productos.id = '{$id}'";
  $sql = $conexion->prepare($sql);
  $sql->execute();
}
//funcion buscar
function buscar($conexion,$id){
  $sentencia= $conexion->query("SELECT * FROM productos WHERE productos.id = '{$id}'");
  $productos= $sentencia->fetchAll(PDO::FETCH_ASSOC);
  //y aca lo transforma el array en un jsonecho json_encode($productos);
  echo json_encode($productos);
}
//funcion actualizar
function actualizar($conexion,$id, $nom,$des,$pre,$cat){
  $sql = "UPDATE productos SET descripcion='{$nom}','{$des}', precio='{$pre}' , categoria_id='{$cat}' WHERE productos.id = '{$id}'";
  $sql = $conexion->prepare($sql);
  $sql->execute();
}

$acc=$_POST['paccion'];

$id=$_POST['pid'];
$nom=$_POST['pnombre'];
$des=$_POST['pdescripcion'];
$pre=$_POST['pprecio'];
$cat=$_POST['pcategoria'];

if($conexion){
    if($acc=="LISTAR"){
      listar($conexion);
      
    }
    if($acc=="GUARDAR"){
      guardar($conexion,$nom, $des,$pre, $cat, $respuesta);
    }
    if($acc=="ELIMINAR"){
      eliminar($conexion,$id);
      $respuesta->exito = "S";
      $respuesta->textoerror = "el prod ha sido eliminado";
      echo json_encode($respuesta);
    }
    if($acc=="BUSCAR_PRODUCTO"){
      buscar($conexion,$id);
    }
    if($acc=="ACTUALIZAR"){
      actualizar($conexion,$nom,$id,$des,$pre, $cat);
      $respuesta->exito = "S";
      $respuesta->textoerror = "el prod ha sido actualizado";
      echo json_encode($respuesta);
    }
    

  }else{
    $respuesta->exito = "N";
    $respuesta->textoerror = "no conecto";
    echo json_encode($respuesta);
}
?>
