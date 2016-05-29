<?php 


  require_once("conexion.php");
  $data = json_decode(file_get_contents('php://input'));
  // $data tiene $data->Cod, $data->user, $data->email
  if ($_GET["t"]=="p"){
    $ObjCn = new Conexion();
    $sql = "CALL sp_publicaciones_registrar(".
      "'".$data->Titulo."',".      
      "'".$data->Descripcion."',".
      "'".$data->Moneda."',".
      "'".$data->Precio."',".
      "'".$data->Detalle."',".
      "'".$data->IdUsuario."')";
    
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
    $IdPubicacion =$arr[0]["IdPublicacion"];
    
    $destino=".." . DIRECTORY_SEPARATOR . "img" .DIRECTORY_SEPARATOR. "publicaciones" . DIRECTORY_SEPARATOR . $IdPubicacion . DIRECTORY_SEPARATOR;

    if(!is_dir($destino)){
      mkdir($destino, 777);  
    } 

    echo $IdPubicacion; 

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
    if(is_dir($destino)){     
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
    }
    $arr["filas"] = $cont;
    echo(json_encode($arr));  
  }elseif($_GET["t"]=="error"){
    
    $ObjCn = new Conexion();
    $sql = "CALL sp_error_registrar(".
      "'".$data->Pagina."',".
      "'".$data->Codigo."',".
      "'".$data->CodUsuario."',".      
      "'".$data->Error."')";
    
    $ObjCn->EjecutarStore($sql);
  }
?>