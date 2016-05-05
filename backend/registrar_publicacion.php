<?php 

  require_once("conexion.php");
  $data = json_decode(file_get_contents('php://input'));
  // $data tiene $data->Cod, $data->user, $data->email
  if ($_GET["t"]=="p"){
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
  }elseif($_GET["t"]=="d"){
    $ObjCn = new Conexion();
    $sql = "CALL sp_publicacion_devolver(".$_GET["IdPublicacion"].")";
    // echo $sql;
    $rs = $ObjCn->EjecutarStore($sql);
    // echo $sql;
    $cont =0;
    while ($f = mysqli_fetch_array($rs)){
        for ($x = 0; $x<mysqli_num_fields($rs); $x++){
            $finfo = mysqli_fetch_field_direct($rs, $x);
            $nombre = $finfo->name;
            $arr[$cont][$nombre]= $f[$x];   
        }
        $cont++;
    }

    // cargar imagenes en otro array
    $destino=".." . DIRECTORY_SEPARATOR . "img" .DIRECTORY_SEPARATOR. "publicaciones" . DIRECTORY_SEPARATOR . $_GET["IdPublicacion"] . DIRECTORY_SEPARATOR;
    $dir = opendir($destino);
    $imagenes  = "";
    while ($elemento = readdir($dir)){
        if( $elemento != "." && $elemento != ".."){
          if ($imagenes==""){
            $imagenes = $elemento;
          }else{
            $imagenes = $imagenes."|". $elemento;
          }
        }
    }    
    $arr[0]["img"] = $imagenes;

    $arr["filas"] = $cont;
    echo(json_encode($arr));
  }
?>