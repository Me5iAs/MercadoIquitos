<?php 

  require_once("conexion.php");
  $data = json_decode(file_get_contents('php://input'));
  // $data tiene $data->Cod, $data->user, $data->email
  $idmi = $_GET["idmi"];
  $ObjCn = new Conexion();
  $sql = "SELECT fn_publicacion_registrar(".$data->Titulo.")";

      reset($matrix);
      while (list($key, $val) = each($matrix)) {        
          $sql = $sql . "'".$val."',";
      }
      $sql= substr($sql, 0, strlen($sq)-1);
      $sql=$sql.") as resultado";
?>