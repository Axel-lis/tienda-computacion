<?php
 include '../../class/database.php';
 
 class Respuesta {
    public $exito;
    public $textoerror;
 }
$respuesta = new Respuesta();
//$archivo= $_POST['imagen'];
//echo basename($_FILES[$archivo]["name"]);
if($conexion){
    $id = $_POST['idgenerado'];

    $imagen = $_FILES['imagen']['tmp_name'];
    $nombreimagen = $_FILES['imagen']['name'];
    //$imagen = $conexion->quote(file_get_contents($_FILES["imagen"]["tmp_name"]));
    $sql = "UPDATE productos SET nombre_img='{$nombreimagen}' WHERE productos.id = '{$id}'";
    $sql = $conexion->prepare($sql);
    $sql->execute();

    $fichero_subido = basename($_FILES['imagen']['name']);
    echo 'fichero_subido '.$fichero_subido;
    echo '<pre>';
    echo 'hola '.$imagen;
    if (move_uploaded_file($_FILES['imagen']['tmp_name'], $fichero_subido)) {
        echo "El fichero es válido y se subió con éxito.\n";
        $nuevo_fichero = '../../assets/img/'.basename($_FILES['imagen']['name']);
        copy($fichero_subido, $nuevo_fichero);
    }
    $respuesta->exito = "S";
    $respuesta->textoerror = "grabo la imagen";
    echo json_encode($respuesta);
}




?>
