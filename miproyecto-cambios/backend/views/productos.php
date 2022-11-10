<?php
 include '../../class/database.php';
 
 class Respuesta {
    public $exito;
    public $textoerror;
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
function guardar($conexion,$des,$pre, $cat){
    $sql = "INSERT INTO productos (descripcion,precio, categoria_id) VALUES ('{$des}','{$pre}','{$cat}')";
    $sql = $conexion->prepare($sql);
    $sql->execute();
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
function actualizar($conexion,$id,$des,$pre,$cat){
  $sql = "UPDATE productos SET descripcion='{$des}', precio='{$pre}' , categoria_id='{$cat}' WHERE productos.id = '{$id}'";
  $sql = $conexion->prepare($sql);
  $sql->execute();
}

$acc=$_POST['paccion'];

$id=$_POST['pid'];
$des=$_POST['pdescripcion'];
$pre=$_POST['pprecio'];
$cat=$_POST['pcategoria'];

if($conexion){
    if($acc=="LISTAR"){
      listar($conexion);
      
    }
    if($acc=="GUARDAR"){
      guardar($conexion,$des,$pre, $cat);
      $respuesta->exito = "S";
      $respuesta->textoerror = "el prod ha sido guardado";
      echo json_encode($respuesta);
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
      actualizar($conexion,$id,$des,$pre, $cat);
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
