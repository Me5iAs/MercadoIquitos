<?php 

  require_once("conexion.php");
  $data = json_decode(file_get_contents('php://input'));
  // $data tiene $data->Cod, $data->user, $data->email
  $idmi = $_GET["idmi"];
  $ObjCn = new Conexion();
  $sql = "SELECT fn_publicacion_registrar(".
    "'".$data->Titulo."',".
    "'".$data->CodCategoria."',".
    "'".$data->Estado."',".
    "'".$data->Descripcion."',".
    "'".$data->Cantidad."',".
    "'".$data->Precio."',".
    "'".$data->Moneda."',".
    "'".$data->Delivery."',".
    "'".$data->Recojo."',".
    "'".$data->Efectivo."',".
    "'".$data->Deposito."',".
    "'".$data->Tarjeta."',".
    "'".$data->IdUsuario."',".
    "'".$data->CantImg."') as resultado";
  
  $resultado = $ObjCn->EjecutarStore($sql);
  $f = mysqli_fetch_array($resultado);
  $IdPubicacion =$f["resultado"];

  $ruta=   ".." . DIRECTORY_SEPARATOR . "img" .DIRECTORY_SEPARATOR. "files" . DIRECTORY_SEPARATOR . $_GET["idmi"] . DIRECTORY_SEPARATOR;  
  $destino=".." . DIRECTORY_SEPARATOR . "img" .DIRECTORY_SEPARATOR. "publicaciones" . DIRECTORY_SEPARATOR . $IdPubicacion . DIRECTORY_SEPARATOR;

  if(!is_dir($destino)){
    mkdir($destino, 777);  
  } 

  $contador=1;
  $dir = opendir($ruta);
  while ($elemento = readdir($dir)){
      if( $elemento != "." && $elemento != ".."){
          rename($ruta . $elemento, $destino . $elemento);
          $contador++;
      }
  }
  rmdir($ruta);

  $arr["resultado"]=$IdPubicacion;
  echo(json_encode($arr)); 
?>